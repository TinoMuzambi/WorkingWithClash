import React, { useState } from "react";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");

	const callAPI = async () => {
		const URL = `http://localhost:5000/api/players/${query}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="form-holder">
			<form className="form">
				<label htmlFor="request">Clash Player Tag</label>
				<input
					type="text"
					name="request"
					id="request"
					className="tag"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<input type="button" value="Send" className="send" onClick={callAPI} />
			</form>
		</div>
	);
}

export default App;
