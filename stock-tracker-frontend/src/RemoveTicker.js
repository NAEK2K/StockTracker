import React, {useState} from "react";

function RemoveTicker(props) {
  const [input, setInput] = useState('');
  async function removeTicker() {
    console.log("RAN");
    const tickerUrl = "http://localhost:8080/removeTicker";
    const reqOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ auth: props.auth, ticker: input}),
    };
    const response = await fetch(tickerUrl, reqOptions);
    props.getTickers();
  }
  return (
    <div>
      <button onClick={removeTicker}>Remove Ticker</button>
      <input value={input} onChange={(e) => setInput(e.target.value)}/>
    </div>
  );
}

export default RemoveTicker;