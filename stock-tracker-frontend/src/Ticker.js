import React, { useState, useEffect } from "react";

function Ticker(props) {
  const ticker = props.ticker;
  const [value, setValue] = useState(0);
  const [changeValue, setChangeValue] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const getTickerUrl = `http://localhost:8080/ticker/${ticker}`;
      const reqOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      };
      const response = await fetch(getTickerUrl, reqOptions);
      const data = await response.json();
      setValue(data.value);
      setChangeValue(data.changeValue);
      setChangePercent(data.changePercent);
    }
    fetchData();
  });

  return (
    <div>
      <p>Ticker: {ticker}</p>
      <p>Value: {value}</p>
      <p>
        Change: {changeValue} ({changePercent})
      </p>
    </div>
  );
}

export default Ticker;
