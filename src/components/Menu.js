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
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function Menu(props) {
	
	const menuDisplay = [
		{displayName: "Goals", value: "goals"},
		{displayName: "Todo-Lists", value: "todoLists"},
		{displayName: "Friends", value: "friends"},
		{displayName: "Achievements", value: "achievements"},
		{displayName: "Character Stats", value: "characterstats"}
	]
	
	useEffect(() => {
		console.log("hi");
	});
	
	return (
		<Container fluid>
			<Row style = {{textAlign: "center"}}>
				<Col>
					<h4> Menu </h4>
				</Col>
			</Row>
			<Row>
				<Tab.Container defaultActiveKey = "goals">
					<Row>
						<Col>
							{menuDisplay.map((display) => {
								var displayTemp = display;
								return (
									<Nav variant="pills" className="flex-column">
										<Nav.Item>
											<Nav.Link 
												eventKey = {display.value}
												onSelect = {(displayTemp) => {
													props.setHomeCategory(display.displayName, display.value);
												}}
											>
												{display.displayName}
											</Nav.Link>
										</Nav.Item>
									</Nav>
								)
							})}
						</Col>
					</Row>
				</Tab.Container>
			</Row>
		</Container>
	);
}

export default Menu;