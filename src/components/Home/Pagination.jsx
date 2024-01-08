import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination__box">
      {Array(totalPages)
        .fill()
        .map((_, index) => (
          <span
            className={currentPage === index + 1 ? "active" : ""}
            key={index}
            onClick={() => {
              if (index + 1 >= 1 && index + 1 <= totalPages) {
                onPageChange(index + 1);
              }
            }}
          >
            {index + 1}
          </span>
        ))}
    </div>
  );
};

export default Pagination;
