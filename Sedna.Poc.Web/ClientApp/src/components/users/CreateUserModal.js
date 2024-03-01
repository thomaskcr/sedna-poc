import React from 'react';
import {CreateUserFields} from "./CreateUserFields";
import {useForm} from "react-hook-form";
import {UserApi} from "../../api/UserApi";

export const CreateUserModal = ({ modalOpen, closeModal, toast}) => {

    /*  purpose: set default form values
        input: none
        return: none
     */
    const defaultValues = {
        "email": '',
        "first_name": '',
        "last_name": ''
    }
    
    
    /*  purpose: initialize form control
        input: none
        return: none
     */
    const { control, 
            formState: {errors}, 
            handleSubmit, 
            reset: resetForm} = useForm({defaultValues});


    /*  purpose: create a user
        input: none
        return: none
     */
    const createUser = (user) => {
        UserApi.create(user)
            .then(res => {
                toast.current.show(true, "User created")
            })
            .catch(err => {
                resetForm()
                toast.current.show(false, "User not created")
            })
        closeModal()
    }


    /*  purpose: render create user modal
        input: none
        return: a component
     */
    return (
        <>
            <div className={`modal-backdrop fade ${modalOpen ? 'show' : ''}`} style={{ display: modalOpen ? 'block' : 'none' }}></div>
            <div className={`modal ${modalOpen ? 'show pl-3 pr-3' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document" style={{ maxWidth: '1000px', important: 'true' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title font-weight-bold">Create New User</h2>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="user-form" onSubmit={handleSubmit(createUser)}>
                                <CreateUserFields errors={errors} control={control} />
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Cancel
                            </button>
                            <button type="submit" form="user-form" className="btn btn-sedna">Create User
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

