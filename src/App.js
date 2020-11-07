import React, { useState } from "react";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");

	const callAPI = async () => {
		const URL = `https://api.clashofclans.com/v1//clans/${query}/currentwar`;
		try {
			const result = await fetch(URL, {
				headers: {
					Authorization:
						"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImU5NGE4YmIyLWJmODEtNGM5My1iYjUwLThkZTllMWI4YTk5OCIsImlhdCI6MTYwNDc1NDY5MCwic3ViIjoiZGV2ZWxvcGVyLzkwODg3NDg2LWI2YjQtMzY0Yy00MmI0LWY5ZmIyNjBlNjU0ZSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjE5Ny4yMzkuMTQ4LjM5Il0sInR5cGUiOiJjbGllbnQifV19.NunREimF3mZ2tIYPq4-z_pMbo7F0__WrVjwOBR9YJAYmHxOS-JbBlZMAyl5NiSqeO_VZp4CqMjdlQ-YEkqTMMQ",
					"Access-Control-Allow-Origin": "*",
				},
			});
			const data = await result.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="form-holder">
			<form className="form">
				<label htmlFor="request">Request</label>
				<input
					type="text"
					name="request"
					id="request"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<input type="button" value="Send" onClick={callAPI} />
			</form>
		</div>
	);
}

export default App;
