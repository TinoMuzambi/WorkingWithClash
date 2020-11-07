import React, { useState } from "react";
import "./App.css";
import ReactJson from "react-json-view";
import Card from "./components/Card";

function App() {
	const [clanTag, setClanTag] = useState("");
	const [clanJson, setClanJson] = useState("");

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
			<Card />

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
