import React from "react";
import {Controller} from "react-hook-form";


export const CreateUserFields = ({errors, control}) => {
    
    /*  purpose: get error message for input with styles
        input: name of input component
        return: styled error element
    */
    const getFormErrorMessage = (name, state) => {
        return errors[name] ? <small className="text-danger">{errors[name].message}</small> :
            <small className="text-danger">&nbsp;</small>;
    };

    
    /*  purpose: render form fields
        input: none
        return: a component
     */
    return (
        <div className="row m-0 p-0 pb-5" style={{borderBottom: 'solid 1px #DDDDDD'}}>
            <div className="col m-0 p-0">
                <div className="row pt-2">
                    <div className="col">
                        <Controller
                            name="email"
                            control={control}
                            rules={{required: "Required."}}
                            render={({field, fieldState}) => (
                                <>
                                    <label className="font-weight-bold">Email</label>
                                    <input type="email" id={field.name} value={field.value || ''} className="form-control"
                                           onChange={(e) => field.onChange(e.target.value)}/>
                                    {getFormErrorMessage(field.name, fieldState)}
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Controller
                            name="first_name"
                            control={control}
                            rules={{required: "Required."}}
                            render={({field, fieldState}) => (
                                <>
                                    <label className="font-weight-bold">First Name</label>
                                    <input id={field.name} value={field.value || ''} className="form-control"
                                           onChange={(e) => field.onChange(e.target.value)}/>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                    </div>
                    <div className="col">
                        <Controller
                            name="last_name"
                            control={control}
                            rules={{required: "Required."}}
                            render={({field, fieldState}) => (
                                <>
                                    <label className="font-weight-bold">Last Name</label>
                                    <input id={field.name} value={field.value || ''} className="form-control"
                                           onChange={(e) => field.onChange(e.target.value)}/>
                                    {getFormErrorMessage(field.name)}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}