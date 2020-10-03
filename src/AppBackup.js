import React, { useState, useEffect, useMountEffect } from 'react';
import './component-css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

const DB = require('./controller/db.js');
const GOALMODEL = require('./models/goal.js');

function App() {
	const[newGoal, updateNewGoal] = useState(GOALMODEL.goal);
	const[existingGoals, updateExistingGoals] = useState();
	
	useEffect(() => {
		setExistingGoals();
	}, []);
	
	//test function to set and listen for goals
	function setExistingGoals() {
		DB.getQuerey("userCreated", "test", "goals").onSnapshot(quereySnapshot => {
			var goals = [];
			for(var i in quereySnapshot.docs) {
				goals.push(quereySnapshot.docs[i].data());
			}
			updateExistingGoals(goals);
		});
	}

	//test function to display goals from db
	function getGoals() {
		DB.getAllGoals()
			.then(snapshot => updateExistingGoals(snapshot.val()));
	}
	
	//test function to set listener on a specific location in realtime db
	function setDbRefs() {
		DB.getDbRef("/").on("value", snapshot => {
			updateExistingGoals(snapshot.val());
		});
	}
	
	function displayGoals() {
		if(existingGoals === null || existingGoals === undefined) {
			return <div> </div>;
		}
		const display = <CardDeck>
			{existingGoals.map((goal) => {
				return (
					<Card>
						<Card.Title> {goal.name} </Card.Title>
						<Card.Body>
							{newGoal.allFieldsDisplay.map((displayName, index) => {
								return (
									<div>
										<Form.Label> {displayName} </Form.Label>
										<p> {goal[newGoal.fieldsSave[index]]} </p>
										<br/>
									</div>
								);
							})}
						</Card.Body>
					</Card>
				);
			})}
		</CardDeck>
		return display;
	}
	
	//test function to handle newGoalInput
	function handleNewGoalChange(e) {
		var name = [e.target.name][0];
		var value = e.target.value;
		var goal = JSON.parse(JSON.stringify(newGoal));
		goal[name] = value;
		updateNewGoal(goal);
	}
	
	async function addNewGoal() {
		var goal = {};
		var goalId = new Date().getTime().toString();
		var dateCreated = new Date().toString();
		var userCreated = "test"; //will be email/name later on
		for(var i = 0; i < newGoal.fieldsSave.length; i++) {
			var field = newGoal.fieldsSave[i];
			goal[field] = newGoal[field];
		}
		goal.goalId = goalId;
		goal.dateCreated = dateCreated;
		goal.userCreated = userCreated;
		console.log(goal);
		await DB.writeOne(goalId, goal, "goals");
		console.log("success");
	}

	function renderGoalInputs() {
		const inputs = GOALMODEL.goal.editableFields.map((key, index) => {
			return (
				<Form key = {index}>
					<Form.Label> {GOALMODEL.goal.editableFieldsDisplay[index]} </Form.Label>
					<Form.Control
						as = "input"
						name = {key}
						value = {newGoal[key]}
						onChange = {handleNewGoalChange}
					/>
				</Form>
			);
		});
		return (
			<div>
				<Row>
					<Col>
						{inputs}
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<Button onClick = {addNewGoal.bind(this)}> Add </Button>
					</Col>
				</Row>
			</div>
		);
	}
	
	return (
		<body style = {{backgroundImage: "url('/dungeon.png')"}}>
			<Container>
				<Row>
					<Col>
						<h1 style = {{textAlign: "center"}}> React and Firebase!!! </h1>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<h3> Add a Goal </h3>
					</Col>
				</Row>
				<Row>
					<Col>
						{renderGoalInputs()}
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<h3> Your Goals </h3>
					</Col>
				</Row>
				<br/>
				<Row>
					{displayGoals()}
				</Row>
			</Container>
		</body>
	);
}

export default App;
