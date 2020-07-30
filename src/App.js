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
  };

  constructor() {
    super();
    this.state.date = this.todaysDate();
  }

  todaysDate() {
    let today = new Date();
    return String(today.toISOString().split("T")[0]);
  }

  componentDidMount() {
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
        let queriedGamesList = [...json.api.games]; //original list
        let generalGamesList = []; //list that will contain DisplayGame objects
        queriedGamesList.forEach((game) => {
          generalGamesList.push(new DisplayGame(game));
        });
        let sortedGamesListByScore = [...generalGamesList];
        let sortedGamesListByMargin = [...generalGamesList];
        sortedGamesListByScore.sort(
          (game1, game2) => game2.totalScore - game1.totalScore
        );
        sortedGamesListByMargin.sort(
          (game1, game2) => game1.margin - game2.margin
        );
        this.setState({
          displayedGamesList: sortedGamesListByScore, //the default sorting method is by total score
          gamesListByScore: sortedGamesListByScore,
          gamesListByMargin: sortedGamesListByMargin,
        });
      });
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

  render() {
    return (
      <div style={{ margin: 0, alignItems: "center" }}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            padding: 20,
          }}
        >
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
