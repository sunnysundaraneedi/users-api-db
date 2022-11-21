import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../Store/userSlice";
import User from "../User/User";
import "./Pagination.css";

const Pagination = ({ data, title, pageLimit, dataLimit }) => {
  const users = useSelector((state) => state.users.usersList);
  const search = useSelector((state) => state.users.searchInput);
  const dispatch = useDispatch();

  const [pages, setPages] = useState(0);

  useEffect(() => {
    setPages(Math.ceil(data.length / dataLimit));
  }, [users]);

  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const startNum = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => startNum + index + 1);
  };

  const searchHandler = (event) => {
    dispatch(userActions.searchQuery(event.target.value));
  };

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div className="search-group">
        <Link
          to="/home"
          className="back-btn"
          onClick={() => dispatch(userActions.loginClass())}
        >
          <i class="uil uil-arrow-circle-left"></i>
        </Link>

        <input
          type="search"
          value={search}
          onChange={searchHandler}
          className="searchField"
          placeholder="Search Users"
        />
      </div>
      <div className="dataContainer">
        <table>
          <thead>
            <tr clas>
              <th>AGE</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>EMAIL</th>
              <th>CITY</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().map((d, idx) => (
              <User key={idx} data={d} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getPaginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}

        <button
          onClick={goToNextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
