import React from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
	return (
		<>
			<div className="logo">
				<h1>Working with Clash</h1>
			</div>
                        <h3>Paste L98JC2LG in the player tag to view my profile.</h3>
			<div className="forms">
				<Card content="player" />
				<Card content="clan" />
			</div>
		</>
	);
}

export default App;
