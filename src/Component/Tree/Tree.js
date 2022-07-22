import React from "react";
import "./Tree.css";
const Tree = ({ data }) => {
  console.log(data);
  //build node
  const buildNode = (key) => {
    return <span>{key}</span>;
  };
  //
  const isPrimative = (value) => {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    );
  };
  //build leaf
  const buildLeaf = (value) => {
    return <span>{value}</span>;
  };
  //if array
  const isArray = (value) => Array.isArray(value);
  const loopArray = (array) =>
    array.map((value, key) => (
      <span key={key + value}>
        {isPrimative(value)
          ? buildLeaf(value)
          : isArray(value)
          ? loopArray
          : processObject(value)}
      </span>
    ));
  const processObject = (object) =>
    Object.keys(object).map((key, reactKey) => {
      return (
        <li key={reactKey + key}>
          <ul className="nested">
            {isPrimative(object[key])
              ? buildLeaf(object[key])
              : isArray(object[key])
              ? loopArray(object[key])
              : processObject(object[key])}
          </ul>
        </li>
      );
    });
  return <ul id="myUL">{processObject(data)}</ul>;
};

export default Tree;
