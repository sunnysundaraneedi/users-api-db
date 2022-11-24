import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../Firebase/firebase";
import Modal from "../Modal/Modal";
import { userActions } from "../Store/userSlice";
import "./EditProfile.css";

const EditProfile = () => {
  const user = useSelector((state) => state.users.currentUser);
  const newUsers = useSelector((state) => state.users.newUsers);
  const dispatch = useDispatch();

  dispatch(userActions.setFinalUser(user));
  const finalUser = newUsers.find((newuser) => {
    return newuser.data.email === user.email;
  });

  const [inputFields, setInputFields] = useState({
    ...user,
  });
  const changeHandler = (event) => {
    setInputFields((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    const taskDocRef = doc(db, "users", finalUser.id);
    try {
      await updateDoc(taskDocRef, {
        first_name: inputFields.first_name,
        last_name: inputFields.last_name,
        company_name: inputFields.company_name,
        email: inputFields.email,
        city: inputFields.city,
        state: inputFields.state,
        zip: inputFields.zip,
        web: inputFields.web,
        age: inputFields.age,
        id: user.id,
      });
      alert("Updated, logout and login to see the changes");
      dispatch(userActions.showHideModal());
    } catch (error) {
      console.log("Something went wrong : ", error);
    }
  };

  return (
    <Modal>
      <form onSubmit={submitHandler} className="register-form">
        <h3 className="form-title">Update</h3>

        <div className="container">
          <div className="input-container">
            <input
              type="text"
              value={inputFields.first_name}
              name="first_name"
              placeholder="Enter Your First Name"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.last_name}
              name="last_name"
              placeholder="Enter Your Last Name"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.email}
              name="email"
              placeholder="Enter Your Email Address"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.age}
              name="age"
              placeholder="Enter Your Age"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.company_name}
              name="company_name"
              placeholder="Enter Your Company Name"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.city}
              name="city"
              placeholder="Enter Your City"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.state}
              name="state"
              placeholder="Enter Your State"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.zip}
              name="zip"
              placeholder="Enter Your Zip Code"
              onChange={changeHandler}
              required
            />
            <input
              type="text"
              value={inputFields.web}
              name="web"
              placeholder="Enter Your Website"
              onChange={changeHandler}
              required
            />
          </div>
          <button type="submit">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfile;
