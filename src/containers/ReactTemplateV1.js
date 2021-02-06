import React, { Fragment, useState } from "react";

const RecatTemplete = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <div className="container">
        <div className="row pt-4 justify-content-center">WIP - RecatTemplete {loading}</div>
      </div>
    </Fragment>
  );
};

export default RecatTemplete;
