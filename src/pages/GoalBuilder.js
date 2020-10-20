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
import SubTaskModal from '../components/SubTaskModal.js';
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
		{value: "completeTask", displayName: "Complete Task"}
	];
	
	const[goal, setGoal] = useState();
	const[show, setShow] = useState(false);
	const[subShow, setSubShow] = useState(false);
	const[newSub, setNewSub] = useState();
	const[newSubIndex, setNewSubIndex] = useState(-1);
	const[subToEdit, setSubToEdit] = useState();
	
	useEffect(() => {
		console.log("hello");
		getGoal();
		setNewSub(props.subTaskModel);
	}, [props.subTaskModel]);
	
	function getGoal() {
		props.getQuerey("goalId", ID, "goals").onSnapshot(quereySnapshot => {
			if(quereySnapshot.docs.length === 1) {
				var userGoal = quereySnapshot.docs[0].data()
				setGoal(userGoal);
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
		}
	}
	
	function addSubTask(index) {
		if(goal !== undefined && goal !== null) {
			newSub.dateCreated = new Date().toLocaleDateString();
			var copy = JSON.parse(JSON.stringify(goal));
			copy.tasks[index].subTasks.push(newSub);
			props.writeOne(goal.goalId, copy, "goals",
				function(res, data) {
					setGoal(data);
				},
				function(error) {
					//TODO: handle this error more elegantly
					alert(error.toString());
				}
			);
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
			<SubTaskModal
				show = {subShow}
				setShow = {setSubShow}
				sub = {subToEdit}
				fields = {props.subTaskFields}
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
																<Col xs = {8}>
																		<Form.Check
																			type = "checkbox"
																			style = {{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
																			label = {sub.name + "fdjklsfjskldjfklfjsldkfjkdlsjflksdjfklsjfldskjfsldfjdslkfjslkfjsdlfjslfjsdlfjsdlkfjsdlkfsjdfsdjfds"}
																		/>
																</Col>
																<Col xs = {4} style = {{textAlign: "right"}}>
																	<Badge pills variant = "light"> 
																		⏲️ {sub.deadline}
																	</Badge>
																</Col> 
															</Row>
															<Row>
																<Col xs = {8}>
																	<p> <i> {sub.description} </i> </p> 
																</Col>
																<Col xs = {4} style = {{textAlign: "right"}}>
																	<Button 
																		variant = "outline-dark" 
																		size = "sm" 
																		style = {{marginTop: "5%"}}
																		onClick = {() => {
																			setSubShow(true);
																			setSubToEdit(sub);
																		}}
																	> 
																		✏️ 
																	</Button>
																</Col>
															</Row>
														</ListGroup.Item>
													);
												})}
												<ListGroup.Item> 
												{newSub === undefined || newSub === null ?
												<div></div>
												:
												<div>
												{newSubIndex === index ?
													<Row>
														<Col>
															<Row>
																<Col>
																	<Form.Control 
																		as = "input"
																		name = "name"
																		value = {newSub.name}
																		onChange = {(e) => {
																			var copy = JSON.parse(JSON.stringify(newSub));
																			copy.name = e.target.value;
																			setNewSub(copy);
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
																		onChange = {(e) => {
																			var copy = JSON.parse(JSON.stringify(newSub));
																			copy.deadline = e.target.value;
																			setNewSub(copy);
																		}}
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
																		onChange = {(e) => {
																			var copy = JSON.parse(JSON.stringify(newSub));
																			copy.description = e.target.value;
																			setNewSub(copy);
																		}}
																		style = {{height: "75%", border: "none"}}
																		placeholder = "Description"
																	/>
																</Col>
															</Row>
															<Row>
																<Col>
																	<Button variant = "light" size = "sm" style = {{float: "right", margin: "1%"}} onClick = {() => {
																															setNewSub(props.subTaskModel);
																															setNewSubIndex(-1);
																														}}
																	>
																		❌
																	</Button>														
																</Col>
																<Col>
																	{/*TODO: make this check mark button save the subtask as well */}
																	<Button variant = "light" size = "sm" style = {{float: "left", margin: "1%"}} onClick = {() => {
																															addSubTask(index)
																															setNewSub(props.subTaskModel);
																															setNewSubIndex(-1);
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
																													setNewSubIndex(index);
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