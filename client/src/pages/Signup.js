import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleChange = event => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value
    });
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      if(!formState.age || !formState.gender || !formState.height || !formState.weight) {
        var { data } = await addUser({
          variables: { email: formState.email, username: formState.username, password: formState.password, age: 27, gender: "M", height: 69, weight: 150 }
        });
      }
      else {
        var { data } = await addUser({
          variables: { ...formState }
        });
      }

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="text-center">
      <div className="form-signin col-lg-6 col-md-8 mx-auto">
        <form onSubmit={handleFormSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              className="form-input"
              placeholder="Your username"
              name="username"
              type="username"
              id="username"
              className="form-control"
              value={formState.username}
              onChange={handleChange}
            />
            <label htmlFor="email">Username</label>
          </div>
          <div className="form-floating mt-2">
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              id="email"
              className="form-control"
              value={formState.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mt-2">
            <input
              className="form-input"
              placeholder="******"
              name="password"
              type="password"
              id="password"
              className="form-control"
              value={formState.password}
              onChange={handleChange}
            />
            <label htmlFor="pwd">Password</label>
          </div>
          {
            error ? <div>
              <p className="error-text" >The provided credentials are incorrect</p>
            </div> : null
          }
          <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
        </form>
        {error && <div>Signup failed</div>}
      </div>
    </main>
  );

}

export default Signup;
