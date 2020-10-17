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

function GoalBuilder(props) {
	
	const ID = props.match.params.goalId;
	const GOALOPTIONS = [
		{value: "edit", displayName: "Edit"},
		{value: "details", displayName: "Details"},
		{value: "share", displayName: "Share"},
		{value: "delete", displayName: "Delete"}
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
				<Row style = {{marginBottom: "1%"}}>
					<Col lg = {4}>
						<Row>
							<Col>
								<Row>
									<Col>
										<h3> 	
											{goal.name} 
											<Button variant = "light" style = {{marginLeft: "0.5%"}} size = "sm"> ⚙️ </Button>
										</h3>
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
				<Row style = {{marginBottom: "1%"}}>
					<Col>
						<Button variant = "light" style = {{float: "left", marginRight: "1%"}} onClick = {() => setShow(true)}> 
							+
						</Button>
						<h5 style = {{marginTop: "0.5%"}}>
							📝 Tasks 
						</h5>
					</Col>
					<Col lg = {1}> </Col>
				</Row>
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
														<Dropdown style = {{float: "right", height: "50%"}}>
															<Dropdown.Toggle className = "my-dropdown-toggle" variant = "light">
															</Dropdown.Toggle>
															<Dropdown.Menu>
															{TASKOPTIONS.map((option) => {
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