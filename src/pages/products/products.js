import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col } from "reactstrap";
import Blog from "./Blog";
import styles from './product.module.css'


const Cards = () => {
    const navigate = useNavigate()
    const [productState, setProductState] = useState([]);
    useEffect(() => {
        return fetch('http://localhost:5000/products')
            .then(res => {
                return res.json()
            })
            .then(_products => {
                setProductState(_products.products)
                // console.log(_products.products)
            })
            .catch(err => {
                console.log(err)
            });

    }, [])

    const addNewProductHandler = () => {
        navigate('/new-product');
    }
    return (
        <div>
            <h5 className="mb-3">All Products</h5>

            <div onClick={addNewProductHandler} >
                <h5 className={styles.addNewProduct}>
                    <i title='Add New Product' className="bi bi-bag-plus-fill"></i>
                </h5>
            </div>

            <Row className={styles.content}>
                {productState.map((blg, index) => (
                    <Col sm="6" lg="6" xl="3" key={index} >
                        <div className={styles.blog}>

                            <Blog
                                image={blg.images[0]}
                                title={blg.name}
                                subtitle={blg.price}
                                text={blg.description}
                                color={blg.btnbg}
                                id={blg._id.toString()}
                                setProductState={setProductState}

                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Cards;
