import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Card from "./components/Card";
import "./css/App.min.css";

const CommonCardContent = ({ children }) => (
	<>
		<div className="logo">
			<h1>Working with Clash</h1>
		</div>
		<div className="info-wrapper">
			<h3 className="info">
				Paste L98JC2LG in the player info section to view my profile.
			</h3>
		</div>
		<div className="forms">
			{children}
			{/* <Card content="clan" /> */}
		</div>
	</>
);

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<CommonCardContent>
						<Card content="player" />
					</CommonCardContent>
				</Route>
				<Route exact path="/tag/:tag">
					<CommonCardContent>
						<Card content="player" />
					</CommonCardContent>
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
