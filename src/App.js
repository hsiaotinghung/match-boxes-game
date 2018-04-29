import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as GameEngine from './gameEngine'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Game />
      </div>
    );
  }
}

function Square(props) {
  return (
    <div
      className={`square ${props.isLit?'isLit':''}`}
      onClick={() => props.onClick()}>
      {props.value}
    </div>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isLit={this.props.lightSatus[i]}
        onClick={() => this.props.onClick(i)}
        value={i}
      />
    );
  }

  renderRow(size, initIndex) {
    let row = [];
    for (let i = 0; i < size; i++) {
      row.push(this.renderSquare(initIndex*size + i));
    }
    return (
      <div className="board-row">
        {row}
      </div>
    )
  }

  renderBoard(size) {
    let rows = [];
    for (let i = 0; i < size; i++) {
      rows.push(this.renderRow(size, i));
    }
    return rows;
  }

  render() {
    return (
      <div>
        {this.renderBoard(this.props.boardSize)}
      </div>
    );
  }
}

function GameTimer(props) {
    return (
      <div>
        Timer: {props.seconds} s
      </div>
    );
}

function GameController(props) {
    return (
      <div>

        <form>
          <div className="size-slider-wrapper">
            <label>Game board size:
              <input 
                id=""
                type="range"
                min="1" max="10" step="1"
                value={props.boardSize}
                onChange={(event) => props.handleSizeChange(event)} />
              </label>
          </div>
        </form>

        <div>
          <p>
            Reset my game: <button onClick={() => props.onReset()}>Reset</button>
          </p>
        </div>

      </div>
    );
}

class Game extends React.Component {
  defultStates = {
      lightSatus: Array(9).fill(false),
      winningPattern: GameEngine.generatePattern(3),
      isGameWon: false,
      timer: 0,
      seconds: 0,
      boardSize: 3
  }

  constructor(props) {
    super(props);
    this.state = this.defultStates;
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  handleClick(i) {
    const lightSatus = this.state.lightSatus.slice();
    const winningPattern = this.state.winningPattern.slice();
    let isGameWon = this.state.isGameWon;

    if(isGameWon === true) {
      return;
    }

    if (this.state.timer === 0) {
      GameEngine.startTimer(this);
    }
    
    lightSatus[i] = !lightSatus[i];
    isGameWon = GameEngine.checkWin(lightSatus, winningPattern);

    if(isGameWon) {
      GameEngine.stopTimer(this);
    }

    this.setState({
      lightSatus: lightSatus,
      isGameWon: isGameWon
    });
  }

  resetGame(boardSize =  this.state.boardSize) {

    GameEngine.stopTimer(this);
    this.setState({
      lightSatus: Array(boardSize**2).fill(false),
      winningPattern: GameEngine.generatePattern(boardSize),
      isGameWon: false,
      timer: 0,
      seconds: 0,
      boardSize: boardSize
    })
  }


  handleSizeChange(e) {
    let boardSize = e.target.valueAsNumber;
    e.preventDefault();
    this.resetGame(boardSize);
  }

  render() {
    let status = this.state.isGameWon? `You completed in ${this.state.seconds} seconds`: '...in progress...complete the pattern to win the game';

    return (
      <div className="game">
        <div className="game-timer">
          <GameTimer
            seconds={this.state.seconds}
          />
        </div>
        <div className="game-controller">
          <GameController 
            onReset={() => this.resetGame()}
            handleSizeChange={this.handleSizeChange}
            boardSize={this.state.boardSize}/>
        </div>
        <div className="game-info">
          <div>Game Result: {status}</div>
        </div>
        <h2>Match the winning pattern to win</h2>
        <div className="game-board">
          <Board 
            lightSatus={this.state.lightSatus}
            onClick={(i) => this.handleClick(i)}
            boardSize={this.state.boardSize}
          />
        </div>
        <h2>Winning Pattern</h2>
        <div className="game-board">
          <Board 
            lightSatus={this.state.winningPattern}
            onClick={()=> false}
            boardSize={this.state.boardSize}
          />
        </div>
      </div>      
    )
  }
}


export default App;


