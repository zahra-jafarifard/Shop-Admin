import React, { useState, useEffect } from 'react';

import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import styles from '../pages/products/product.module.css'
import Blog from "../pages/products/Blog";
import { fetchDataFunction } from '../shared/FetchData';
import Users from '../pages/users/users'

const Starter = () => {
  const [productState, setProductState] = useState([]);


    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchDataFunction('products');
        setProductState(data);
      }
      fetchData();
    }, [])




  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          {/* <SalesChart /> */}
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          {/* <Feeds /> */}
        </Col>
      </Row>
      {/***Table ***/}
      <Row>
        <Col lg="12">
          <Users />
        </Col>
      </Row>
      {/***Blog Cards***/}
      <Row className={styles.content}>
        {productState.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index} >
            <div className={styles.blog}>

              <Blog
                image={blg.image}
                title={blg.name}
                subtitle={blg.price}
                text={blg.description}
                color={blg.btnbg}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
