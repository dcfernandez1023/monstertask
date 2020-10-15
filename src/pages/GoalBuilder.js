import React, { useState, useEffect } from 'react';
import MtNavbar from '../components/MtNavbar.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardColumns from 'react-bootstrap/CardColumns';
import { useParams } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';

function GoalBuilder(props) {
	
	const ID = props.match.params.goalId;
	const GOALOPTIONS = [
		{value: "edit", displayName: "Edit"},
		{value: "details", displayName: "Details"},
		{value: "share", displayName: "Share"},
		{value: "delete", displayName: "Delete"}
	];
	const testTasks = [
		{
			name: "Task 1", 
			deadline: "10/20/20", 
			description: "testing task 1", 
			percentageCompleted: 5,
			subTasks: [
				{name: "subTask1", description: "yooooooo this is a subtask"}, 
				{name: "subTask2", description: "yooooooo this is a subtask"}, 
				{name: "subTask3", description: "yooooooo this is a subtask"}
			]
		},
		{
			name: "Task 2", 
			deadline: "10/18/20", 
			description: "testing task 2 yoooooo", 
			percentageCompleted: 0,
			subTasks: [
				{name: "subTask1", description: "yooooooo this is a subtask"}, 
				{name: "subTask2", description: "yooooooo this is a subtask"}, 
				{name: "subTask3", description: "yooooooo this is a subtask"}
			]
		},
		{
			name: "Task 3", 
			deadline: "10/21/20", 
			description: "testing task 3 dawggggggg", 
			percentageCompleted: 0,
			subTasks: [
				{name: "subTask1", description: "yooooooo this is a subtask"}, 
				{name: "subTask2", description: "yooooooo this is a subtask"}, 
				{name: "subTask3", description: "yooooooo this is a subtask"}
			]
		},
		{
			name: "Task 4", 
			deadline: "10/20/20", 
			description: "testing task 4", 
			percentageCompleted: 20,
			subTasks: [
				{name: "subTask1", description: "yooooooo this is a subtask"}, 
				{name: "subTask2", description: "yooooooo this is a subtask"}, 
				{name: "subTask3", description: "yooooooo this is a subtask"}
			]
		},
		{
			name: "Task 5", 
			deadline: "10/18/20", 
			description: "testing task 5 yoooooo", 
			percentageCompleted: 75,
			subTasks: [
				{name: "subTask1", description: "yooooooo this is a subtask"}, 
				{name: "subTask2", description: "yooooooo this is a subtask"}, 
				{name: "subTask3", description: "yooooooo this is a subtask"}
			]
		},
		{
			name: "Task 6", 
			deadline: "10/21/20", 
			description: "testing task 6 dawggggggg", 
			percentageCompleted: 100,
			subTasks: [
				{name: "subTask1", description: "yooooooo this is a subtask"}, 
				{name: "subTask2", description: "yooooooo this is a subtask"}, 
				{name: "subTask3", description: "yooooooo this is a subtask"}
			]
		}
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
						<Card style = {{border: "none"}}>
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
								<Row>
									<Col md = {5}>
										<Row>
											<Col xs = {1}>
												💬
											</Col>
											<Col xs = {11}>
												<p>
													<i> {goal.description} </i>
												</p>
											</Col>
										</Row>
										<Row>
											<Col xs = {1}>
												👤
											</Col>
											<Col xs = {11}>
												<p> {goal.userCreated} </p>
											</Col>
										</Row>
										<Row>
											<Col xs = {1}>
												❤️
											</Col>
											<Col xs = {11}>
												<ProgressBar 
													now = {100-goal.percentageCompleted} 
													label = {(100-goal.percentageCompleted).toString() + "%"} 
													variant = "danger"
													style = {{height: "30px"}}
												/>
											</Col>
										</Row>
									</Col>
									<Col md= {7} style = {{textAlign: "center"}}>
										<h5> *goal analytics section* </h5>
									</Col>
								</Row>
								<br/>
								<Row>
									<Col>
										<h5> 📝 Tasks </h5>
									</Col>
								</Row>

								<Row>
									<Col>
										<Row>
											{testTasks.map((task) => {
												return (
													<Col md = {3}>
														<Card style = {{marginBottom: "5%"}}>
															<Card.Header> 
																<Row>
																	<Col sm = {3}>
																		{task.name}
																	</Col>
																	<Col sm = {3}>
																		<Badge pills variant = "dark"> Due: {task.deadline} </Badge>
																	</Col>
																	<Col sm = {6} style = {{textAlign: "right"}}>
																		<Dropdown>
																			<Dropdown.Toggle className = "my-dropdown-toggle" variant = "light">
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
																<Row>
																	<Col>
																		{task.percentageCompleted}% completed
																	</Col>
																</Row>
																<Row>
																	<Col>
																		<div style = {{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
																			<i> {task.description} </i>
																		</div>
																	</Col>
																</Row>
															</Card.Header>
															<ListGroup variant = "flush">
																{task.subTasks.map((sub) => {
																	return (
																		<ListGroup.Item>
																			<Row>
																				<Col>
																					<Form.Check
																						type = "checkbox"
																						label = {sub.name}
																					/>
																				</Col>
																			</Row>
																		</ListGroup.Item>
																	);
																})}
															</ListGroup>
														</Card>
													</Col>
												);
											})}
										</Row>
									</Col>
								</Row>
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