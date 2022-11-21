import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NavBar from "./NavBar/NavBar";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register";
import { fetchUsersFromAPI, fetchUsersFromDB } from "./Store/fetchUsers";
import Users from "./Users/Users";

function App() {
  const usersList = useSelector((state) => state.users.usersList);
  const searchInput = useSelector((state) => state.users.searchInput);
  // const [users, setUsers] = useState(usersList);
  const [filteredList, setFilteredList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersFromAPI());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsersFromDB());
  }, [dispatch]);

  useEffect(() => {
    // setUsers(usersList);
    setFilteredList(usersList);
  }, [usersList]);

  const filteredUsers = usersList.filter((user) => {
    let firstName = user.first_name.toLocaleLowerCase();
    let last_name = user.last_name.toLocaleLowerCase();
    return (
      firstName.includes(searchInput.toLocaleLowerCase()) ||
      last_name.includes(searchInput.toLocaleLowerCase())
    );
  });
  useEffect(() => {
    setFilteredList(filteredUsers);
  }, [searchInput, filteredUsers]);

  return (
    <Fragment>
      <NavBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/users" element={<Users data={filteredList} />} />
      </Routes>
    </Fragment>
  );
}

export default App;
