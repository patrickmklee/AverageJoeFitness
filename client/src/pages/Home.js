import React from "react";
import SearchPage from "./SearchPage";
import Timeline from "./Timeline"
// import CategoryMenu from "../components/CategoryMenu";
import Meal from '../components/Meal';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 d-flex">
       <Meal />
       </div>
       <div className="col-sm-9">
        <SearchPage />
        </div>
    </div>
    <div className="row">
    <Timeline />
    </div>
    </div>
  );
};

export default Home;

