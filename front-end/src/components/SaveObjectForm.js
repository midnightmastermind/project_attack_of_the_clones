/**
 * This code is a form for creating an object.
 * The object is passed in as a prop, as well as a callback function to call when the form is submitted.
 * The form uses redux to keep track of the current user.
 * If the user is not a mentor, they are redirected to the login page.
 * Otherwise,
 */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate  } from 'react-router-dom';
import PageAuth from "../common/PageAuth";
import '../css/CreateObjectForm.css';

const SaveObjectForm = (props) => {
    const { schema, header, callBackFunction } = props;

    const [dataObject, setDataObject] = useState(schema);
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!PageAuth.mentorAuth(currentUser)) {
        return <Navigate to="/login" />;
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDataObject({ ...dataObject, [name]: value });
    };

    const saveDataObject = () => {
        callBackFunction(dataObject);
    };

    return (
        <div className="create-object-container">
            <div className="submit-form">
                {props.header && (<div className="submit-form-header">Create {header}</div>)}
                    <div>
                        {
                            Object.keys(dataObject).map((key) => (
                                <div key={key} className="form-group">
                                    <label htmlFor={`${key}`}>{key}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`${key}`}
                                        value={dataObject[key]}
                                        onChange={handleInputChange}
                                        name={`${key}`}
                                    />
                                </div>
                            ))
                        }
                        <button onClick={saveDataObject} className="btn btn-success">
                            Submit
                        </button>
                    </div>
            </div>
        </div>
    );
};

export default SaveObjectForm;
