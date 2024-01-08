import React from "react";
import "./Filter.css";
const priceArr=[
  "0-500",
  "500-1000",
  "1000-1500",
  "1500-2000"
]
const Filter = ({priceForFilter,setPriceForFilter}) => {

  return (
    <div className="filter__box">
      <select
      value={priceForFilter}
      onChange={({target})=>setPriceForFilter(target.value)}
      >
        <option value="Price"> Price</option>
        {
          priceArr.map((priceRange,index)=>(
            <option key={index} value={priceRange}>{priceRange}</option>
          ))
        }
      </select>
    </div>
  );
};

export default Filter;
