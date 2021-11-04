import React from "react";
import "../../assets/css/font.css";

const Card = (props) => {
  return (
    <div class=" rounded shadow-md h-auto text-center p-32 m-12 bg-white">
      {props.children}
    </div>
  );
};
export default Card;
