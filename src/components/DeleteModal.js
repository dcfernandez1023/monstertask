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
	
	useEffect(() => {
		setModalTitle(modalTitle);
		setBodyPrompt(props.bodyPrompt);
		setShow(props.show);
	}, [props.modalTitle, props.bodyPrompt, props.show]);
	
	function handleClose() {
		props.setShow(!props.show);
	}
	
	return (
		<Modal
			show = {show}
			onHide = {handleClose}
			backdrop = "static"
			keyboard = {false}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					{modalTitle === undefined || modalTitle === null ?
						null
					:
						{modalTitle}
					}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			{bodyPrompt === undefined || bodyPrompt === null ?
				null
			:
				<h5> {bodyPrompt} </h5>
			}
			</Modal.Body>
			<Modal.Footer>
				<Button variant = "primary" onClick = {props.onClickYes}> Yes </Button>
				<Button variant = "secondary" onClick = {props.onClickNo}> No </Button>
			</Modal.Footer>
		</Modal>
	);
}

export default DeleteModal;