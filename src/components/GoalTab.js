import React, { useState, useEffect } from 'react';
import NewGoalModal from './NewGoalModal.js';

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

function GoalTab(props) {
	
	const[goalModalShow, setShow] = useState(false);
	const [userGoals, setUserGoals] = useState();
	
	useEffect(() => {
		getUserGoals();
	}, [props.userInfo]);
	
	function createNewGoal(newGoal) {
		newGoal.goalId = new Date().getTime().toString() + props.userInfo.email.toString();
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
		props.getQuerey("userCreated", props.userInfo.email, "goals").onSnapshot(quereySnapshot => {
			var goals = []
			for(var i = 0; i < quereySnapshot.docs.length; i++) {
				goals.push(quereySnapshot.docs[i].data());
			}
			setUserGoals(goals);
		});
	}
	
	return (
		<Container fluid>
				<NewGoalModal 
					show = {goalModalShow} 
					setShow = {setShow} 
					goalModel = {props.goalModel} 
					fields = {props.goalFields}
					createGoal = {createNewGoal}
				/>
				{userGoals === undefined || userGoals === null ?
				<Row style = {{marginTop: "2%"}}>
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
							<Button variant = "light" /*onClick = {() => {window.location.pathname = "/goalBuilder"}}*/
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
															label = {(100-goal.percentageCompleted).toString() + "%"} 
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