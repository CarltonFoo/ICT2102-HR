import React from "react";
import "../../assets/css/font.css";

const Card = (props) => {
  return (
    <div class="rounded shadow-md h-auto text-left p-4 m-6 bg-white">
      {props.children}
    </div>
  );
};
export default Card;
