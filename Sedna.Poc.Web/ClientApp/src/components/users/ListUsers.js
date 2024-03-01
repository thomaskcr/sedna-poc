import React, {useEffect, useRef, useState} from 'react'
import {UserApi} from "../../api/UserApi";
import {Table} from "./Table";
import {Button} from "reactstrap";
import {CreateUserModal} from "./CreateUserModal";
import {Toast} from "../Toast";

export const ListUsers = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const toast = useRef();
    const title = loading ? "Loading..." : "Users"


    /*  purpose: make api call to get all users
        input: none
        return: none
     */
    useEffect(() => {
        UserApi.list().then(res => {
            setUsers(res.data)
            setLoading(false)
        })
    }, [users])
    

    /*  purpose: initialize key, header pairs for user table
        input: none
        return: none
     */
    const columns = [
        { key: "id", header: "#" },
        { key: "email", header: "Email" },
        { key: "first_name", header: "First Name" },
        { key: "last_name", header: "Last Name" }
    ]
    

    /*  purpose: close a modal
        input: none
        return: none
     */
    const closeModal = () => setModalOpen(false)

    
    /*  purpose: render users page
        input: none
        return: a component
     */
    return (
        <>
            <Toast ref={toast}/>
            <div className="container mt-5">
                <h1 className="ml-3 float-left font-weight-bold">{title}</h1>
                <Button disabled={loading} className="btn btn-sedna float-right" onClick={() => setModalOpen(true)}>Create User</Button>
                {
                    loading 
                        ? <></>
                        : <Table columns={columns} data={users}/>
                }
                <CreateUserModal modalOpen={modalOpen} closeModal={closeModal} toast={toast}/>
            </div>
        </>
    )
}