import React from "react";

const User = ({ data }) => {
  // console.log(data);
  const externalLink = data.web.includes("http")
    ? data.web
    : `http://${data.web}`;
  return (
    <tr>
      <td>{data.age}</td>
      <td>{data.first_name}</td>
      <td>{data.last_name}</td>
      <td>{data.email}</td>
      <td>{data.city}</td>
      <td>
        <a
          style={{ color: "black" }}
          href={externalLink}
          target="_blank"
          rel="noreferrer"
          className="external_link"
        >
          {data.web}
        </a>
      </td>
    </tr>
  );
};

export default User;
