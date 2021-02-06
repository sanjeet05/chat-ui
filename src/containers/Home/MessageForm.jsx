import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  message: Yup.string().trim().required("required"),
});

const MessageForm = (props) => (
  <Formik
    initialValues={{ message: "" }}
    validationSchema={schema}
    onSubmit={(values, { resetForm }) => {
      props.handleSubmit(values);
      resetForm();
    }}
  >
    {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => {
      return (
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row">
            <div className="col-11">
              <div className="form-group">
                <input
                  className={
                    errors.message && touched.message ? "form-control is-invalid" : "form-control"
                  }
                  placeholder="Type message"
                  name="message"
                  type="text"
                  value={values.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.message && touched.message ? (
                  <span className="invalid-feedback">{errors.message}</span>
                ) : null}
              </div>
            </div>
            <div className="col-1">
              <div className="">
                <button type="submit" className="btn">
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      );
    }}
  </Formik>
);

export default MessageForm;
