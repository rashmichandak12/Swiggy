import React from "react";
import ReactDOM from "react-dom/client"

// React.createElement => Object => HTMLElement(render)
// JSX is different from React
// It is HTML like syntax that works in javascript - react
// JSX is transpiled (converted code that JS undesrtands) before going to browser
// PARCEL is transpiling it but not by itself - it asks babel to transpile it
// PARCEL installs babel
//JSX -> React.createElement ->Reactelemnt - js object
// babel converts JSX to React.createElement
const parent = React.createElement("h1", {}, "My name is rashmi");

console.log(parent);

const jsxHeading = <h1>This is JSX</h1>;

console.log(jsxHeading);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);
