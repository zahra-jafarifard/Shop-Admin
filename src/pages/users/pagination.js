
import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';
import user1 from "../../assets/images/users/user1.jpg";
import { Delete } from '../../shared/deleteHandler';

const PaginationUser = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(2);
    
    const { deleteFunction } = Delete()

  

    const columns = [
        {
            name: 'Admins',
            cell: (row, index, column, id) => {
                return (
                    <div className="d-flex align-items-center p-2">
                        <img
                            src={user1}
                            className="rounded-circle"
                            alt="avatar"
                            width="45"
                            height="45"
                        />
                        <div className="ms-3">
                            <h6 className="mb-0">{row.name}</h6>
                            <span className="text-muted">{row.family}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            name: 'E-mail',
            selector: row => row.email,
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
        },
        {
            name: 'Roll',
            selector: row => row.rollId.name,
        },
        {
            name: 'Actions',
            cell: (row, index, column, id) => {
                return (
                    <div  >
                        <span style={{ padding: "13px" }} onClick={()=>props.editHandler(row.id)}>
                            <i title='Edit' className="bi bi-pencil-square"></i>
                        </span>
                        <span style={{ padding: "13px" }} onClick={() => props.showModalHandler(row.id , setData)}>
                            <i title='Delete' className="bi bi-x-square" ></i>
                        </span>
                    </div>)

            }
        },
    ];
    const fetchUsers = async page => {
        setLoading(true);

        const response = await fetch(`http://localhost:5000/users/?page=${page}&per_page=${perPage}&delay=1`);
        const responseData = await response.json();

        setData(responseData.users);
        setTotalRows(responseData.total);
        setLoading(false);
    };

    const handlePageChange = page => {
        fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);

        const response = await fetch(`http://localhost:5000/users/?page=${page}&per_page=${newPerPage}&delay=1`);

        setData(response.users);
        setPerPage(newPerPage);
        setLoading(false);
    };

    const deleteHandler = (id) => {
        props.setShoWModal(false);
        deleteFunction(id, 'users' ,setData);
    }

    useEffect(() => {
        fetchUsers(); // fetch page 1 of users
        props.deleteRef.current = deleteHandler
    }, []);

    return (
        <React.Fragment>
            <DataTable
                // title="Overview of the Users"
                columns={columns}
                data={data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </React.Fragment> 
    );

}

export default PaginationUser ;