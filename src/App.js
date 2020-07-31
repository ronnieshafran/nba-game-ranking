import React, { Component } from "react";
import "./App.css";
import DisplayGame from "./Classes/DisplayGame";
import GamesTable from "./Components/GamesTable";
import DropDownList from "./Components/DropDownList";

class App extends Component {
  state = {
    date: 0,
    displayedGamesList: [],
    gamesListByScore: [],
    gamesListByMargin: [],
    currentSort: "Score",
    gamesFromToday: [],
    gamesFromYesterday: [],
  };

  constructor() {
    super();
    this.state.date = this.todaysDate();
  }

  todaysDate() {
    let today = new Date();
    return String(today.toISOString().split("T")[0]);
  }

  yesterdaysDate() {
    let yesterday = new Date();
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

  handleChange = () => {
    if (this.state.currentSort === "Score") {
      this.setState({
        currentSort: "Margin",
        displayedGamesList: this.state.gamesListByMargin,
      });
    } else {
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

    fetch("https://api-nba-v1.p.rapidapi.com/games/date/" + this.todaysDate(), {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-nba-v1.p.rapidapi.com",
        "x-rapidapi-key": "74a31071eamshe7387c3260e4bfbp1dc7b3jsnbf43416ee3df",
      },
    })
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
            //todays games should start by 3AM UCT at most
            gamesFromToday.push(new DisplayGame(game));
          }
        });
        this.setState({ gamesFromToday });
      })
      .then(() => {
        fetch(
          "https://api-nba-v1.p.rapidapi.com/games/date/" +
            this.yesterdaysDate(),
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
                //yesterdays games should start by 3AM UCT at most
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

  render() {
    const innerDivStyle = {
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      padding: 20,
    };
    return (
      <div style={{ margin: 0, alignItems: "center" }}>
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
          <DropDownList onChange={this.handleChange} />
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
