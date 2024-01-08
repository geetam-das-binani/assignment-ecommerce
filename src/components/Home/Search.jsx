import React from 'react'
import './Search.css'
const Search = ({search,setSearch}) => {
  return (
    <div className="wrap">
   <div className="search">
      <input type="text" 
      className="searchTerm" 
      placeholder="Search product by name" 
      value={search}
      onChange={({target})=>setSearch(target.value)}
      />
      
   </div>
</div>
  )
}

export default Search
