import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const InputAndButton = (props) => {
    return (
    <Form>
        <Form.Row>
          <Col>
            <Form.Control placeholder="Enter amount..." />
          </Col>
        </Form.Row>
        <Form.Row><Button style={{width: '100%', margin: "10px 5px 5px 5px"}} variant="success">{props.buttonText}</Button></Form.Row>
    </Form>
    )
}

export default InputAndButton

