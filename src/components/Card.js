import React, { useState } from "react";
import ReactJson from "react-json-view";
import { ImSpinner8 } from "react-icons/im";
import { withFormik, Field, Form } from "formik";
import { motion } from "framer-motion";

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
					maxLength={9}
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
		let tag = nextTag.trim();
		tag = tag.replace("#", "");
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
		<motion.div className="motion-wrap" layout>
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
							collapsed={true}
						/>
					)}
				</div>
			</div>
			{content === "player" && contentJson && (
				<div className="card">
					<div className="content center">
						<img
							src={contentJson?.league?.iconUrls.medium}
							alt={contentJson?.league?.name}
						/>
						<div className="flex">
							<h1>{contentJson?.name}</h1>
							<p className="xp">{contentJson?.expLevel}</p>
						</div>
						<h3>{contentJson?.tag}</h3>
						<ul>
							<li>Town Hall {contentJson?.townHallLevel}</li>
							<li>{contentJson?.trophies} Trophies</li>
							<li>Trophies Best {contentJson?.bestTrophies}</li>
							<li>{contentJson?.warStars} War Stars</li>
							<li>{contentJson?.donations} Donations Given</li>
							<li>{contentJson?.donationsReceived} Donations Received</li>
							<li>Builder Hall {contentJson?.builderHallLevel}</li>
							<li>{contentJson?.versusTrophies} Versus Trophies</li>
						</ul>

						<h1 className="troops">Troops</h1>
						{contentJson?.troops.map((troop, key) => (
							<div key={key}>
								<h3>{troop?.name}</h3>
								<p>
									Level {troop?.level}/{troop?.maxLevel}
								</p>
							</div>
						))}
					</div>
				</div>
			)}
		</motion.div>
	);
};

export default Card;
