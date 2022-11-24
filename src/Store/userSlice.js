import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    searchInput: "",
    newUsers: [],
    // login Slice
    currentUser: {},
    finalUser: [],
    isAuthenticated: false,
    showModal: false,
    // nav classes
    classes: {
      login: "link active",
      users: "link",
    },
  },
  reducers: {
    addUsers: (state, action) => {
      state.usersList = [...action.payload];
    },
    setUsersList: (state, action) => {
      let data = action.payload.map((user) => user.data);
      // console.log(action.payload.data);
      const finalData = data.filter((x) => {
        return !state.usersList.some((y) => {
          return y.id === x.id;
        });
      });

      state.usersList = Array.from([...state.usersList, ...finalData]);
      state.usersList.sort((a, b) => {
        let fa = a.first_name.toLowerCase();
        let fb = b.first_name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    filterUsersList: (state, action) => {
      state.usersList = action.payload;
    },
    searchQuery: (state, action) => {
      state.searchInput = action.payload;
    },

    // login Actions

    logUserIn: (state, action) => {
      const { loginEmail, loginPassword } = action.payload;
      const result = state.usersList.find(
        (user) => user.first_name === loginEmail
      );
      if (result) {
        if (result.email === loginPassword) {
          state.isAuthenticated = true;
          state.currentUser = result;
        } else {
          alert("Incorrect Password");
        }
      } else {
        alert("No email found");
      }
    },

    logUserOut: (state) => {
      state.currentUser = {};
      state.isAuthenticated = false;
    },

    setCurrentUser: (state, action) => {
      const loginEmail = action.payload;
      const result = state.usersList.find((user) => user.email === loginEmail);
      state.currentUser = result;
    },

    showHideModal: (state) => {
      state.showModal = !state.showModal;
    },
    loginClass: (state) => {
      state.classes = { login: "link active", users: "link" };
    },
    usersClass: (state) => {
      state.classes = { users: "link active", login: "link" };
    },
    reverseUsers: (state) => {
      state.usersList.reverse();
    },
    setNewUsers: (state, action) => {
      state.newUsers = action.payload;
    },
    setFinalUser: (state) => {
      const result = state.newUsers.find(
        (user) => user.data.email === state.currentUser.email
      );
      state.finalUser = result;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
