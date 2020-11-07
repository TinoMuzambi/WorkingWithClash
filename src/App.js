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
		<div className="forms">
			{[1, 1, 1, 1].map((key) => (
				<div className="form-group" key={key}>
					<div className="content">
						<h3 className="title">Player Info</h3>
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
							<input
								type="button"
								value="Send"
								className="send"
								onClick={callAPI}
							/>
						</form>
					</div>
				</div>
			))}
		</div>
	);
}

export default App;
