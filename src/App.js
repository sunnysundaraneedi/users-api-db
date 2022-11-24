import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile/EditProfile";
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
  const showModal = useSelector((state) => state.users.showModal);

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

  useEffect(() => {
    console.log("ran");
    const filteredUsers = usersList.filter((user) => {
      let firstName = user.first_name.toLocaleLowerCase();
      let last_name = user.last_name.toLocaleLowerCase();
      return (
        firstName.includes(searchInput.toLocaleLowerCase()) ||
        last_name.includes(searchInput.toLocaleLowerCase())
      );
    });
    setFilteredList(filteredUsers);
  }, [searchInput, usersList]);

  console.log(usersList);

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
      {showModal && <EditProfile />}
    </Fragment>
  );
}

export default App;
