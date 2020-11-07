import React, { useState } from "react";
import "./App.css";

function App() {
	const [playerTag, setPlayerTag] = useState("");

	const getPlayerData = async () => {
		const URL = `http://localhost:5000/api/players/${playerTag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			console.log(data);
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
						<label htmlFor="request">Clash Player Tag</label>
						<input
							type="text"
							name="request"
							id="request"
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
				</div>
			</div>
		</div>
	);
}

export default App;
