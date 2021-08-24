import React, { useState, useEffect } from "react";
import useAPI from "../api/useAPI";
import AppContainer from "./AppContainer";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [group, setGroup] = useState([]);
  //console.log(user);

  const fetchUser = () => {
    useAPI
      .getListUsers()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => console.log("fail", err));
  };

  const logOutUser = async () => {
    try {
      await useAPI.logout();
      localStorage.removeItem("user");
      history.push("/login");
    } catch (error) {
      console.log("Fail", error);
    }
  };

  const renderListUser = () => {
    return user.map((item, idx) => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <th>{item.name}</th>
          <th>{item.email}</th>
          <th>
            {item.gruops.map((group, idx) => {
              return `${group.namegruop} `;
            })}
          </th>
          <th>
            <Link className="btn btn-primary" to={`/user/${item.id}`}>
              edit
            </Link>

            <button
              className="btn btn-danger"
              onClick={() => {
                useAPI
                  .deleteUser(item.id)
                  .then(fetchUser())
                  .catch((err) => {
                    alert(`Failed to delete user with id : ${err}`);
                  });
              }}
            >
              delete
            </button>
          </th>
        </tr>
      );
    });
  };

  /* let arrUSer = user;
    return arrUSer.map((item, idx) => {
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <th>{item.name}</th>
        <th>{item.email}</th>
        <th>
          <div>ssss</div>
        </th>
        <th>
          <button>edit</button>
        </th>
      </tr>;
    }); */

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContainer title="List User">
      <button className="btn btn-info" onClick={logOutUser}>
        logout
      </button>
      <div className="table-responsive">
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Group</th>
              <th scope="col">Edit</th>
            </tr>
          </thead>
          <tbody>{renderListUser()}</tbody>
        </table>
      </div>
    </AppContainer>
  );
}

export default Home;
