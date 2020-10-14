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

function GoalTab(props) {
	
	const[goalModalShow, setShow] = useState(false);
	
	function createNewGoal(newGoal) {
		newGoal.goalId = new Date().getTime().toString() + props.userInfo.email.toString();
		newGoal.userCreated = props.userInfo.email;
		newGoal.dateCreated = new Date().toLocaleDateString();
		props.writeOne(newGoal.goalId, newGoal, "goals", 
			function(res, data){
				console.log(res);
				props.setGoal(newGoal);
				window.location.pathname = "/goalBuilder/" + data.goalId.toString();
			},
			function(error) {
				alert(error.toString());
			}
		);
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
			<Row style = {{marginTop: "2%"}}>
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
		</Container>
	);
}

export default GoalTab;