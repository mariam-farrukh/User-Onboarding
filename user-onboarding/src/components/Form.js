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
    const [users, setUsers] = useState([]);
    console.log(users);

    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status]);

    return (
        <div className='container'>
            <div className='user-form'>
                <h1>New User Form</h1>
                <Form>
                    <Field type="text" name="firstname" placeholder="First Name"/>
                        {touched.firstname && errors.firstname && (
                            <p className="error">{errors.firstname}</p>
                        )}

                    <Field type="text" name="lastname" placeholder="Last Name"/>
                        {touched.lastname && errors.lastname && (
                            <p className="error">{errors.lastname}</p>
                        )}

                    <Field type="email" name="email" placeholder="Email"/>
                        {touched.email && errors.email && 
                            (<p className="error">{errors.email}</p>)}

                    <Field type="password" name="password" placeholder="Password"/>
                        {touched.password && errors.password && 
                            (<p className="error">{errors.password}</p>)}

                    <label className="checkbox-container">
                        Terms of Service
                        <Field 
                            type="checkbox"
                            name="termsofservice"
                            checked={values.termsofservice}
                        />
                        {touched.termsofservice && errors.termsofservice && 
                            (<p className="error">{errors.termsofservice}</p>)}
                        <span className="checkmark" />
                    </label>
                    <button type="submit">Submit</button>
                </Form>
            </div>
            <div className='user-list'>
                <h2>Users:</h2>
                    {users.map(user => (
                        <li key={user.id}>{user.firstname} {user.lastname}</li>
                    ))}
            </div>
        </div>
    );
};

const FormikNewUserForm = withFormik({
    mapPropsToValues({ firstname, lastname, email, password, termsofservice }) {
        return {
            firstname: firstname || '',
            lastname: lastname || '',
            email: email || '',
            password: password || '',
            termsofservice: termsofservice || false
        };
    },

    validationSchema: Yup.object().shape({
        firstname: Yup.string().required('Enter your first name'),
        lastname: Yup.string().required('Enter your last name'),
        email: Yup.string().required('Please enter an email'),
        password: Yup.string().min(5, "Password must be 5 characters or longer").required("Password is required"),
        termsofservice: Yup.string().required('Please agree to Terms'),
    }),

    handleSubmit(values, { setStatus, setErrors, resetForm }) {
        if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" });
        } else {
        axios
          .post('https://reqres.in/api/users/', values)
          .then(res => {
            setStatus(res.data);
            resetForm();
          })
          .catch(err => console.log(err.response));
        }
    }
})(NewUserForm);

export default FormikNewUserForm;