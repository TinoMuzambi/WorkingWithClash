import React, { useState } from "react";
import ReactJson from "react-json-view";
import { ImSpinner8 } from "react-icons/im";
import { withFormik, Field, Form } from "formik";

const Card = ({ content }) => {
	const [contentJson, setContentJson] = useState("");
	const [loading, setLoading] = useState(false);

	const MyForm = () => {
		return (
			<Form className="form">
				<label htmlFor="request" className="label">
					{content} Tag
				</label>
				<Field
					type="text"
					name="request"
					className="tag"
					required
					minLength={8}
					maxLength={8}
					placeholder={"PRVC8PRL"}
				/>
				<button className="send" type="submit">
					Send
				</button>
			</Form>
		);
	};

	const FormikForm = withFormik({
		mapPropsToValues() {
			return {
				tag: "",
			};
		},
		handleSubmit(values) {
			getData(values.request);
		},
	})(MyForm);

	const getData = async (nextTag) => {
		setLoading(true);
		const URL = `https://wwc-server.herokuapp.com/api/${content}/${nextTag}`;
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
		<div className="card">
			<div className="content">
				<h3 className="title">{content} Info</h3>
				<FormikForm />
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
};

export default Card;
