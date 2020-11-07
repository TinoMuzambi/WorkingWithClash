import React, { useState } from "react";
import "./App.css";
import ReactJson from "react-json-view";
import Card from "./components/Card";

function App() {
	const [clanTag, setClanTag] = useState("");
	const [clanJson, setClanJson] = useState("");

	return (
		<div className="forms">
			<Card content="player" />
			<Card content="clan" />
		</div>
	);
}

export default App;
