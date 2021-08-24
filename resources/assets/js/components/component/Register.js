import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppContainer from "./AppContainer";
import useAPI from "../api/useAPI";

function Register() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errName, setErrName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPass, setErrPass] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        name: name,
        email: email,
        password: password,
      };

      await useAPI.registerUser(user);
      alert("Register Succes");
      history.push("/login");
    } catch (error) {
      console.log(error.response.data.errors);
      if (error.response.data.errors != undefined) {
        setErrName(error.response.data.errors.name);
        setErrEmail(error.response.data.errors.email);
        setErrPass(error.response.data.errors.password);
      } else {
        setErrName("");
        setErrEmail("");
        setErrPass("");
      }
      if (error.response.data.error != undefined) {
        setErr(error.response.data.error);
        console.log("Fail", error.response.data.error);
      }
    }
  };

  return (
    <AppContainer title="Register">
      <div className="row mt-5">
        <div className="col-sm-6 mx-auto">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                onChange=""
                name="name"
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errName ? (
              <div className="form-group text-danger">
                <p>{errName}</p>
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                onChange=""
                name="email"
                type="text"
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
            <button
              type="submit"
              className="btn btn-success"
              onClick={onSubmit}
            >
              Đăng kí
            </button>
          </form>
        </div>
      </div>
    </AppContainer>
  );
}

export default Register;
