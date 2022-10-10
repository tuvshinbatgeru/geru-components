import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive'

const MyPaginate = styled(ReactPaginate).attrs({
  // You can redifine classes here, if you want.
  activeClassName: 'active', // default to "disabled"
})`
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style-type: none;

  li a {
    border-radius: 0px;
    padding: 0.5rem 1rem;
    ${'' /* border: gray 1px solid; */}
    cursor: pointer;
  }
  li.previous a,
  li.next a,
  li.break a {
    padding: 0.5rem 1rem;
    border-color: transparent;
  }
  li.active a {
    background-color: #1B1927;
    border-color: transparent;
    color: white;
    min-width: 32px;
  }
  li.disabled a {
    color: grey;
  }
  li.disable,
  li.disabled a {
    cursor: default;
  }
`;

function PaginatedItems(props) {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const { page = 1, limit = 30, total = 0, onPageChange = () => {} } = props
    const pages = Math.ceil(total / limit)
    
    const handlePageClick = (event) => {
      onPageChange(parseInt(event.selected + 1))
    };
  
    return (
      <>
        <MyPaginate
          breakLabel="..."
          nextLabel="Дараах"
          onPageChange={handlePageClick}
          pageRangeDisplayed={isTabletOrMobile ? 2 : 5}
          marginPagesDisplayed={isTabletOrMobile ? 0 : 2}
          pageCount={pages}
          previousLabel="Өмнөх"
          renderOnZeroPageCount={null}
          forcePage={parseInt(page - 1)}
        />
      </>
    );
  }

export default PaginatedItems