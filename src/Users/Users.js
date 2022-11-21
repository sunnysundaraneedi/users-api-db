import Pagination from "../Pagination/Pagination";
import "./Users.css";

const Users = ({ data }) => {
  return (
    <div className="users-container">
      <Pagination data={data} title="Users" pageLimit={5} dataLimit={10} />
    </div>
  );
};

export default Users;
