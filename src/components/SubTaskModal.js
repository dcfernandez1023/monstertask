import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function SubTaskModal(props) {
	
	const[fields, setFields] = useState([]);
	const[show, setShow] = useState(false);
	const[sub, setSub] = useState(null);
	
	useEffect(() => {
		setFields(props.fields.editableFields);
		setShow(props.show);
		setSub(props.sub);
	}, [props.show, props.sub, props.fields]);
	
	function handleClose() {
		props.setShow(!props.show);
		setSub(null);
	}
	
	function onChangeInput(e) {
		const name = [e.target.name][0];
		const value = e.target.value;
		var copy = JSON.parse(JSON.stringify(sub));
		copy[name] = value;
		setSub(copy);
	}
	
	return (
		<Modal
			show = {show}
			onHide = {handleClose}
			backdrop = "static"
			keyboard = {false}
		>
			<Modal.Header closeButton>
				<Modal.Title> Edit Sub-task </Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{sub !== undefined && sub !== null && fields !== null && fields !== undefined ?
				fields.map((field) => {
					console.log(sub[field.value]);
					return (
						<Row>
							<Col>
								<Form.Label> {field.displayName} </Form.Label>
								<Form.Control 
									as = "input" 
									name = {field.value}
									value = {sub[field.value]}
									onChange = {(e) => onChangeInput(e)}
								/>
							</Col>
						</Row>
					);
				})
			:
				<div></div>
			}
			</Modal.Body>
			<Modal.Footer>
				<Button variant = "primary"> 
					Done 
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default SubTaskModal;