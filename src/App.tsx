import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface Props {

}

interface State {
  periodNum: number,
  periodLength: number,
  minutes: number,
  seconds: number,
  resultPeriod: number,
  resultMinutes: number,
  resultSeconds: string
}

export class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      periodNum: 0,
      periodLength: 0,
      minutes: 0,
      seconds: 0,
      resultPeriod: 0,
      resultMinutes: 0,
      resultSeconds: "00"
    }
  }

  calculateResult(numMinors: number, numMajors: number, numMisconducts: number) {
    console.log("numMinors: " + numMinors);
    console.log("numMajors: " + numMajors);
    console.log("numMisconducts: " + numMisconducts);
    console.log("periodLength: " + this.state.periodLength);

    let totalTime = (numMinors * 2) + (numMajors * 5) + (numMisconducts * 10);
    let minutes = this.state.minutes;
    let periodNum = this.state.periodNum;

    if (periodNum == 0) {
      return;
    }
    
    while (totalTime > 0) {
      console.log("totalTime: " + totalTime);
      console.log("minutes: " + minutes);
      if (totalTime > minutes) {
        totalTime -= minutes;
        minutes = this.state.periodLength;
        periodNum++;
      } else {
        minutes -= totalTime;
        totalTime = 0;
      } 
    }

    console.log("period: " + periodNum);
    console.log("minutes: " + minutes);

    let secondString = String(this.state.seconds);
    console.log(this.state.seconds);

    if (this.state.seconds < 10) {
      secondString = "0" + String(this.state.seconds);
    }

    this.setState({
      resultMinutes: minutes,
      resultSeconds: secondString,
      resultPeriod: periodNum
    });
  }

  setPeriodLength(length: number) {
    this.setState({
      periodLength: length
    })
  }

  returnMessage() {
    console.log("Returning message");
    if (this.state.resultPeriod > 0 && this.state.resultPeriod < 4) {
      return (
        <p>Player comes out after the first whistle after { this.state.resultMinutes }:{ this.state.resultSeconds } remaining in period { this.state.resultPeriod }. </p>
      )
    } else if (this.state.resultPeriod > 3) {
      return (
        <p>The player will not return before the end of regulation.</p>
      ) 
    } else {
      return (
        <p></p>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Ice Hockey Penalty Time Calculator</h1>
          <label>
            Set Period number.
            <input type="number" min="1" max="3" value={this.state.periodNum} onChange={event => this.setState({periodNum: +event.target.value })} />
          </label>
          <label>
            Set Period Length.
            <input type="number" min="1" max="60" value={this.state.periodLength} onChange={event => this.setState({periodLength: +event.target.value })}/>
          </label>
          <label>Common Period Lengths</label>
          <button onClick={ event => this.setPeriodLength(12) }>
            12 Min
          </button>
          <button onClick={ event => this.setPeriodLength(15) }>
            15 Min
          </button>
          <button onClick={ event => this.setPeriodLength(17) }>
            17 Min
          </button>
          <button onClick={ event => this.setPeriodLength(20) }>
            20 Min
          </button>
          <label>
            Set Time In Period.
            <input type="number" min="0" max={ this.state.periodLength } value={this.state.minutes} onChange={event => this.setState({minutes: +event.target.value })}/>
            <input type="number" min="0" max="60" value={this.state.seconds} onChange={event => this.setState({seconds: +event.target.value })}/>
          </label>
          <button onClick={ event => this.calculateResult(0, 0, 1)}>
            10 Min Misconduct
          </button>
          <button onClick={ event => this.calculateResult(1, 0, 1)}>
            Minor + Misconduct (2 + 10)
          </button>
          <button onClick={ event => this.calculateResult(2, 0, 1)}>
            Double Minor + Misconduct (4 + 10)
          </button>
          <button onClick={ event => this.calculateResult(0, 1, 1)}>
            Major + Misconduct (5 + 10)
          </button>
          { this.returnMessage() }
        </header>
      </div>
    );
  }
}

