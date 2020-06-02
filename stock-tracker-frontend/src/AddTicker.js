import React, {useState} from "react";

function AddTicker(props) {
  const [input, setInput] = useState('');
  async function addTicker() {
    console.log("RAN");
    const tickerUrl = "http://localhost:8080/addTicker";
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
      <input value={input} onChange={(e) => setInput(e.target.value)}/>
      <button onClick={addTicker}>Add Ticker</button>
    </div>
  );
}

export default AddTicker;