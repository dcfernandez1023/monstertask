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
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';

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
			else if(quereySnapshot.docs.length === 0) {
				return;
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
		{goal !== null && goal !== undefined ?
			<Container fluid>
				<Row>
					<Col>
						<Card>
							<Card.Header>
								<Row>
									<Col>
										<Row style = {{marginBottom: "0.5%"}}>
											<Col>
												{goal !== null && goal !== undefined ? goal.name: null}
											</Col>
										</Row>
										<Row>
											<Col>
												<Badge pill variant = "light"> Deadline: {goal.deadline} </Badge>
											</Col>
										</Row>
									</Col>
									<Col style = {{textAlign: "right"}}>
										<Dropdown style = {{marginLeft: "1%"}}>
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
								</Row>
							</Card.Header>
							<Card.Body>
								
							</Card.Body>
						</Card>
					</Col>
				</Row>
				{/*
				<Row>
					<Col sm = {4}>
						<Row>
							<h2> {goal !== null && goal !== undefined ? goal.name: null} </h2>
							<Dropdown style = {{marginLeft: "1%"}}>
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
						</Row>
						<Row>
							<div 
								style = {{marginLeft: "1%", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
							> 
								<i> {goal.description} </i>
							</div>
						</Row>
						<Row>
							<h6> <Badge pill variant = "light"> Due: {goal.deadline} </Badge> </h6>
						</Row>
						<Row>
							<Col>
							<ProgressBar 
								now = {100-goal.percentageCompleted} 
								label = {(100-goal.percentageCompleted).toString() + "%"} 
								variant = "danger"
								style = {{height: "30px"}}
							/>
							</Col>
						</Row>
					</Col>
					<Col sm = {8}>
					</Col>
				</Row>
				*/}
			</Container>
			:
			<Row>
				<Col>
					<Spinner 
						animation = "border"
						variant = "dark"
					/>
				</Col>
			</Row>
		}
		</Container>
	);
}

export default GoalBuilder;