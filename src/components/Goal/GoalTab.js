import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { v4 as uuidv4} from 'uuid';

import CreateGoalModal from './CreateGoalModal.js';

const DB = require('../../controller/db.js');
const GOALMODEL = require('../../models/goal.js');

function GoalTab(props) {

	const[goalModalShow, setShow] = useState(false);
	const [userGoals, setUserGoals] = useState();

	useEffect(() => {
		getUserGoals();
	}, [props.userInfo]);

	function createNewGoal(newGoal) {
		newGoal.goalId = new Date().getTime().toString() + uuidv4().toString();
		newGoal.userCreated = props.userInfo.email;
		newGoal.dateCreated = new Date().toLocaleDateString();
		props.writeOne(newGoal.goalId, newGoal, "goals",
			function(res, data){
				console.log(res);
				window.location.pathname = "/goalBuilder/" + data.goalId.toString();
			},
			function(error) {
				//TODO: handle this error more elegantly
				alert(error.toString());
			}
		);
	}

	function getUserGoals() {
		if(props.userInfo === undefined) {
			return;
		}
		DB.getQuerey("userCreated", props.userInfo.email, "goals").onSnapshot(quereySnapshot => {
			var goals = [];
			for(var i = 0; i < quereySnapshot.docs.length; i++) {
				goals.push(quereySnapshot.docs[i].data());
			}
			setUserGoals(goals);
		});
	}

	return (
		<Container fluid>
				<CreateGoalModal
					show = {goalModalShow}
					setShow = {setShow}
					goalModel = {props.goalModel}
					fields = {props.goalFields}
					createGoal = {createNewGoal}
				/>
				<Row>
					<br/>
				</Row>
				{userGoals === undefined || userGoals === null ?
				<Row style = {{textAlign: "center"}}>
					<Col>
						<Spinner
							variant = "dark"
							animation = "border"
						/>
					</Col>
				</Row>
				:
				<div>
					<Row style = {{marginTop: "2%", marginBottom: "3%"}}>
						<Col></Col>
						<Col style = {{textAlign: "center"}}>
							<h3> Goals </h3>
						</Col>
						<Col style = {{textAlign: "right"}}>
							<Button variant = "outline-dark" /*onClick = {() => {window.location.pathname = "/goalBuilder"}}*/
								onClick = {() => setShow(true)}
							>
								+
							</Button>
						</Col>
					</Row>
					<Row style = {{marginTop: "1%"}}>
						{userGoals.map((goal) => {
							return (
								<Col md = {3} style = {{marginBottom: "5%"}}>
									<a style = {{cursor: "pointer"}} onClick = {() => window.location.pathname = "/goalBuilder/"+goal.goalId}>
										<Card border = "dark">
											<Card.Img variant = "top" src = "dungeon.png"/>
											<Card.Body>
												<Card.Title as = "h6">
													{goal.name}
													<Badge pills variant = "light" style = {{marginLeft: "3%"}}> ⏲️ {goal.deadline} </Badge>
													{goal.sharedWith.length === 0 ?
															<Badge pills variant = "light"> 👥 1 </Badge>
														:
															<Badge pills variant = "light"> 👥 {goal.sharedWith.length+1} </Badge>
													}
												</Card.Title>
												<Row>
													<Col>
														<ProgressBar
															now = {100-goal.percentageCompleted}
															label = {100-(goal.percentageCompleted).toString() + "%"}
															variant = "danger"
														/>
													</Col>
												</Row>
											</Card.Body>
										</Card>
									</a>
								</Col>
							);
						})}
					</Row>
				</div>
				}
		</Container>
	);
}

export default GoalTab;