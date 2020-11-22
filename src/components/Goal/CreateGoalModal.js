import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function NewGoalModal(props) {

	const[fields, setFields] = useState([]);
	const[show, setShow] = useState(false);
	const[newGoal, setNewGoal] = useState({});

	useEffect(() => {
		setFields(props.fields.editableFields);
		setShow(props.show);
		setNewGoal(props.goalModel);
	}, [props.show, props.fields, props.goalModel]);

	function handleClose() {
		props.setShow(!props.show);
		setNewGoal({});
	}

	function onChangeInput(e) {
		const name = [e.target.name][0];
		const value = e.target.value;
		var goalCopy = JSON.parse(JSON.stringify(newGoal));
		goalCopy[name] = value;
		setNewGoal(goalCopy);
	}

	return (
		<Modal
			show = {show}
			onHide = {handleClose}
			backdrop = "static"
			keyboard = {false}
		>
			<Modal.Header closeButton>
				<Modal.Title> Create New Goal </Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{newGoal !== null && newGoal !== undefined && fields !== null && fields !== undefined ?
				fields.map((field, index) => {
					return (
						<Row>
							<Col>
								<Form.Label> {field.displayName} </Form.Label>
								<Form.Control
									as = "input"
									name = {field.value}
									value = {newGoal[field.value]}
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
				<Button variant = "primary" onClick = {() => props.createGoal(newGoal)}>
					Create
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default NewGoalModal;
