import React from "react";
import { Field, ErrorMessage } from "formik";
import "../../styles/advertisementForm.css";

function Input({ name, ...rest }) {
  return (
    <div className="form-control">
      <Field name={name} autoComplete="off" {...rest} />
      <ErrorMessage
        name={name}
        render={(errorMsg) => <div className="error">{errorMsg}</div>}
      />
    </div>
  );
}

export default Input;
