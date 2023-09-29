import React from 'react';
import ReactDOM from 'react-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import '../css/FormBuilder.css';


const FormBuilder = () => {
    return (
        <div className="form-builder">
            <ReactFormBuilder />
        </div>
    );
}

export default FormBuilder;