import React from "react";
import SearchPage from "./SearchPage";
import AddMeal from '../components/AddMeal';
import Timeline from "./Timeline"
// import CategoryMenu from "../components/CategoryMenu";
import Meal from '../components/Meal';
import AddExercise from '../components/AddExercise';

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 d-flex">
          <AddExercise />
        </div>
        <div className="col-sm-9">
          {/* <AddMeal /> */}
        </div>
      </div>
      <div className="row">
        <Timeline />
      </div>
    </div>
  );
};

export default Home;

