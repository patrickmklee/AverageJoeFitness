import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations"
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } })
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e)
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <main className="text-center">
      <div className="form-signin col-lg-6 col-md-8 mx-auto">
        <form onSubmit={handleFormSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              className="form-control"
              onChange={handleChange}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mt-2">
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              className="form-control"
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
      </div>
    </main>
  );
}


export default Login;
