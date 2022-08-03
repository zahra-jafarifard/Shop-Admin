import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col } from "reactstrap";
import Blog from "./Blog";
import styles from './product.module.css';
import { fetchDataFunction } from '../../shared/FetchData';
import Loader from '../../layouts/loader/Loader';

const Cards = () => {

    const [productState, setProductState] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const data = await fetchDataFunction('products')
            setProductState(data)
            setLoading(false)
        }
        fetchData();
    }, [])


    const addNewProductHandler = () => {
        navigate('/new-product');
    }

    return (
        <Fragment>
        <hea>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </hea>
        <div>
            <h5 className="mb-3">All Products</h5>

            <div onClick={addNewProductHandler} >
                <h5 className={styles.addNewProduct}>
                    <i title='Add New Product' className="bi bi-bag-plus-fill"></i>
                </h5>
            </div>
            {loading && <Loader />}
            {!loading && productState &&
                <Row className={styles.content}>
                    {productState.map((blg, index) => (
                        <Col xs='4' key={index} >
                            <div className={styles.blog}>

                                <Blog
                                    image={blg.image}
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
                </Row>}
        </div>
        </Fragment>
    );
};

export default Cards;
