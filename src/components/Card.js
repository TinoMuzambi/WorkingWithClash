import React, { useState, useEffect } from "react";
import ReactJson from "react-json-view";
import { ImSpinner8 } from "react-icons/im";

function Card({ content }) {
	const [tag, setTag] = useState("");
	const [contentJson, setContentJson] = useState("");
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		setLoading(true);
		const URL = `https://wwc-server.herokuapp.com/api/${content}/${tag}`;
		try {
			const result = await fetch(URL);
			const data = await result.json();
			setContentJson(data);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	//L98JC2LG

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
				{loading && <ImSpinner8 className="spinner" />}
				{contentJson && !loading && (
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
