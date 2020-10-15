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
import Dropdown from 'react-bootstrap/Dropdown';
import '../component-css/Dropdown.css';

function GoalBuilder(props) {
	
	const ID = props.match.params.goalId;
	const GOALOPTIONS = [
		{value: "edit", displayName: "Edit"},
		{value: "share", displayName: "Share"},
		{value: "delete", displayName: "Delete"}
	];
	
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
			<br/>
			<Row>
				<Col>
					<Dropdown>
					{/*TODO: get rid of arrow on dropdown*/}
						<Dropdown.Toggle className = "my-dropdown-toggle" variant = "light">
							&#8942;
						</Dropdown.Toggle>
						<Dropdown.Menu>
						{GOALOPTIONS.map((option) => {
							return (
								<Dropdown.Item> {option.displayName} </Dropdown.Item>
							);
						})}
						</Dropdown.Menu>
					</Dropdown>
				</Col>
				<Col>
					<h3> {goal !== null && goal !== undefined ? goal.name: null} </h3>
				</Col>
			</Row>
		</Container>
	);
}

export default GoalBuilder;