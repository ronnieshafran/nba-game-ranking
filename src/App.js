import React, { Component } from "react";
import "./App.css";
import DisplayGame from "./Classes/DisplayGame";
import GamesTable from "./Components/GamesTable";
import DropDownList from "./Components/DropDownList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
  state = {
    date: 0,
    displayedGamesList: [],
    gamesListByScore: [],
    gamesListByMargin: [],
    currentSort: "Score",
    gamesFromToday: [],
    gamesFromYesterday: [],
    allGames: [],
    dropdownOptions: ["Score", "Margin"],
  };

  constructor() {
    super();
    this.state.date = new Date();
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

  componentDidMount() {
    this.getTodaysGames();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.date !== prevState.date) {
      this.getTodaysGames();
    }
  }

  handleChange = (event) => {
    console.log(event.value);
    if (this.state.currentSort === "Score" && event.value === "Margin") {
      this.setState({
        currentSort: "Margin",
        displayedGamesList: this.state.gamesListByMargin,
      });
    } else if (this.state.currentSort === "Margin" && event.value === "Score") {
      this.setState({
        currentSort: "Score",
        displayedGamesList: this.state.gamesListByScore,
      });
    }
  };

  getTodaysGames = () => {
    /**
     * because the API works with UTC time, early games are considered yesterday, while late games are considered today.
     * to fetch the real list, we'll have to make 2 calls to the API. */
    fetch(
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
    )
      .then((response) => {
        return response.json();
      })
      .catch((e) => console.log("error in fetch: " + e))
      .then((json) => {
        let gamesFromToday = [];
        let queriedGamesList = [...json.api.games]; //original list
        queriedGamesList.forEach((game) => {
          const startHour = this.getStartHour(game);
          if (startHour < 3) {
            //todays games should start by 3AM UTC at most
            gamesFromToday.push(new DisplayGame(game));
          }
        });
        this.setState({ gamesFromToday });
      })
      .then(() => {
        fetch(
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
        )
          .then((response) => {
            return response.json();
          })
          .catch((e) => console.log("error in fetch: " + e))
          .then((json) => {
            let queriedGamesList = [...json.api.games]; //original list
            let gamesFromYesterday = [];
            queriedGamesList.forEach((game) => {
              const startHour = this.getStartHour(game);
              if (startHour > 3) {
                //yesterdays games should start by 3AM UTC at most
                gamesFromYesterday.push(new DisplayGame(game));
              }
            });
            this.setState({ gamesFromYesterday });
          })
          .then(() => {
            //combine the games from both calls to one list
            let allGames = this.state.gamesFromToday.concat(
              this.state.gamesFromYesterday
            );
            //fetch game details for each game - it's a different endpoint in the API.
            //the gameDetails endpoints is used for blowout, MVP and clutch.
            Promise.all(
              allGames.map((game) =>
                fetch(
                  "https://api-nba-v1.p.rapidapi.com/gameDetails/" + game.id,
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
            )
              .then((responses) => {
                return responses.map((response) => response.json());
              })
              .then((data) => {
                Promise.all(data).then((responses) => {
                  let gameDetailsList = responses.map(
                    (game) => (game = game.api.game[0])
                  );
                  let i = 0;
                  for (i = 0; i < allGames.length; i++) {
                    allGames[i].fillGameDetails(gameDetailsList[i]);
                  }
                  this.setState({ allGames });
                });
              });

            let sortedGamesListByScore = [...allGames];
            let sortedGamesListByMargin = [...allGames];
            sortedGamesListByScore.sort(
              (game1, game2) => game2.totalScore - game1.totalScore
            );
            sortedGamesListByMargin.sort(
              (game1, game2) => game1.margin - game2.margin
            );
            this.setState({
              displayedGamesList: sortedGamesListByScore, //default sorting is by score
              gamesListByScore: sortedGamesListByScore,
              gamesListByMargin: sortedGamesListByMargin,
            });
          });
      });
  };

  getAdditionalGameDetails = (game) => {
    fetch("https://api-nba-v1.p.rapidapi.com/gameDetails/" + game.id, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      })
      .then((json) => {
        game.fillGameDetails(json.api.game[0]);
      });
  };

  handleDateChange = (date) => {
    this.setState({ date });
  };

  render() {
    const innerDivStyle = {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      padding: 20,
    };

    const ExampleCustomInput = ({ value, onClick }) => (
      <button className="example-custom-input" onClick={onClick}>
        {value}
      </button>
    );
    return (
      <div style={{ alignItems: "center" }}>
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
              Select your prefered sorting method and decide which game is worth
              your time!
            </p>
          </div>
        </div>
        <div style={innerDivStyle}>
          <DropDownList
            onChange={this.handleChange}
            options={this.state.dropdownOptions}
            value={this.state.currentSort}
            date={this.state.date}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "8%",
            marginBottom: "50 px",
            margin: "0 auto",
          }}
        >
          <h3 style={{ fontSize: "25px", marginRight: "20px" }}>Date:</h3>
          <DatePicker
            selected={this.state.date}
            onChange={this.handleDateChange}
            customInput={<ExampleCustomInput />}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 0,
          }}
        >
          <GamesTable displayedGamesList={this.state.displayedGamesList} />
        </div>
      </div>
    );
  }
}

export default App;
