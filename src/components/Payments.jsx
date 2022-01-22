import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "./Form/FormikControl";
import "../styles/payments.css";

// Images
import paymentsHero from "../assets/payments/payments hero.svg";
import bank from "../assets/payments/bank.svg";
import card from "../assets/payments/card.svg";

const validate = (values) => {
  const errors = {};

  if (!values.upi) errors.upi = "Please provide a valid UPI ID";

  return errors;
};

function Payments() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="left">
        <Formik
          initialValues={{
            upi: "",
          }}
          validate={validate}
          onSubmit={(values, onSubmitProps) => {
            const staticUpi = "static@bankupi";
            const couponCode = "STATIC80";

            if (values.upi === staticUpi) {
              alert(
                `Your payment is successful. Your coupon code is ${couponCode}`
              );
              navigate("/home");
            }
          }}
        >
          {() => {
            return (
              <Form className="form-container login-form">
                <h2 className="form-heading">Payments</h2>
                <div className="inner-container">
                  <div className="top">
                    <div className="card">
                      <div className="card-image">
                        <img src={bank} alt="Bank" />
                      </div>
                      <div className="card-text">
                        <p>Bank</p>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-image">
                        <img src={card} alt="Card" />
                      </div>
                      <div className="card-text">
                        <p>Card</p>
                      </div>
                    </div>
                  </div>
                  <div className="separator">
                    <p>or</p>
                  </div>
                  <FormikControl
                    control="input"
                    name="upi"
                    className="input payment-input"
                    type="text"
                    placeholder="UPI ID"
                  />
                  <button type="submit" className="payment-btn btn-secondary">
                    Submit
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="payment-bg right">
        <img src={paymentsHero} alt="" />
      </div>
    </div>
  );
}

export default Payments;
