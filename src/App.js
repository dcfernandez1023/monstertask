import React, { useState, useEffect, useLayoutEffect } from 'react';
import Login from './components/Login.js';
import Home from './components/Home.js';
import GoalBuilder from './pages/GoalBuilder.js';

import './component-css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const DB = require('./controller/db.js');
const GOALMODEL = require('./models/goal.js');
const TASKMODEL = require('./models/task.js');
const AUTH = require('./controller/auth.js');

function App() {
	
	//state objects
	const[userGoals, updateUserGoals] = useState();
	const[userInfo, setUserInfo] = useState();
	const[currentGoal, setCurrentGoal] = useState(GOALMODEL.goal);
	
	//functions to be called after initial render or updates on the DOM
	useEffect(() => {
		setExistingGoals();
		isUserSignedin();
	}, []);
	
	//sets userGoals state object 
	//initializes a db listener that will trigger and set state whenever changes to the path in the db are made
	function setExistingGoals() {
		DB.getQuerey("userCreated", "test", "goals").onSnapshot(quereySnapshot => {
			var goals = [];
			for(var i in quereySnapshot.docs) {
				goals.push(quereySnapshot.docs[i].data());
			}
			updateUserGoals(goals);
		});
	}
	
	//sets userInfo state object
	//passes a call back to AUTH controller to set state object of this component
	function isUserSignedin() {
		const callback = (user) => {
			console.log(user);
			setUserInfo(user);
		}
		AUTH.isUserSignedin(callback);
	}
	
	//sets currentGoal state object when transitioning to goalBuilder to view/edit a goal
	//currentGoal is initially the model for a new goal, so if user is adding a new goal, then currentGoal will not be changed
	function setGoal(goal) {
		setCurrentGoal(goal);
	}
	
	return(
		<Router>
			<Switch>
			{/*TODO: fix glitchy browser back button; the login page gets rendered very briefly*/}
				<Route exact path = "/">
					{userInfo === null?
					<body style = {{backgroundImage: "url('dungeon_background.png')"}}>
						<Login 
							googleSignin = {AUTH.googleSignin}
						/>
					</body> 
					:
					<body /*style = {{backgroundImage: "url('mossy_bricks.jpg')"}}*/>
						<Home 
							signout = {AUTH.signout} 
							goalModel = {GOALMODEL.goal} 
							goalFields = {GOALMODEL.goalFields}
							userInfo = {userInfo}
							writeOne = {DB.writeOne}
							getQuerey = {DB.getQuerey}
						/>
					</body>
					}
				</Route>
				<Route 
					path = "/goalBuilder/:goalId"
					render = {(props) => 
						<body /*style = {{backgroundImage: "url('mossy_bricks.jpg')"}}*/>
							<GoalBuilder 
								{...props}
								signout = {AUTH.signout} 
								writeOne = {DB.writeOne}
								getQuerey = {DB.getQuerey}
								taskModel = {TASKMODEL.task}
								taskFields = {TASKMODEL.taskFields}
								{...props}
							/>
						</body>
					}
				/>
			</Switch>
		</Router>
	);
}

export default App;
