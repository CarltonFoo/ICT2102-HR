import React from "react";
import "../../assets/css/font.css";
import "./card.css"

const Card = (props) => {
  return (
    <div class="rounded shadow-md h-auto text-left p-4 m-6 bg-white pt-12 ">
      {props.children}
    </div>
  );
};
export default Card;
