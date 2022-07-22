import "./App.css";
import React, { useState } from "react";
function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const inputChangeHandler = (e) => {
    const { value } = e.target;
    setInputText(value);
  };
  const submitHandle = (e) => {
    e.preventDefault();
    console.log(inputText);
    try {
      setOutputText(JSON.stringify(JSON.parse(inputText), null, 4));
    } catch (error) {
      setOutputText("error");
    }
  };
  return (
    <div className="App">
      <form onSubmit={submitHandle}>
        <button>Formet</button>
        <br />
        <textarea
          name="inputText"
          value={inputText}
          onChange={inputChangeHandler}
          id=""
          spellcheck="false"
          cols="50"
          rows="50"
        ></textarea>
        <textarea
          name="outputText"
          value={outputText}
          id=""
          cols="50"
          rows="50"
        ></textarea>
      </form>
    </div>
  );
}

export default App;
