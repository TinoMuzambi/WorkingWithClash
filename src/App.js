import React from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
	return (
		<>
			<div className="logo">
				<h1>Working with Clash</h1>
			</div>
                        
			<div className="forms">
                                <h3>Paste L98JC2LG in the player info section to view my profile.</h3>
				<Card content="player" />
				<Card content="clan" />
			</div>
		</>
	);
}

export default App;
