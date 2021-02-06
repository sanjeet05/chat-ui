import React, { Fragment } from "react";

import "./Spinner.css";

const Spinner = (props) => {
  const size = props.size || "40px";
  return (
    <Fragment>
      <div className="spin_loader" style={{ height: size, width: size }}></div>
    </Fragment>
  );
};

export default Spinner;

// Ex: how to use
// <Spinner />
