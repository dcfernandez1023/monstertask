import React, { useState, useEffect } from 'react';
import MtNavbar from '../components/MtNavbar.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import { useParams } from 'react-router';

function GoalBuilder(props) {
	
	const ID = props.match.params.goalId;
	
	const[goal, setGoal] = useState();
	
	useEffect(() => {
		getGoal();
	}, []);
	
	function getGoal() {
		props.getQuerey("goalId", ID, "goals").onSnapshot(quereySnapshot => {
			if(quereySnapshot.docs.length === 1) {
				setGoal(quereySnapshot.docs[0].data());
			}
			else {
				//TODO: handle this error more elegantly
				alert("Error: duplicate ids");
			}
		});
	}
	
	return (
		<Container fluid>
			<Row>
				<Col>
					<MtNavbar
						signout = {props.signout}
					/>
				</Col>
			</Row>
			<Row>
				<Col>

				</Col>
			</Row>
		</Container>
	);
}

export default GoalBuilder;