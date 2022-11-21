import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebase";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [inputFields, setInputFields] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    email: "",
    city: "",
    state: "",
    zip: "",
    web: "",
    age: "",
  });
  const changeHandler = (event) => {
    setInputFields((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, "users"), {
        ...inputFields,
        id: Math.random(),
      });
      navigate("/");
    } catch (error) {
      console.log("Something went wrong : ", error);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} className="register-form">
        <h3>Register</h3>

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
          <button type="submit">Register</button>
          <Link to="/" className="login-text">
            Already have an account? Login Now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
