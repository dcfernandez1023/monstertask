import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Sidebar from "react-sidebar";

function MtNavbar(props) {
	/*TODO: make this component more customizable through the use of props */
	function leftButtonClick() {
		if(props.leftButtonClick === undefined) {
			return;
		}
		props.leftButtonClick();
	}
	
	function rightButtonClick() {
		if(props.rightButtonClick === undefined) {
			return;
		}
		props.rightButtonClick();
	}
	
	return (
			<Navbar fluid collapseOnSelect expand = "md" style = {{backgroundColor: "#BDB76B"}}>
				{/* TODO: center Navbar.Brand */}
				<Navbar.Brand> 
					<Row>
						<Col>
							<Button 
								variant = "light" 
								onClick = {leftButtonClick}
								> 
									{props.leftButtonValue}
							</Button>
						</Col>
					</Row>
				{/*<Image style = {{marginTop: "5%"}} src = "monstertask_med.png" fluid/>*/}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls = "responsive-navbar-nav"/>
				<Navbar.Collapse id = "responsive-navbar-nav">
					<Nav className = "mr-auto">
					</Nav>
					<Nav className = "justify-content-end">
						<Button variant = "light" onClick = {rightButtonClick}>
							{props.rightButtonValue}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
	);
}

export default MtNavbar;