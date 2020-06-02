import React, { useState } from "react";
import "./App.css";
import UserRegister from "./UserRegister";
import StockTracker from "./StockTracker";

function App() {
  const [auth, setAuth] = useState();

  if (!auth) {
    return (
      <div>
        <UserRegister setAuth={setAuth} />
      </div>
    );
  } else {
    return (
      <div>
        <StockTracker auth={auth}/>
      </div>
    );
  }
}

export default App;
