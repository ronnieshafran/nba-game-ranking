import React, { Component } from "react";
import "./App.css";
import DisplayGame from "./Classes/DisplayGame";
import GamesTable from "./Components/GamesTable";
import Preferences from "./Components/Prefrences";
import DropDownList from "./Components/DropDownList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  initialBadges = [
    "Blowout",
    "Bucket Fest",
    "Clutch",
    "Injuries",
    "Tight D",
    "1 Man Show",
  ];

  state = {
    date: 0,
    displayedGamesList: [],
    gamesListByScore: [],
    gamesListByMargin: [],
    currentSort: this.initDropdown(),
    gamesFromToday: [],
    gamesFromYesterday: [],
    allGames: [],
    dropdownOptions: ["Score", "Margin"],
    badgeList: [...this.initialBadges],
    preferredBadges: this.initPreferredBadges(),
  };

  constructor() {
    super();
    this.state.date = new Date("February 17, 2022");
  }

  componentDidMount() {
    this.getTodaysGames();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.date !== prevState.date) {
      const prevDate = String(prevState.date.toISOString().split("T")[0]);
      const currentDate = this.selectedDayString();
      if (!sessionStorage.getItem(prevDate + "_Score")) {
        sessionStorage.setItem(
          prevDate + "_Score",
          JSON.stringify(this.state.gamesListByScore)
        );
        sessionStorage.setItem(
          prevDate + "_Margin",
          JSON.stringify(this.state.gamesListByMargin)
        );
      }
      if (sessionStorage.getItem(currentDate + "_Score")) {
        let gamesListByScore = JSON.parse(
          sessionStorage.getItem(currentDate + "_Score")
        );
        let gamesListByMargin = JSON.parse(
          sessionStorage.getItem(currentDate + "_Margin")
        );
        this.setState({ gamesListByScore, gamesListByMargin });
        if (this.state.currentSort === "Score") {
          this.setState({ displayedGamesList: gamesListByScore });
        } else {
          this.setState({ displayedGamesList: gamesListByMargin });
        }
      } else {
        this.getTodaysGames();
      }
    }
  }

  initPreferredBadges() {
    if (localStorage.getItem("preferredBadges"))
      return JSON.parse(localStorage.getItem("preferredBadges"));
    return [...this.initialBadges];
  }

  initDropdown() {
    if (!localStorage.getItem("sort")) return "Margin";
    return localStorage.getItem("sort");
  }

  selectedDayString() {
    let today = this.state.date;
    return String(today.toISOString().split("T")[0]);
  }

  theDayBeforeSelectedDate() {
    let yesterday = new Date(this.state.date);
    yesterday.setDate(yesterday.getDate() - 1);
    return String(yesterday.toISOString().split("T")[0]);
  }

  getStartHour(game) {
    const startTimeUTC = game.startTimeUTC;
    const indexOfT = startTimeUTC.indexOf("T");
    const startHour = Number(
      startTimeUTC.substring(indexOfT + 1, indexOfT + 3)
    );
    return startHour;
  }

  handleSortingChange = (event) => {
    if (this.state.currentSort === "Score" && event.value === "Margin") {
      this.setState({
        currentSort: "Margin",
        displayedGamesList: this.state.gamesListByMargin,
      });
      localStorage.setItem("sort", "Margin");
    } else if (this.state.currentSort === "Margin" && event.value === "Score") {
      this.setState({
        currentSort: "Score",
        displayedGamesList: this.state.gamesListByScore,
      });
      localStorage.setItem("sort", "Score");
    }
  };

  getTodaysGames = async () => {
    /**
     * because the API works with UTC time, early games are considered yesterday, while late games are considered today.
     * to fetch the real list, we'll have to make 2 calls to the API. */
    let response = await fetch(
      "https://api-nba-v1.p.rapidapi.com/games/date/" +
        this.selectedDayString(),
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df",
        },
      }
    );
    let json = await response.json();
    let gamesFromToday = [];
    let listOfHomeTeams = [];
    let queriedGamesList = [...json.api.games]; //original list
    queriedGamesList.forEach((game) => {
      const startHour = this.getStartHour(game);
      if (
        startHour < 5 &&
        game.statusGame === "Finished" &&
        !listOfHomeTeams.includes(game.hTeam.shortName)
      ) {
        //todays games should start by 5AM UTC at most
        gamesFromToday.push(new DisplayGame(game));
        let homeTeamName = game.hTeam.shortName;
        listOfHomeTeams.push(homeTeamName);
      }
    });
    this.setState({ gamesFromToday });
    // second API call, to get yresterdays game - see comment at the beginning of this function
    let secondResponse = await fetch(
      "https://api-nba-v1.p.rapidapi.com/games/date/" +
        this.theDayBeforeSelectedDate(),
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df",
        },
      }
    );
    let secondJson = await secondResponse.json();
    let secondQueriedGamesList = [...secondJson.api.games]; //original list
    let gamesFromYesterday = [];
    let YesterdaysListOfHomeTeams = [];
    secondQueriedGamesList.forEach((game) => {
      const startHour = this.getStartHour(game);
      if (
        startHour > 3 &&
        game.statusGame === "Finished" &&
        !YesterdaysListOfHomeTeams.includes(game.hTeam.shortName)
      ) {
        //yesterdays games should start after 3AM UTC
        gamesFromYesterday.push(new DisplayGame(game));
        let homeTeamName = game.hTeam.shortName;
        YesterdaysListOfHomeTeams.push(homeTeamName);
      }
    });
    this.setState({ gamesFromYesterday });
    //combine the games from both calls to one list
    let allGames = this.state.gamesFromToday.concat(
      this.state.gamesFromYesterday
    );
    //fetch game details for each game - it's a different endpoint in the API.
    //the gameDetails endpoints is used for blowout, MVP and clutch.
    let responses = await Promise.all(
      allGames.map((game) =>
        fetch("https://api-nba-v1.p.rapidapi.com/gameDetails/" + game.id, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df",
          },
        })
      )
    );
    let data = responses.map((response) => response.json());
    let responseData = await Promise.all(data);
    let gameDetailsList = responseData.map((game) => (game = game.api.game[0]));
    let i = 0;
    for (i = 0; i < allGames.length; i++) {
      allGames[i].fillGameDetails(gameDetailsList[i]);
    }
    this.setState({ allGames });
    let gameResponse = await Promise.all(
      allGames.map((game) =>
        fetch(
          "https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/" +
            game.id,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
              "x-rapidapi-key":
                "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df",
            },
          }
        )
      )
    );
    let gameResponseJson = await gameResponse.map((response) =>
      response.json()
    );
    let gameResponseData = await Promise.all(gameResponseJson);
    let playerStatsList = gameResponseData.map(
      (stats) => (stats = stats.api.statistics)
    );
    i = 0;
    for (i = 0; i < allGames.length; i++) {
      allGames[i].getInjuries(playerStatsList[i]);
    }
    this.setState({ allGames });

    let sortedGamesListByScore = [...allGames];
    let sortedGamesListByMargin = [...allGames];
    sortedGamesListByScore.sort(
      (game1, game2) => game2.totalScore - game1.totalScore
    );
    sortedGamesListByMargin.sort((game1, game2) => game1.margin - game2.margin);
    this.setState({
      displayedGamesList:
        this.state.currentSort === "Score"
          ? sortedGamesListByScore
          : sortedGamesListByMargin,
      gamesListByScore: sortedGamesListByScore,
      gamesListByMargin: sortedGamesListByMargin,
    });
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  handleSavedBadges = (preferredBadges) => {
    this.setState({ preferredBadges });
    localStorage.setItem("preferredBadges", JSON.stringify(preferredBadges));
  };

  render() {
    const innerDivStyle = {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      padding: 20,
    };

    const isFutureDate = (date) => {
      return date < new Date();
    };

    const ButtonInput = ({ value, onClick }) => (
      <button type="button" className="btn btn-secondary" onClick={onClick}>
        {value}
      </button>
    );
    return (
      <div style={{ display: "flex-box", marginBottom: "20px" }}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "grid",
            backgroundColor: "#f0f0d0",
          }}
        >
          <div>
            <h3 style={{ textAlign: "center" }}>NBA Game Ranking</h3>
          </div>
          <div>
            <p>
              A spoiler-less ranking of games from the chosen date so you can
              decide which game is worth your time!
              <span style={{ color: "red", fontSize: "20px" }}>
                <br />
                All star break! no games until 24.2 :(
              </span>
            </p>
          </div>
        </div>
        <div style={innerDivStyle}>
          <DropDownList
            onChange={this.handleSortingChange}
            options={this.state.dropdownOptions}
            value={this.state.currentSort}
            date={this.state.date}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ marginRight: "30px" }}>
            <DatePicker
              selected={this.state.date}
              onChange={this.handleDateChange}
              customInput={<ButtonInput />}
              filterDate={isFutureDate}
            />
          </div>
          <div>
            <Preferences
              preferredBadges={this.state.preferredBadges}
              badgeList={this.state.badgeList}
              onSave={this.handleSavedBadges}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
          }}
        >
          <GamesTable
            displayedGamesList={this.state.displayedGamesList}
            badgeList={this.state.badgeList}
            preferredBadges={this.state.preferredBadges}
          />
        </div>
      </div>
    );
  }
}
export default App;
