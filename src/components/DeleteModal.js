import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function DeleteModal(props) {
	
	const[modalTitle, setModalTitle] = useState();
	const[bodyPrompt, setBodyPrompt] = useState();
	const[show, setShow] = useState(false);
	const[subLocation, setSubLocation] = useState();
	
	useEffect(() => {
		setModalTitle(modalTitle);
		setBodyPrompt(props.bodyPrompt);
		setShow(props.show);
		setSubLocation(props.subLocation);
	}, [props.modalTitle, props.bodyPrompt, props.show, props.subLocation]);
	
	function handleClose() {
		props.setShow(!props.show);
		props.setSubLocation({taskIndex: -1, subIndex: -1});
	}
	
	return (
		<Modal
			show = {show}
			onHide = {handleClose}
			backdrop = "static"
			keyboard = {false}
			size = "md"
		>
			<Modal.Header closeButton>
				<Modal.Title>	
				{modalTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{bodyPrompt === undefined || bodyPrompt === null ?
				null
			:
				<div> {bodyPrompt} </div>
			}
			</Modal.Body>
			<Modal.Footer>
				<Button variant = "primary" onClick = {() => {props.onClickYes(subLocation.taskIndex, subLocation.subIndex); handleClose()}}> Yes </Button>
				<Button variant = "secondary" onClick = {() => props.onClickNo(false)}> No </Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;