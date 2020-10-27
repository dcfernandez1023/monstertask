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
import DeleteModal from '../components/DeleteModal.js';
import InputGroup from 'react-bootstrap/InputGroup';
import Accordion from 'react-bootstrap/Accordion';

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
	const[taskShow, setTaskShow] = useState(false);
	const[task, setTask] = useState();
	const[taskIndex, setTaskIndex] = useState();
	const[taskModalTitle, setTaskModalTitle] = useState("");
	const[taskModalButton, setTaskModalButton] = useState("");
	
	const[subShow, setSubShow] = useState(false);
	const[newSub, setNewSub] = useState();
	const[newSubIndex, setNewSubIndex] = useState(-1);
	const[subToEdit, setSubToEdit] = useState();
	const[subToEditLocation, setSubToEditLocation] = useState({taskIndex: -1, subIndex: -1});
	
	const[deleteSubShow, setDeleteSubShow] = useState(false);
	const[deleteModalTitle, setDeleteModalTitle] = useState();
	const[deletePrompt, setDeletePrompt] = useState();	
	const[deleteType, setDeleteType] = useState("");
	const[deleteItemLocation, setDeleteItemLocation] = useState({});
	
	const[writeMode, setWriteMode] = useState("");
	
	useEffect(() => {
		console.log("hello");
		getGoal();
		setTask(props.taskModel);
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
	
	function writeTask(task, writeMode, taskIndex) {
		if(goal === undefined || goal === null) {
			return;
		}
		if(writeMode === "create") {
			task.dateCreated = new Date().toLocaleDateString();
			task.lastUpdated = new Date().toLocaleDateString();
			goal.tasks.push(task);
			props.writeOne(goal.goalId, goal, "goals", 
				function(res, data){
					//setShow(false);
				},
				function(error) {
					//TODO: handle this error more elegantly
					alert(error.toString());
				}
			);
		}
		else if(writeMode === "edit" && taskIndex !== undefined) {
			task.lastUpdated = new Date().toLocaleString();
			goal.tasks[taskIndex] = task;
			props.writeOne(goal.goalId, goal, "goals", 
				function(res, data) {
					//setShow(false);
				},
				function(error) {
					//TODO: handle this error more elegantly
					alert(error.toString());
				}
			);
		}
	}
	
	function calculateTaskPercentageCompleted(goalCopy, taskIndex) {
		var percentageCompleted = 0;
		var numSubsCompleted = 0;
		var totalSubs = goalCopy.tasks[taskIndex].subTasks.length;
		for(var i = 0; i < goalCopy.tasks[taskIndex].subTasks.length; i++) {
			var sub = goalCopy.tasks[taskIndex].subTasks[i];
			if(sub.dateCompleted.toString().trim().length !== 0) {
				numSubsCompleted = numSubsCompleted + 1;
			}
		}
		percentageCompleted = Math.round((numSubsCompleted/totalSubs)*100);	
		return percentageCompleted;
	}
	
	function addSubTask(index) {
		if(goal !== undefined && goal !== null) {
			newSub.dateCreated = new Date().toLocaleDateString();
			var copy = JSON.parse(JSON.stringify(goal));
			copy.tasks[index].subTasks.push(newSub);
			props.writeOne(goal.goalId, copy, "goals",
				function(res, data) {
					//setGoal(data);
				},
				function(error) {
					//TODO: handle this error more elegantly
					alert(error.toString());
				}
			);
		}
		else {
			//TODO: handle this error more elegantly
			alert("Could not add sub-task");
		}
	}
	
	function editSubTask(sub, taskIndex, subIndex) {
		if(sub === undefined || sub === null) {
			//TODO: handle this error more elegantly
			alert("Could not add sub-task");
		}
		else {
			var copy = JSON.parse(JSON.stringify(goal));
			copy.tasks[taskIndex].subTasks[subIndex] = sub;
			props.writeOne(goal.goalId, copy, "goals",
				function(res, data) {
				},
				function(error) {
					//TODO: handle this error more elegantly
					alert(error.toString());
				}
			);
		}
	}
	
	function deleteSubTask(taskIndex, subIndex) {
		if(taskIndex === -1 && subIndex === -1) {
			//TODO: handle this error more elegantly
			alert("Could not delete sub-task");
		}
		var copy = JSON.parse(JSON.stringify(goal));
		copy.tasks[taskIndex].subTasks.splice(subIndex, 1);
		props.writeOne(goal.goalId, copy, "goals",
			function(res, data) {
			},
			function(error) {
				//TODO: handle this error more elegantly
				alert(error.toString());
			}
		);
	}
	
	function completeSub(taskIndex, subIndex) {
		var copy = JSON.parse(JSON.stringify(goal));
		copy.tasks[taskIndex].subTasks[subIndex].dateCompleted = new Date().toLocaleDateString();
		copy.tasks[taskIndex].percentageCompleted = calculateTaskPercentageCompleted(copy, taskIndex);
		props.writeOne(goal.goalId, copy, "goals",
			function(res, data) {
			},
			function(error) {
				//TODO: handle this error more elegantly
				alert(error.toString());
			}
		);
	}
	
	function uncompleteSub(taskIndex, subIndex) {
		var copy = JSON.parse(JSON.stringify(goal));
		copy.tasks[taskIndex].subTasks[subIndex].dateCompleted = "";
		copy.tasks[taskIndex].percentageCompleted = calculateTaskPercentageCompleted(copy, taskIndex);
		props.writeOne(goal.goalId, copy, "goals",
			function(res, data) {
			},
			function(error) {
				//TODO: handle this error more elegantly
				alert(error.toString());
			}
		);
	}
	
	function onSelectTaskOption(key, taskIndex) {
		if(key === "edit") {
			setTaskIndex(taskIndex);
			setTaskModalTitle("Edit Task");
			setTaskModalButton("Done");
			setWriteMode("edit");
			setTask(goal.tasks[taskIndex]);
			setTaskShow(true);
		}
		if(key === "delete") {
			setDeleteSubShow(true);
			setDeleteItemLocation({taskIndex: taskIndex});
			setDeleteType("task");
			setDeleteModalTitle("Delete Task");
			setDeletePrompt("Are you sure you want to delete " + "'" + goal.tasks[taskIndex].name + "'" + "?");
			//deleteTask(taskIndex);
		}
	}
	
	function deleteTask(taskIndex) {
		if(taskIndex === -1) {
			//TODO: handle this error more elegantly
			alert("Could not delete sub-task");
		}
		var copy = JSON.parse(JSON.stringify(goal));
		copy.tasks.splice(taskIndex, 1);
		props.writeOne(goal.goalId, copy, "goals",
			function(res, data) {
			},
			function(error) {
				//TODO: handle this error more elegantly
				alert(error.toString());
			}
		);
	}
	
	function onClickYes(deleteType, goalIndex, taskIndex, subIndex) {
		if(deleteType === "subTask" && taskIndex !== undefined && subIndex !== undefined) {
			deleteSubTask(taskIndex, subIndex);
		}
		else if(deleteType === "task" && taskIndex !== undefined) {
			deleteTask(taskIndex);
		}
		else if(deleteType === "goal" && goalIndex !== undefined) {
			return;
		}
	}
	
	function onClickNo(deleteType) {
		if(deleteType === "subTask") {
			setDeleteSubShow(false);
		}
		else if(deleteType === "task") {
			setDeleteSubShow(false);
		}
		else if(deleteType === "goal") {
			return;
		}
	}
	
	return (
		<Container fluid>
			<TaskModal 
				show = {taskShow} 
				setShow = {setTaskShow} 
				task = {task}
				//taskModel = {props.taskModel}
				taskFields = {props.taskFields}
				writeTask = {writeTask}
				modalTitle = {taskModalTitle}
				buttonValue = {taskModalButton}
				writeMode = {writeMode}
				taskIndex = {taskIndex}
				setTask = {setTask}
			/>
			<SubTaskModal
				show = {subShow}
				setShow = {setSubShow}
				sub = {subToEdit}
				fields = {props.subTaskFields}
				subLocation = {subToEditLocation}
				setSubLocation = {setSubToEditLocation}
				editSub = {editSubTask}
			/>
			<DeleteModal
				show = {deleteSubShow}
				setShow = {setDeleteSubShow}
				deleteType = {deleteType}
				deleteModalTitle = {deleteModalTitle}
				bodyPrompt = {deletePrompt}
				onClickYes = {onClickYes}
				onClickNo = {setDeleteSubShow}
				deleteItemLocation = {deleteItemLocation} 
				setDeleteItemLocation = {setDeleteItemLocation}
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
						<Button variant = "outline-secondary" style = {{float: "left", marginRight: "1%"}} onClick = {() => {
																												setTaskModalTitle("Create New Task");
																												setTaskModalButton("Create");
																												setWriteMode("create");
																												setTask(props.taskModel);
																												setTaskShow(true);
																											}}
						> 
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
								var completedSubs = [];
								return (
									<Col lg = {4}>
										<Card className = "taskCard">
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
																	<Dropdown.Item 
																		eventKey = {option.value}
																		onSelect = {(key, e) => onSelectTaskOption(key, index)}
																	> 
																		{option.displayName} 
																	</Dropdown.Item>
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
											<Card.Body className = "taskCardBody">
												<ListGroup variant = "flush">
													{task.subTasks.map((sub, subIndex) => {
														if(sub.dateCompleted.trim().length !== 0) {
															completedSubs.push(subIndex);
														}
														else {
															return (
																<ListGroup.Item>
																	<Row>
																		<Col xs = {8}>
																				<Form.Check
																					type = "checkbox"
																					style = {{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
																					label = {sub.name}
																					onChange = {() => completeSub(index, subIndex)}
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
																					var copy = subToEditLocation;
																					copy.taskIndex = index;
																					copy.subIndex = subIndex;
																				}}
																			> 
																				✏️ 
																			</Button>
																			<Button 
																				variant = "outline-dark"
																				size = "sm"
																				style = {{marginTop: "5%"}}
																				onClick = {() => {
																					setDeleteItemLocation({taskIndex: index, subIndex: subIndex});
																					setDeleteType("subTask");
																					setDeleteSubShow(true);
																					setDeleteModalTitle("Delete Sub-task");
																					setDeletePrompt("Are you sure you want to delete sub-task " + "'" + sub.name + "'" + "?");
																				}}
																			>
																				🗑️
																			</Button>
																		</Col>
																	</Row>
																</ListGroup.Item>
															);
														}
													})}
													{completedSubs.length !== 0 ?
													<ListGroup.Item>
														<Accordion>
															<Card>
																<Card.Header>
																	<Accordion.Toggle as = {Button} variant = "link" eventKey = "0">
																		<div style = {{color: "black"}}> Completed Subs ✅ </div>
																	</Accordion.Toggle>
																</Card.Header>
																<Accordion.Collapse eventKey = "0">
																	<Card.Body> 
																	{completedSubs.map((subIndex) => {
																		return (
																			<Form.Check
																				type = "checkbox"
																				style = {{whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}
																				label = {<strike> {goal.tasks[index].subTasks[subIndex].name} </strike>}
																				checked = {true}
																				onChange = {() => uncompleteSub(index, subIndex)}
																			/>
																		);
																	})}
																	</Card.Body>
																</Accordion.Collapse>
															</Card>
														</Accordion>
													</ListGroup.Item>
													:
													null}
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
																														//setTask(props.taskModel);
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
											</Card.Body>
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
			<Row style = {{textAlign: "center"}}>
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