import React, { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import MindMap from 'react-mindmap';

function GoalBuilder() {
	
	const testNodes = [
		{
			"text": "MAIN",
			"note": "main"
		},
		{
			"text": "Test node1",
			"note": "testing node1"
		},
		{
			"text": "Test node2",
			"note": "testing node2"
		},
		{
			"text": "Test node3",
			"note": "testing node3"
		},
		{
			"text": "Test node4",
			"note": "testing node4"
		}
	]
	
	const testConnections = [
		{
			"source": "MAIN",
			"target": "Test node1"
		},
		{
			"source": "MAIN",
			"target": "Test node2"
		},
		{
			"source": "MAIN",
			"target": "Test node3"
		},
		{
			source: "MAIN",
			target: "Test node4"
		},
	]
	
	return (
		<Container fluid>
			<Row>
				<Col>
				</Col>
			</Row>
		</Container>
	);
}

export default GoalBuilder;