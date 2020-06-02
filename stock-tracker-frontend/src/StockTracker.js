import React, {useState, useEffect} from "react";
import Ticker from "./Ticker";
import AddTicker from "./AddTicker";
import RemoveTicker from "./RemoveTicker";

function StockTracker(props) {
  const [tickers, setTickers] = useState([]);
  async function getTickers() {
    const tickerUrl = "http://localhost:8080/getTickers";
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auth: props.auth }),
    };
    const response = await fetch(tickerUrl, reqOptions);
    const data = await response.json();
    if (data) {
      if(data.tickers.length === 0) {
        setTickers([]);
        return;
      }
      setTickers(data.tickers.map((x, i) => <Ticker ticker={x} key={i} auth={props.auth}/>))
    } else {
      alert("Failed to get tickers.");
      return;
    }
  }
  useEffect(() => {
    getTickers();
  })
  return (
    <div>
      <AddTicker getTickers={getTickers} auth={props.auth}/>
      <RemoveTicker getTickers={getTickers} auth={props.auth}/>
      <h3>Tracked Tickers</h3>
      {tickers}
    </div>
  );
}

export default StockTracker;