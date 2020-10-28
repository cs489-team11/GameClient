import React from "react";
import Card from "react-bootstrap/Card";

const GeneralCard = ({ title, label, content, h, p }) => {
  let height = "25vh";
  let paddingTop;
  if (h) {
    height = h;
  }

  if (p) {
    paddingTop = p;
  }

  console.log(height);
  return (
    // <Card bg='success' text='white' style={{ width: '100%', height: '15vh', paddingTop: '30px' }}>
    //     <Card.Body>
    //         <Card.Title style={{ }}>{title}</Card.Title>
    //         <Card.Subtitle className="mb-2 text-muted">{label}</Card.Subtitle>
    //         <div>{content}</div>
    //     </Card.Body>
    // </Card>
    <Card
      bg={"light"}
      text={"dark"}
      style={{ height, borderRadius: "8px" }}
      className="mb-2"
    >
      <Card.Header></Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ paddingTop: paddingTop }}>{label}</Card.Text>
        <div>{content}</div>
      </Card.Body>
    </Card>
  );
};

export default GeneralCard;
