import React from 'react';
import axios from 'axios';
import { Form } from 'formik';
import * as Yup from "yup";

// We want to create a form to onboard a new user to our system. 
// We need _at least_ the following pieces of information about our new user:

// - Name
// - Email
// - Password
// - Terms of Service (checkbox)
// - A Submit button to send our form data to the server.

