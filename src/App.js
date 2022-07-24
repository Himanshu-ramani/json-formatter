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

  const isPrimitive = (val) => {
    if (typeof val == "object" || typeof val == "function") {
      return true;
    }
  };

  const collapseHandler = (e) => {
    e.target.nextSibling.nextSibling.classList.toggle("hide");
  };
  const arrayCollapse = (e) => {
    e.target.nextSibling.classList.toggle("hide");
  };
  const outputFunction = (obj, nested = false, key = false) => {
    if (Object.prototype.toString.call(obj) === "[object Object]") {
      return (
        <>
          <div className={!nested ? "obj_cover" : key ? "key" : "obj"}>
            <p
              className={!nested ? "cur_barket" : "cur_barket_nested"}
              onClick={collapseHandler}
            >
              &#123;
            </p>{" "}
            <div className="obj_div">
              {Object.keys(obj).map(function (key) {
                return (
                  <>
                    <p>
                      "{key}":
                      {isPrimitive(obj[key]) ? (
                        outputFunction(obj[key], true, true)
                      ) : (
                        <>
                          {" "}
                          {typeof obj[key] === "string" ? (
                            <span className="string">"{obj[key]}"</span>
                          ) : typeof obj[key] === "number" ? (
                            <span className="number">{obj[key]}</span>
                          ) : (
                            <span className="boolean">{String(obj[key])}</span>
                          )}
                          ,
                        </>
                      )}
                    </p>
                  </>
                );
              })}
            </div>{" "}
            <p className="close_cur_barket">&#125;{nested && !key && <>,</>}</p>
          </div>
        </>
      );
    } else if (Object.prototype.toString.call(obj) === "[object Array]") {
      return (
        <div className="array">
          <p className="squre_start" onClick={arrayCollapse}>
            &#91;
          </p>
          <div>
            {obj.map((item) =>
              isPrimitive(item) ? (
                <>{outputFunction(item, true)}</>
              ) : (
                <p className="item" key={Math.random()}>
                  {typeof item === "string" ? (
                    <span className="string">"{item}"</span>
                  ) : typeof item === "number" ? (
                    <span className="number">{item}</span>
                  ) : (
                    <span className="boolean">{String(item)}</span>
                  )}
                  ,
                </p>
              )
            )}
          </div>
          <p>&#93;</p>
        </div>
      );
    }
  };
  const submitHandle = (e) => {
    e.preventDefault();

    try {
      setOutputText(JSON.parse(inputText));
    } catch (error) {
      setOutputText(error.message);
      setHasError(true);
    }
  };

  return (
    <div className="App">
      <h1>JSON formatter</h1>
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
          <pre
            className={hasError ? "error output_section p" : "output_section p"}
          >
            {setHasError ? <>{outputText}</> : outputFunction(outputText)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;
