import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

export const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history("/admin/posts");
    }
  }, []);

  async function login() {
    let item = { email, password };
    let result = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(item)
    });
    result = await result.json();
    if (result.Error) {
      alert(result.Error);
    } else {
      localStorage.setItem("user-info", JSON.stringify(result));
      history("/admin");
    }
  }

  return (
    <div>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-6 card p-4">
            <h1 className="mb-4">Login</h1>

            <input type="email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="password"
              placeholder="E-mail"
              className="form-control mb-4" />

            <input type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              id="password"
              placeholder="Password"
              className="form-control mb-4" />

            <button onClick={login} className="btn btn-primary">Login</button>
          </div>
        </div>

      </div>

    </div>
  );
};
