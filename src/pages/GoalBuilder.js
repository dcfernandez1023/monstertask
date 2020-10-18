import React, { useState, useEffect } from 'react';

import '../component-css/GoalBuilder.css';

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
import DropdownButton from 'react-bootstrap/DropdownButton';
import Spinner from 'react-bootstrap/Spinner';
import Badge from 'react-bootstrap/Badge';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ListGroup from 'react-bootstrap/ListGroup';
import MtNavbar from '../components/MtNavbar.js';
import TaskModal from '../components/TaskModal.js';
import InputGroup from 'react-bootstrap/InputGroup';

function GoalBuilder(props) {
	
	const ID = props.match.params.goalId;
	const GOALOPTIONS = [
		{value: "edit", displayName: "Edit"},
		{value: "details", displayName: "Details"},
		{value: "share", displayName: "Share"},
		{value: "delete", displayName: "Delete"},
		{value: "completeGoal", displayName: "Complete Goal"}
	];
	const TASKOPTIONS = [
		{value: "edit", displayName: "Edit"},
		{value: "delete", displayName: "Delete"},
		{value: "completeAllSubtasks", displayName: "Complete All Sub-tasks"}
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
	const[show, setShow] = useState(false);
	const[newSubs, setNewSubs] = useState([]);
	
	useEffect(() => {
		console.log("hello");
		getGoal();
	}, []);
	
	function getGoal() {
		props.getQuerey("goalId", ID, "goals").onSnapshot(quereySnapshot => {
			if(quereySnapshot.docs.length === 1) {
				var userGoal = quereySnapshot.docs[0].data()
				setGoal(userGoal);
				trackNewSubs(userGoal);
			}
			else if(quereySnapshot.docs.length === 0) {
				return;
			}
			else {
				//TODO: handle this error more elegantly
				console.log("hi");
				setGoal({});
			}
		});
	}
	
	function createNewTask(newTask) {
		if(goal === undefined || goal === null) {
			return;
		}
		newTask.dateCreated = new Date().toLocaleDateString();
		goal.tasks.push(newTask);
		props.writeOne(goal.goalId, goal, "goals", 
			function(res, data){
				console.log(res);
				setShow(false);
			},
			function(error) {
				//TODO: handle this error more elegantly
				alert(error.toString());
			}
		);
	}
	
	function trackNewSubs(goal) {
		if(goal !== undefined && goal !== null) {
			var tracker = [];
			for(var i = 0; i < goal.tasks.length; i++) {
				var newSubTracker = {};
				newSubTracker.name = "";
				newSubTracker.isAdding = false;
				tracker.push(newSubTracker);
			}
			setNewSubs(tracker);
		}
	}
	
	function addSubTask(subName, index) {
		if(goal !== undefined && goal !== null) {
			var copy = JSON.parse(JSON.stringify(goal));
			copy.tasks[index].subTasks.push();
			
		}
	}
	
	return (
		<Container fluid>
			<TaskModal 
				show = {show} 
				setShow = {setShow} 
				taskModel = {props.taskModel} 
				taskFields = {props.taskFields}
				createTask = {createNewTask}
			/>
			<Row>
				<Col>
					<MtNavbar
						leftButtonClick = {() => {window.location.pathname = "/"}}
						rightButtonClick = {props.signout}
						leftButtonValue = "🏠"
						rightButtonValue = "Logout"
					/>
				</Col>
			</Row>
			<br/>
		{goal !== null && goal !== undefined ?
			<div>
				<Row>
					<Col lg = {4}>
						<Row>
							<Col>
								<Row style = {{marginBottom: "1%"}}>
									<Col sm = {10}>
										<h3>
											{goal.name}					 
										</h3>
									</Col>
									<Col sm = {2}>
										<DropdownButton variant = "light" style = {{float: "right"}} size = "sm">
											<Dropdown.Header> Goal Options </Dropdown.Header>
											<Dropdown.Divider />
											{GOALOPTIONS.map((option) => {
												return (
													<Dropdown.Item> {option.displayName} </Dropdown.Item>
												);
											})}
										</DropdownButton>	
									</Col>
								</Row>
								<Row>
									<Col>
										<p>
											❤ 											
											<Badge pills>
												<ProgressBar 
													now = {100-goal.percentageCompleted} 
													label = {(100-goal.percentageCompleted).toString() + "%"} 
													variant = "danger"
													style = {{width: "150px"}}
												/>
											</Badge>
										</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p> ⏲️ <Badge pill variant = "light"> {goal.deadline} </Badge> </p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p> 💬 <i> {goal.description} </i> </p>
									</Col>
								</Row>
								<Row>
									<Col>
										<p> 👤 {goal.userCreated} </p>
									</Col>
								</Row>
							</Col>
						</Row>
					</Col>
					<Col lg = {8}>
						<Card>
							<Card.Header> Chat Room </Card.Header>
							<Card.Body>
								<Card.Title>
									*in progress!* 
								</Card.Title>
							</Card.Body>
							<Card.Footer>
								<small> Last Active: </small>
							</Card.Footer>
						</Card>
					</Col>
				</Row>
				<br/>
				<Row>
					<Col>
						<Button variant = "secondary" style = {{float: "left", marginRight: "1%"}} onClick = {() => setShow(true)}> 
							+
						</Button>
						<h5 style = {{marginTop: "0.5%"}}>
							📝 Tasks 
						</h5>
					</Col>
					<Col lg = {1}> </Col>
				</Row>
				<br/>
				<Row>
					{goal.tasks.length === 0 ?
						<Col style = {{textAlign: "center", marginTop: "1%"}}>
							<h6> Nothing to see here... Add some tasks! 😃 </h6>
						</Col>
					:
					<Col>
						<Row>
							{goal.tasks.map((task, index) => {	
								return (
									<Col xl = {4}>
										<Card style = {{marginBottom: "5%"}}>
											<Card.Header> 
												<Row>
													<Col>
														{task.name}
													</Col>
													<Col>
														<DropdownButton variant = "light" size = "sm" style = {{float: "right"}}>
															<Dropdown.Header> Task Options </Dropdown.Header>
															<Dropdown.Divider />
															{TASKOPTIONS.map((option) => {
																return (
																	<Dropdown.Item> {option.displayName} </Dropdown.Item>
																);
															})}
														</DropdownButton>
													</Col>
												</Row>
												<Row>
													<Col>
														<div style = {{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
															<i> {task.description} </i>
														</div>
													</Col>
												</Row>
												<Row>
													<Col>
														<Badge pills variant = "dark"> Due: {task.deadline} </Badge>
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
												<ListGroup.Item> 
												{newSubs.length === 0 ?
												<div></div>
												:
												<div>
												{newSubs[index].isAdding ?
													<Row>
														<Col>
															<Row>
																<Col>
																	<Form.Control 
																		as = "input"
																		name = "name"
																		value = {newSubs[index].name}
																		onChange = {(e) => {
																			var copy = newSubs.slice();
																			copy[index].name = e.target.value;
																			setNewSubs(copy);
																		}}
																		style = {{height: "75%"}}
																		placeholder = "Sub-task Name"
																	/>
																</Col>
															</Row>
															<Row>
																<Col xs = {1}>
																	📅
																</Col>
																<Col xs = {11}>
																	<Form.Control 
																		as = "input"
																		name = "deadline"
																		style = {{height: "75%", border: "none"}}
																		placeholder = "Deadline"
																	/>
																</Col>
															</Row>
															<Row>
																<Col xs = {1}>
																	💬
																</Col>
																<Col xs = {11}>
																	<Form.Control
																		as = "input"
																		name = "description"
																		style = {{height: "75%", border: "none"}}
																		placeholder = "Description"
																	/>
																</Col>
															</Row>
															<Row style = {{textAlign: "center"}}>
																<Col>
																	<Button variant = "light" size = "sm" style = {{float: "center", margin: "1%"}} onClick = {() => {
																															var copy = newSubs.slice();
																															copy[index].isAdding = false;
																															copy[index].name = "";
																															setNewSubs(copy);
																														}}
																	>
																		❌
																	</Button>														
																</Col>
																<Col>
																	{/*TODO: make this check mark button save the subtask as well */}
																	<Button variant = "light" size = "sm" style = {{float: "center", margin: "1%"}} onClick = {() => {
																															var copy = newSubs.slice();
																															copy[index].isAdding = false;
																															copy[index].name = "";
																															setNewSubs(copy);
																														}}
																	>
																		✔️
																	</Button>	
																</Col>
															</Row>
														</Col>
													</Row>
												:
													<Row>
														<Col>
															<Button variant = "light" style = {{width: "100%"}} onClick = {() => {
																													var copy = newSubs.slice();
																													copy[index].isAdding = true;
																													setNewSubs(copy);
																												}}
															>
																+ Add Sub-task
															</Button>
														</Col>
													</Row>
												}
												</div>
												}
												</ListGroup.Item>
											</ListGroup>
											<Card.Footer>
												<small className = "text-muted"> {task.percentageCompleted}% completed </small>
											</Card.Footer>
										</Card>
									</Col>
								);
							})}
						
						</Row>
					</Col>
					}
				</Row>
			</div>
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