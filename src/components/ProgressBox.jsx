import React from "react";

const ProgressBox = ({ completed }) => {
  return (
    <div>
      <div>
        <span>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBox;
