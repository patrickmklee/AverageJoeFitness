import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <a class="me-3 py-2 text-dark text-decoration-none" href="/" onClick={() => Auth.logout()}>Logout</a>
        </>
      );
    } else {
      return (
        <>
          <a class="me-3 py-2 text-dark text-decoration-none" href="/signup">Signup</a>
          <a class="me-3 py-2 text-dark text-decoration-none" href="/login">Login</a>
        </>
      );
    }
  }

  return (
    <header>

      <div class="d-flex flex-column flex-md-row align-items-center pt-3 pb-3 mb-4 border-bottom container">
        <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
            <span role="img" aria-label="Logo">💪🏽</span>
            Average Joe Fitness
        </a>

        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          {showNavigation()}
        </nav>
      </div>

    </header>
  );
}

export default Nav;
