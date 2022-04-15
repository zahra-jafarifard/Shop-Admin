import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";

const Blog = (props) => {

  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/edit-product/?productId=${id}`);
  }

  const deleteHandler = (id) => {
    if (window.confirm("ARE YOU SURE?") === true) {

      props.setProductState(prevUser => prevUser.filter(product => product._id.toString() !== id))
      fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => {
          if (!res.ok) {
            return new Error(res.message)
          }
          return res.json()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      return;
    }

  }

  return (
    <Card>
      <CardImg alt="Card image cap" src={props.image} />
      <CardBody className="p-4">
        <CardTitle tag="h5">{props.title}</CardTitle>
        <CardSubtitle>{props.subtitle}</CardSubtitle>
        <CardText className="mt-3">{props.text}</CardText>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button color={props.color} onClick={() => editHandler(props.id)}> Edit </Button>
          <Button color={props.color} onClick={() => deleteHandler(props.id)} > Delete </Button>
        </div>

      </CardBody>
    </Card>
  );
};

export default Blog;
