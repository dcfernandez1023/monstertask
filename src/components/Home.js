import React, { useState, useEffect } from 'react';
import Menu from './Menu.js';
import GoalTab from './GoalTab.js';
import MtNavbar from './MtNavbar.js';

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
					<MtNavbar
						leftButtonClick = {toggleSideBar}
						rightButtonClick = {props.signout}
						leftButtonValue = "&#9776;"
						rightButtonValue = "Logout"
					/>
				</Col>
			</Row>
			<Row>
			{currentTab == "goals" ?
				<Col>
					<GoalTab 
						goalModel = {props.goalModel} 
						goalFields = {props.goalFields} 
						writeOne = {props.writeOne}
						userInfo = {props.userInfo}
						getQuerey = {props.getQuerey}
						toggleSideBar = {toggleSideBar}
					/>
				</Col>
				:
				<Col style = {{textAlign: "center"}}>
					<h4> In Progress!!! </h4>
				</Col>
			}
			</Row>
		</Container>
	);
}

export default Home;