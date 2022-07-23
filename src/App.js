import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [hasError, setHasError] = useState(false);
  const inputChangeHandler = (e) => {
    const { value } = e.target;
    setInputText(value);
    setHasError(false);
    setOutputText("");
  };

  const submitHandle = (e) => {
    e.preventDefault();

    try {
      setOutputText(JSON.stringify(JSON.parse(inputText), null, 3));
    } catch (error) {
      setOutputText(error.message);
      setHasError(true);
    }
  };

  return (
    <div className="App">
      <h1>JSON Formatter</h1>
      <div className="button_continer">
        <button className="formate_button" onClick={submitHandle}>
          Format
        </button>
        <button
          className="clear_button"
          onClick={() => {
            setInputText("");
            setOutputText("");
            setHasError(false);
          }}
        >
          Clear
        </button>
      </div>

      <div className="main_container">
        <div className="input_contianer">
          <label className="label" htmlFor="json_input">
            Enter JSON Data here
          </label>

          <textarea
            className="input_json"
            name="inputText"
            value={inputText}
            onChange={inputChangeHandler}
            id="json_input"
            spellCheck="false"
            cols="50"
            rows="30"
          ></textarea>
        </div>
        <div className="output_contianer">
          <label htmlFor="json_output">Enter JSON Data here</label>
          <code>
            <pre
              className={hasError ? "error output_section" : "output_section"}
            >
              {outputText}
            </pre>
          </code>
        </div>
      </div>
    </div>
  );
}

export default App;
