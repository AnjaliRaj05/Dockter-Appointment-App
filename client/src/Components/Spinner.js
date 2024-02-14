import React from 'react';
import '../Components/spinner.css';
import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/RingLoader";

const override: CSSProperties = {
   
    display: "block",
    marginTop:"30px",
    // borderColor: "#36d7b7",z
    borderColor:"black",
    
  };
const Spinner = () => {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("black");

  return (
    <div className="sweet-loading">
      
      <RingLoader
       color={color}
       loading={loading}
       cssOverride={override}
       size={80}
      
       aria-label="Loading Spinner"
       data-testid="loader"
      />
      
     
    </div>
  )
}

export default Spinner
