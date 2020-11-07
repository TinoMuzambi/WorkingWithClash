import React from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
	return (
		<div className="forms">
			<Card content="player" />
			<Card content="clan" />
		</div>
	);
}

export default App;
