import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from "yup";

// We want to create a form to onboard a new user to our system. 
// We need _at least_ the following pieces of information about our new user:

// - Name
// - Email
// - Password
// - Terms of Service (checkbox)
// - A Submit button to send our form data to the server.

const NewUserForm = ({errors, touched, values, status }) => {
    const [newUsers, setNewUsers] = useState([]);
    console.log(newUsers);

    useEffect(() => {
        if (status) {
            setNewUsers([...newUsers, status])
        }
    }, [status]);

    return (
        <div>
            <h1>New User Form</h1>
            <Form>
                <Field type="text" name="name" placeholder="name"/>

                <Field type="email" name="email" placeholder="Email"/>

                <Field type="password" name="password" placeholder="Password"/>

                <label>
                    Terms of Service
                    <Field
                        type="checkbox"
                        name="termsofservice"
                        checked={nothing}
                    />
                </label>
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
};

const FormikNewUserForm = withFormik({
    mapPropsToValues({ name, email, password, termsofservice }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            termsofservice: termsofservice || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required('Enter your name'),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),

})

export default NewUserForm;