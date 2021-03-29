import React, { useState, useRef, useEffect } from "react";
import ReactJson from "react-json-view";
import { ImSpinner8 } from "react-icons/im";
import { withFormik, Field, Form } from "formik";
import { motion, animate } from "framer-motion";

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

	// Animated counter that returns animated p tag.
	const Counter = ({ from, to }) => {
		const nodeRef = useRef();

		useEffect(() => {
			const node = nodeRef.current;

			const controls = animate(from, to, {
				duration: 1,
				onUpdate(value) {
					node.textContent = value.toFixed(0);
				},
			});

			return () => controls.stop();
		}, [from, to]);

		return <p ref={nodeRef} />;
	};

	const getLeagueClass = (league) => {
		if (league.toLowerCase().includes("legend")) {
			return "legend";
		} else if (league.toLowerCase().includes("titan")) {
			return "titan";
		} else if (league.toLowerCase().includes("champion")) {
			return "champions";
		} else if (league.toLowerCase().includes("master")) {
			return "masters";
		} else if (league.toLowerCase().includes("crystal")) {
			return "crystal";
		} else if (league.toLowerCase().includes("gold")) {
			return "gold";
		} else if (league.toLowerCase().includes("silver")) {
			return "silver";
		} else {
			return "bronze";
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
							<p className={`xp ${getLeagueClass(contentJson?.league?.name)}`}>
								{contentJson?.expLevel}
							</p>
						</div>
						<h3>{contentJson?.tag}</h3>
						<ul>
							<li>
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									Town Hall
								</span>
								<Counter from={0} to={contentJson?.townHallLevel} />
							</li>
							<li>
								<Counter from={0} to={contentJson?.trophies} />
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									Trophies
								</span>
							</li>
							<li>
								Trophies Best
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									<Counter from={0} to={contentJson?.bestTrophies} />
								</span>
							</li>
							<li>
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									<Counter from={0} to={contentJson?.warStars} />
								</span>
								War Stars
							</li>
							<li>
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									<Counter from={0} to={contentJson?.donations} />
								</span>
								Donations Given
							</li>
							<li>
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									<Counter from={0} to={contentJson?.donationsReceived} />
								</span>
								Donations Received
							</li>
							<li>
								Builder Hall
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									<Counter from={0} to={contentJson?.builderHallLevel} />
								</span>
							</li>
							<li>
								<span
									className={`${getLeagueClass(contentJson?.league?.name)}`}
								>
									<Counter from={0} to={contentJson?.versusTrophies} />
								</span>
								Versus Trophies
							</li>
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
