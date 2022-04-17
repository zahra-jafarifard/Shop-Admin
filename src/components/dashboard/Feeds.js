import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import { fetchDataFunction } from '../../shared/FetchData'

// const FeedData = [
//   {
//     title: "Cras justo odio",
//     icon: "bi bi-bell",
//     color: "primary",
//     date: "6 minute ago",
//   },
//   {
//     title: "New user registered.",
//     icon: "bi bi-person",
//     color: "info",
//     date: "6 minute ago",
//   },
//   {
//     title: "Server #1 overloaded.",
//     icon: "bi bi-hdd",
//     color: "danger",
//     date: "6 minute ago",
//   },
//   {
//     title: "New order received.",
//     icon: "bi bi-bag-check",
//     color: "success",
//     date: "6 minute ago",
//   },
//   {
//     title: "Cras justo odio",
//     icon: "bi bi-bell",
//     color: "dark",
//     date: "6 minute ago",
//   },
//   {
//     title: "Server #1 overloaded.",
//     icon: "bi bi-hdd",
//     color: "warning",
//     date: "6 minute ago",
//   },
// ];

const Feeds = () => {
  const [productState, setProductState] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataFunction('products');
      setProductState(data);
    }
    fetchData();
  }, [setProductState])
  const topDocuments = productState.slice(0, 6)
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Feeds</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Widget you can use
        </CardSubtitle>
          <ListGroup flush className="mt-4">
          {topDocuments.map((feed, index) => (
              <ListGroupItem
                key={index}
                action
                href="/"
                tag="a"
                className="d-flex align-items-center p-3 border-0"
              >
                <Button
                  className="rounded-circle me-3"
                  size="sm"
                  color="danger"
                >
                  <i className="bi bi-bag-check"></i>
                  </Button>
                
                {feed.name}
                <small className="ms-auto text-muted text-small">
                  {feed.price}
                </small>
                <small className="ms-auto text-muted text-small">
                   {feed.createdByUserId.name} {feed.createdByUserId.family}
                </small>
              </ListGroupItem>
            ))}
          </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
