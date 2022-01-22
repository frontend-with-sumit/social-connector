import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "./Form/FormikControl";
import { getUserData } from "../data";
import "../styles/login.css";

// Images
import loginBg from "../assets/login/login hero.svg";

const validate = (values) => {
  const errors = {};

  if (!values.broadcasterId)
    errors.broadcasterId = "Please provide Business Manager ID";
  if (!values.password) errors.password = "Please provide password";

  return errors;
};

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const newUser = getUserData();
    setUser(newUser);
  }, []);

  return (
    <div className="login-container">
      <div className="left">
        <Formik
          initialValues={{
            broadcasterId: "",
            password: "",
          }}
          validate={validate}
          onSubmit={(values, onSubmitProps) => {
            const usersCopy = [...user];
            const userDetails = usersCopy.filter(
              (user) => user.broadcasterID === values.broadcasterId
            );

            if (userDetails[0].password !== values.password) {
              onSubmitProps.resetForm();
              return alert("Incorrect Business Manager ID/Password");
            }

            navigate("/home");
          }}
        >
          {() => {
            return (
              <Form className="form-container login-form">
                <h2 className="form-heading">Login</h2>
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
                <div className="recover">
                  <Link to="recover_password">Recover Password</Link>
                </div>
                <button type="submit" className="btn-secondary">
                  Submit
                </button>
                <div className="register">
                  <p>
                    Need an account? <Link to="register">Register</Link>
                  </p>
                </div>
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

export default Login;
