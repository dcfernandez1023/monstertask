import React, { useState, useEffect } from 'react';
import NewGoalModal from './NewGoalModal.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

function GoalTab(props) {
	
	const[goalModalShow, setShow] = useState(false);
	
	return (
		<Container fluid>
			<NewGoalModal fields = {props.goalModel.editableFields} show = {goalModalShow} setShow = {setShow}/>
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