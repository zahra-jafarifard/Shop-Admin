import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../shared/modal';
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

  const [showModal, setShoWModal] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { deleteFunction } = Delete()


  const editHandler = (id) => {
    navigate(`/edit-product/?productId=${id}`);
  }

  const deleteHandler = async (id) => {
    setShoWModal(false);
    deleteFunction(id, 'products', props.setProductState)

  }

  const showModalHandler = () => { setShoWModal(true); }
  const cancelHandler = () => { setShoWModal(false); }
  const footer = (
    <div>
      <Button color="primary" onClick={() => deleteHandler(document.getElementById(`hiddenId_${props.id}`).value)}>Yes</Button>
      <Button color="secondary" onClick={cancelHandler}> No</Button>
    </div>
  )
  return (
    <React.Fragment>
      {showModal && <Modal
        refToggle={modalRef}
        toggle
        header='DELETE'
        body='Do you want to delete?'
        footer={footer}
      />}
      <Card>
        <CardImg alt="Card image cap" name='image' src={`http://localhost:5000/${props.image}`} />
        <CardBody className="p-4">
          <CardTitle tag="h5">{props.title}</CardTitle>
          <CardSubtitle>{props.subtitle}</CardSubtitle>
          <CardText className="mt-3">{props.text}</CardText>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <input type='hidden' id={`hiddenId_${props.id}`}  value={props.id} />
            <Button color={props.color} onClick={() => editHandler(props.id)}> Edit </Button>
            <Button color={props.color} onClick={() => showModalHandler(props.id)} > Delete </Button>
          </div>

        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Blog;
