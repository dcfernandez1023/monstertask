import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function TaskModal(props) {
	
	const[taskFields, setFields] = useState([]);
	const[show, setShow] = useState(false);
	const[newTask, setNewTask] = useState({});
	
	useEffect(() => {
		setFields(props.taskFields.editableFields);
		setShow(props.show);
		setNewTask(props.taskModel);
	}, [props.show, props.taskFields, props.taskModel]);
	
	function handleClose() {
		props.setShow(!props.show);
		setNewTask({});
	}
	
	function onChangeInput(e) {
		const name = [e.target.name][0];
		const value = e.target.value;
		var taskCopy = JSON.parse(JSON.stringify(newTask));
		console.log(taskCopy);
		taskCopy[name] = value;
		setNewTask(taskCopy);
	}
	
	return (
		<Modal
			show = {show}
			onHide = {handleClose}
			backdrop = "static"
			keyboard = {false}
		>
			<Modal.Header closeButton>
				<Modal.Title> Create New Task </Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{newTask !== null && newTask !== undefined && taskFields !== null && taskFields !== undefined ?
				taskFields.map((field, index) => {
					return (
						<Row>
							<Col>
								<Form.Label> {field.displayName} </Form.Label>
								<Form.Control
									as = "input"
									name = {field.value}
									value = {newTask[field.value]}
									onChange = {(e) => onChangeInput(e)}
								/>
							</Col>
						</Row>
					);
				})
			:
				<div> </div>
			}
			</Modal.Body>
			<Modal.Footer>
				<Button variant = "primary" onClick = {() => props.createTask(newTask)}>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TaskModal;