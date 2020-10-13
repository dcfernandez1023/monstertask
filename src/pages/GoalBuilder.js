import React, { useState, useEffect } from 'react';
import MtNavbar from '../components/MtNavbar.js';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

function GoalBuilder(props) {
	
	return (
		<Container fluid>
			<Row>
				<Col>
					<MtNavbar
						signout = {props.signout}
					/>
				</Col>
			</Row>
			<Row>
				<Col>

				</Col>
			</Row>
		</Container>
	);
}

export default GoalBuilder;