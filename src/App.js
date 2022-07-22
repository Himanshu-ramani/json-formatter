import "./App.css";
import React, { useState, useRef } from "react";
import Tree from "./Component/Tree/Tree";
import Collapse from "./Component/Collapse/Collapse";

function App() {
  // https://stackoverflow.com/questions/47185330/react-treeview-from-json-array
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [hasError, setHasError] = useState(false);
  const inputChangeHandler = (e) => {
    const { value } = e.target;
    setInputText(value);
    setHasError(false);
    setOutputText("");
  };

  const outputRef = useRef();
  // number line

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
      <button onClick={submitHandle}>Format</button>
      <div className="main_container">
        <div className="input_contianer">
          <label className="label" htmlFor="json_input">
            Enter JSON Data here
          </label>

          <textarea
            name="inputText"
            value={inputText}
            onChange={inputChangeHandler}
            id="json_input"
            spellCheck="false"
            cols="50"
            rows="50"
          ></textarea>
        </div>
        <div className="output_contianer">
          <label htmlFor="json_output">Enter JSON Data here</label>
          {/* <textarea
            name="inputText"
            value={outputText}
            // onChange={inputChangeHandler}
            id="json_output"
            spellCheck="false"
            cols="50"
            rows="50"
          ></textarea> */}
          <pre
            ref={outputRef}
            className={hasError ? "error output_section" : "output_section"}
          >
            {outputText}
            <Collapse data={outputText} />
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
