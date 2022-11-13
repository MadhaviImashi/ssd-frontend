import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import './msg.css';
import { Card } from "@mui/material";

const MsgCard = (props) => {
  return (
    <>
      <Container className="cart-item-card-wrap">
        <Card className="cart-item-card">
          <Row>
            <Col className="cart-card-right">
              <CardContent>
                <Typography variant="body2"><b>Date - </b> { props.msg.sentDate}</Typography>
                <Typography variant="body2"><b>Time - </b>{ props.msg.sentTime}</Typography>
                <Typography variant="body2"><b>Message - </b>{ props.msg.message}</Typography>
              </CardContent>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default MsgCard;
