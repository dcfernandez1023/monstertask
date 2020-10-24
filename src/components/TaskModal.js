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
	const[task, setTask] = useState({});
	const[taskIndex, setTaskIndex] = useState();
	
	useEffect(() => {
		setFields(props.taskFields.editableFields);
		setShow(props.show);
		setTask(props.task);
		setTaskIndex(props.taskIndex);
	}, [props.show, props.taskFields, props.task, props.taskIndex]);
	
	function handleClose() {
		props.setShow(!props.show);
		setTask({});
		props.setTask(props.taskModel);
	}
	
	function onChangeInput(e) {
		const name = [e.target.name][0];
		const value = e.target.value;
		var taskCopy = JSON.parse(JSON.stringify(task));
		console.log(taskCopy);
		taskCopy[name] = value;
		setTask(taskCopy);
	}
	
	return (
		<Modal
			show = {show}
			onHide = {handleClose}
			backdrop = "static"
			keyboard = {false}
		>
			<Modal.Header closeButton>
				<Modal.Title> {props.modalTitle} </Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{task !== null && task !== undefined && taskFields !== null && taskFields !== undefined ?
				taskFields.map((field, index) => {
					return (
						<Row>
							<Col>
								<Form.Label> {field.displayName} </Form.Label>
								<Form.Control
									as = "input"
									name = {field.value}
									value = {task[field.value]}
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
				<Button variant = "primary" onClick = {() => {
														props.writeTask(task, props.writeMode, taskIndex);
														handleClose();
													  }}
				>
					{props.buttonValue}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default TaskModal;