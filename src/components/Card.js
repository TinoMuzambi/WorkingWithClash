import React, { useState } from "react";
import ReactJson from "react-json-view";

function Card() {
	const [playerTag, setPlayerTag] = useState("");
	const [playerJson, setPlayerJson] = useState("");

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

	return (
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
	);
}

export default Card;
