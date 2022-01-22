import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "./Form/FormikControl";
import { addUser } from "../data";
import "../styles/register.css";

// Image
import register from "../assets/register/register.svg";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobileNo: "",
  otp: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) errors.firstName = "First name is mandatory";

  if (!values.lastName) errors.lastName = "Last name is mandatory";

  if (!values.email) errors.email = "Email is mandatory";
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = "Please provide a valid email";

  if (!values.password) errors.password = "Password is mandatory";
  if (!values.confirmPassword)
    errors.confirmPassword = "Confirm password is mandatory";
  if (!values.mobileNo) errors.mobileNo = "Mobile number is mandatory";

  return errors;
};

function Register() {
  const navigate = useNavigate();

  return (
    <div className="register-container">
      <div className="left">
        <img src={register} alt="Register" />
      </div>
      <div className="right">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values) => {
            if (values.password !== values.confirmPassword)
              return alert("Passwords didn't match. Please try again");

            const userId = addUser(values);
            alert(`Registration Successful. Your ID is ${userId}`);
            navigate("/home");
          }}
        >
          {(values) => {
            return (
              <Form className="form-container register-form">
                <h2 className="form-heading">Register</h2>
                <div className="form-group">
                  <FormikControl
                    control="input"
                    name="firstName"
                    type="text"
                    className="input"
                    placeholder="First Name"
                  />
                  <FormikControl
                    control="input"
                    name="lastName"
                    type="text"
                    className="input"
                    placeholder="Last Name"
                  />
                </div>
                <FormikControl
                  control="input"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <div className="form-group">
                  <FormikControl
                    control="input"
                    name="password"
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  <FormikControl
                    control="input"
                    name="confirmPassword"
                    type="password"
                    className="input"
                    placeholder="Confirm Password"
                  />
                </div>
                <p className="form-description">
                  To complete your registration we need to send an OTP to your
                  mobile number.
                </p>
                <div className="form-group">
                  <FormikControl
                    control="input"
                    name="mobileNo"
                    type="text"
                    className="input"
                    placeholder="Mobile Number"
                    maxlength={10}
                  />
                  <FormikControl
                    control="input"
                    name="otp"
                    type="text"
                    className="input"
                    placeholder="OTP"
                    maxlength={4}
                  />
                </div>
                <button type="submit" className="btn-secondary">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
