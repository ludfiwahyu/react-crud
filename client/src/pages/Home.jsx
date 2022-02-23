import React from "react";
import AddSeller from "../components/AddSeller.jsx";
import Sellers from "../components/Sellers.jsx";

const Home = () => {
  return (
    <div className="shadow p-3 mb-5 bg-white rounded">
  
      <div>
        <Sellers />
      </div>
    </div>
  );
};

export default Home;
