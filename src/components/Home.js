import React, { useState, useEffect } from 'react';
import Menu from './Menu.js';

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

function Home(props) {
	
	const[sideBarOpen, setSideBar] = useState(false);
	const[currentDisplayName, setCurrentDisplayName] = useState("Goals");
	const[currentTab, setCurrentTab] = useState("goals");
	
	function toggleSideBar() {
		setSideBar(!sideBarOpen);
	}
	
	function setHomeCategory(displayName, value) {
		setCurrentDisplayName(displayName);
		setCurrentTab(value);
	}
	
	return (
		<Container fluid>
			<Sidebar
				sidebar = {<Menu toggleSideBar = {toggleSideBar} setHomeCategory = {setHomeCategory}/>}
				open = {sideBarOpen}
				onSetOpen = {toggleSideBar}
				transitions = {true}
				shadow = {true}
				sidebarClassName = "menu-sidebar"
				styles = {{sidebar: {background: "white" } }}
			>
			</Sidebar>
			<Row>
				<Col>
					<Navbar fluid collapseOnSelect expand = "md" style = {{backgroundColor: "#BDB76B"}}>
						{/* TODO: center Navbar.Brand */}
						<Navbar.Brand> 
							<Row>
								<Col>
									<Button 
										variant = "light" 
										onClick = {() => {setSideBar(true)}}
										//style = {{backgroundColor: "#BDB76B"}}
										> 
										{/*<Image src = "menu_mini.png" fluid/>*/}
										Menu
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
								<Button variant = "light" onClick = {props.signout}>
									Logout
								</Button>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Col>
			</Row>
			<Row>
				<Col>
					<Container fluid>
						<Row style = {{marginTop: "2%"}}>
							<Col></Col>
							<Col style = {{textAlign: "center"}}>
								<h3 style = {{color: "white"}}> {currentDisplayName !== undefined ? currentDisplayName: null} </h3>
							</Col>
							<Col style = {{textAlign: "right"}}>
								<Button variant = "light" onClick = {() => {window.location.pathname = "/goalBuilder"}}> + </Button>
							</Col>
						</Row>
					</Container>
				</Col>
			</Row>
		</Container>
	);
}

export default Home;