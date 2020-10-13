import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function GoalModal(props) {
	
	const[fields, setFields] = useState([]);
	const[show, setShow] = useState(false);
	
	useEffect(() => {
		setFields(props.fields);
		setShow(true);
	}, []);
	
	function handleClose() {
		setShow(false);
	}
	
	function onChangeInput(e) {
		const name = [e.target.name][0];
		const value = e.target.value;
		var fieldsCopy = fields;
		//var fieldsCopy = JSON.parse(JSON.stringify(fields));
		fieldsCopy[name] = value;
		setFields(fieldsCopy);
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
			{fields !== null && fields !== undefined ?
				fields.map((field, index) => {
					return (
						<Form.Label> {field.displayName} </Form.Label>
						<Form.Control
							as = "input"
							name = {field.value}
							value = {fields[index][field.value]}
							onChange = {(e) => onChangeInput(e)}
						/>
					);
				});
			:
				<div> </div>
			}
			</Modal.Body>
		</Modal>
	);
}