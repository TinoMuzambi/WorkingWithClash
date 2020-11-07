import React, { useState } from "react";
import ReactJson from "react-json-view";

function Card({ content }) {
	const [tag, setTag] = useState("");
	const [contentJson, setContentJson] = useState("");

	const getData = async () => {
		const URL = `http://localhost:5000/api/${content}/${tag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			setContentJson(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="form-group">
			<div className="content">
				<h3 className="title">{content} Info</h3>
				<form className="form">
					<label htmlFor="request" className="label">
						{content} Tag
					</label>
					<input
						type="text"
						name="request"
						className="tag"
						value={tag}
						onChange={(e) => setTag(e.target.value)}
					/>
					<input
						type="button"
						value="Send"
						className="send"
						onClick={getData}
					/>
				</form>
				{contentJson && (
					<ReactJson
						className="json"
						src={contentJson}
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
