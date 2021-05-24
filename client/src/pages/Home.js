import React from "react";
import AddMeal from '../components/AddMeal';
import Timeline from "./Timeline"
import AddExercise from '../components/AddExercise';
import Auth from "../utils/auth";

function showTimeline() {
  if (Auth.loggedIn()) {
    return (
      <>
        <div className="row">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Daily Calorie Tracker</h1>
            <p>
              <AddMeal /><AddExercise />
            </p>
          </div>
          <div className="album py-5 bg-light">
            <Timeline />
          </div>
        </div>
      
      </>
    );
  } else {
    return (
      <>
        <div className="row py-lg-5">
          <div className="col-lg-6 col-md-8 mx-auto">
            <h1 class="fw-light">Welcome to Average Joe Fitness</h1>
            <p class="lead text-muted">Start tracking how many calories you consume and burn each day. Users can log meals and exercise routines to determine their daily caloric intake</p>
            <p>
              <a href="/signup" class="btn btn-primary my-2">Signup</a>
            </p>
          </div>
        </div>
      </>
    );
  }
}

const Home = () => {
  return (
    <section className="text-center container">
      {showTimeline()}
    </section>
  );
};

export default Home;

