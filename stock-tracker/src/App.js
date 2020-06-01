import React from 'react';
import './App.css';

function App() {
  return (
    <StockInput/>
  );
}

class StockInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackedTickers: [],
      textInput: ""
    }
    this.addTicker = this.addTicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTicker() {
    console.log(this.state.textInput);
    let tempTickers = this.state.trackedTickers
    tempTickers.push(this.state.textInput);
    this.setState({trackedTickers: tempTickers})
    console.log(this.state.trackedTickers);
  }

  handleChange(event) {
    this.setState({textInput: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" id="tickInput" onChange={this.handleChange} value={this.state.textInput}/>
        <button onClick={this.addTicker}>Add</button>
      </div>
    )
  }
}

export default App;
