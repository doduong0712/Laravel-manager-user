import React, { useEffect, useState } from "react";
import AppContainer from "./AppContainer";
import { useHistory, useParams } from "react-router-dom";
import useAPI from "../api/useAPI";

function EditUser() {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [group, setGroup] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [levelGroup, setLevelGroup] = useState(null);
  console.log(levelGroup);

  const onEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const userss = {
        name: name,
        email: user.email,
        group: levelGroup,
      };

      await useAPI.editUSer(id, userss);
      alert("update success");
      history.push("/home");
    } catch (error) {
      setError(error.response.data.errors.name);

      console.log("Fail", error);
    }
  };

  const fetchUser = () => {
    useAPI
      .getUser(id)
      .then((res) => {
        setName(res.name);
        setUser(res);
        setGroup(res.gruops);
        /* res.gruops.map((item, idx) => {
          setGroup(item);
        }); */
      })
      .catch((err) => console.log("fail", err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const usergroup = () => {
    return group.map((item, idx) => {
      return <span key={idx}> {item.namegruop} </span>;
    });
  };

  return (
    <AppContainer title="Edit User">
      <div className="col-xs-4 col-md-4 col-xs-offset-4 col-md-offset-4 mx-auto my-auto ">
        <form onSubmit={onEditSubmit}>
          <div className="form-group">
            <p>ID : {user.id}</p>
          </div>
          <div className="form-group">
            <label>Name </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error ? (
              <div className="form-group text-danger">
                <p>{error}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <p>Email : {user.email}</p>
          </div>
          <div className="form-group">
            <p>Group : {usergroup()}</p>
          </div>
          <div className="form-group">
            <label>Insert group : </label>
            <select
              className="custom-select custom-select-lg mb-3"
              onChange={(e) => setLevelGroup(e.target.value)}
            >
              <option selected>Open this select menu</option>
              <option value={1}>A</option>
              <option value={2}>B</option>
              <option value={3}>C</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="submit"
              name="submit"
              className="form-control btn btn-primary"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </AppContainer>
  );
}

export default EditUser;
