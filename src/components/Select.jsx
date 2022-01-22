import React from "react";
import { Field, ErrorMessage } from "formik";

function Select({ name, options, ...rest }) {
  return (
    <div className="form-control">
      <Field as="select" name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage
        name={name}
        render={(errorMsg) => <div className="error">{errorMsg}</div>}
      />
    </div>
  );
}

export default Select;
