import React, { useState } from "react";
import AppContainer from "./AppContainer";
import { useHistory, Link } from "react-router-dom";
import useAPI from "../api/useAPI";
//import dotenv from "dotenv";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errEmail, setErrEmail] = useState(" ");
  const [errPass, setErrPass] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        email: email,
        password: password,
      };

      await useAPI.loginUser(user).then((res) => {
        localStorage.setItem("user", JSON.stringify(res));
      });

      history.push("/home");
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response.data.errors != undefined) {
        setErrEmail(error.response.data.errors.email);
        setErrPass(error.response.data.errors.password);
      } else {
        setErrEmail("");
        setErrPass("");
      }
      if (error.response.data.error != undefined) {
        setErr(error.response.data.error);
        //console.log("Fail", error.response.data.error);
      }
    }
  };

  return (
    <AppContainer title="Login">
      <div className="row mt-5">
        <div className="col-sm-6 mx-auto">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                onChange=""
                name="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errEmail ? (
              <div className="form-group text-danger">
                <p>{errEmail}</p>
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label>Password</label>
              <input
                onChange=""
                name="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errPass ? (
              <div className="form-group text-danger">
                <p>{errPass}</p>
              </div>
            ) : (
              ""
            )}
            {err ? (
              <div className="form-group text-danger">
                <p>{err}</p>
              </div>
            ) : (
              ""
            )}
            <br />
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success mr-5"
                onClick={onSubmit}
              >
                Đăng nhập
              </button>
              <Link to="/register">Đăng kí</Link>
            </div>
          </form>
        </div>
      </div>
    </AppContainer>
  );
}

export default Login;
