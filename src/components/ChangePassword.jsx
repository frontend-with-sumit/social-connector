import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import FormikControl from "./Form/FormikControl";
import { changePassword } from "../data";

// Images
import loginBg from "../assets/login/login hero.svg";

const validate = (values) => {
  const errors = {};

  if (!values.broadcasterId)
    errors.broadcasterId = "Please provide Business Manager ID";
  if (!values.password) errors.password = "Please provide password";
  if (!values.confirmPassword)
    errors.confirmPassword = "Please confirm password";

  return errors;
};

function ChangePassword() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="left">
        <Formik
          initialValues={{
            broadcasterId: "",
            password: "",
            confirmPassword: "",
          }}
          validate={validate}
          onSubmit={(values) => {
            if (values.password !== values.confirmPassword) {
              return alert("Passwords didn't match. Please try again.");
            }

            const changeStatus = changePassword(values);
            if (changeStatus) {
              alert("Password changed successfully");
              navigate("/");
            } else {
              alert("Please check your ID");
            }
          }}
        >
          {() => {
            return (
              <Form className="form-container login-form">
                <h2
                  className="form-heading"
                  style={{
                    fontSize: "3.1rem",
                  }}
                >
                  Recover Password
                </h2>
                <FormikControl
                  control="input"
                  name="broadcasterId"
                  className="input"
                  type="text"
                  placeholder="Business Manager ID"
                />
                <FormikControl
                  control="input"
                  name="password"
                  className="input"
                  type="password"
                  placeholder="Password"
                />
                <FormikControl
                  control="input"
                  name="confirmPassword"
                  className="input"
                  type="password"
                  placeholder="Confirm Password"
                />
                <button type="submit" className="btn-secondary">
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="right">
        <img src={loginBg} alt="" />
      </div>
    </div>
  );
}

export default ChangePassword;
