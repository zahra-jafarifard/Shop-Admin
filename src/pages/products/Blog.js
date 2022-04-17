import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Delete } from '../../shared/deleteHandler';
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
  const { deleteFunction } = Delete()

  
  const editHandler = (id) => {
    navigate(`/edit-product/?productId=${id}`);
  }

  const deleteHandler = (id) => {
    deleteFunction(id, 'products', props.setProductState)
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
