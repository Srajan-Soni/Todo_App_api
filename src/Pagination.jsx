import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
// import './Pagination.css';

const Pagination = ({ todosPerPage, totalTodos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTodos / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <BootstrapPagination className="justify-content-center">
      {pageNumbers.map((number) => (
        <BootstrapPagination.Item key={number} onClick={() => paginate(number)}>
          {number}
        </BootstrapPagination.Item>
      ))}
    </BootstrapPagination>
  );
};

export default Pagination;
