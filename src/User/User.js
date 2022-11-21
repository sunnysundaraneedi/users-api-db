import React from "react";

const User = ({ data }) => {
  // console.log(data);
  return (
    <tr>
      <td>{data.age}</td>
      <td>{data.first_name}</td>
      <td>{data.last_name}</td>
      <td>{data.email}</td>
      <td>{data.city}</td>
    </tr>
  );
};

export default User;
