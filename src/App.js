import React, { useState } from "react";
import "./App.css";
import ReactJson from "react-json-view";

function App() {
	const [playerTag, setPlayerTag] = useState("");
	const [playerJson, setPlayerJson] = useState("");

	const [clanTag, setClanTag] = useState("");
	const [clanJson, setClanJson] = useState("");

	const getPlayerData = async () => {
		const URL = `http://localhost:5000/api/player/${playerTag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			setPlayerJson(data);
		} catch (error) {
			console.error(error);
		}
	};

	const getClanData = async () => {
		const URL = `http://localhost:5000/api/clan/${clanTag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			setClanJson(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="forms">
			<div className="form-group">
				<div className="content">
					<h3 className="title">Player Info</h3>
					<form className="form">
						<label htmlFor="request">Player Tag</label>
						<input
							type="text"
							name="request"
							className="tag"
							value={playerTag}
							onChange={(e) => setPlayerTag(e.target.value)}
						/>
						<input
							type="button"
							value="Send"
							className="send"
							onClick={getPlayerData}
						/>
					</form>
					{playerJson && (
						<ReactJson
							className="json"
							src={playerJson}
							enableClipboard={false}
							displayDataTypes={false}
							indentWidth={2}
						/>
					)}
				</div>
			</div>

			<div className="form-group">
				<div className="content">
					<h3 className="title">Clan Info</h3>
					<form className="form">
						<label htmlFor="request">Clash Tag</label>
						<input
							type="text"
							name="request"
							className="tag"
							value={clanTag}
							onChange={(e) => setClanTag(e.target.value)}
						/>
						<input
							type="button"
							value="Send"
							className="send"
							onClick={getClanData}
						/>
					</form>
					{clanJson && (
						<ReactJson
							className="json"
							src={clanJson}
							enableClipboard={false}
							displayDataTypes={false}
							indentWidth={2}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
