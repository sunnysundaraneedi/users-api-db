import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { userActions } from "./userSlice";

export const fetchUsersFromDB = () => {
  return (dispatch) => {
    const fetchUsersHandler = () => {
      const userDocRef = query(collection(db, "users"));
      onSnapshot(userDocRef, (snapShot) => {
        dispatch(
          userActions.setUsersList(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      });
    };
    fetchUsersHandler();
  };
};

export const fetchUsersFromAPI = () => {
  return (dispatch) => {
    const fetchUsersHandler = async () => {
      const response = await fetch(
        "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
      );
      const data = await response.json();
      dispatch(userActions.addUsers(data));
    };
    fetchUsersHandler();
  };
};
