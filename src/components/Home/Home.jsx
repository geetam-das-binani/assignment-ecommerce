import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import Search from "./Search";
import Filter from "./Filter";
import ProductCard from "../Product/ProductCard";

import useCustomDebounce from "../../customHooks/useCustomDebounce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "./Pagination";
import {fetchAllProducts,handleSearch,handleFilterSearch} from '../../actions/productActions'
const ITEMS_PER_PAGE = 8;
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [priceForFilter, setPriceForFilter] = useState("");
  const debounceSearch = useCustomDebounce(search);
  const [page, setPage] = useState(1);


  // display pages  based on filter 
  const displayedProducts =
    filteredProducts.length > 0
      ? filteredProducts
      : searchProducts.length > 0
      ? searchProducts
      : products;
  
 
  useEffect(() => {
    if (products.length === 0) {
      fetchAllProducts(setLoading,setProducts);
    }

    // if search fetch products based on search 
    if (debounceSearch) {
      handleSearch(debounceSearch,setSearchProducts);
    } else {
      // No debounceSearch, fetch all products and reset searchProducts
      fetchAllProducts(setLoading,setProducts);
      setSearchProducts([]);
    }
    if (priceForFilter) {
      handleFilterSearch(priceForFilter,products,setFilteredProducts);
    }
  }, [debounceSearch, priceForFilter]);

  return (
    <Fragment>
      {loading ? (
        <p
          style={{
            fontSize: "2rem",
            position: "absolute",
            top: "5rem",
            color: "tomato",
          }}
        >
          Loading...
        </p>
      ) : (
        <div className="wrapper">
          <div className="products">
            {filteredProducts.length > 0
              ? filteredProducts
                  .slice(
                    page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
                    page * ITEMS_PER_PAGE
                  )
                  .map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))
              : searchProducts.length > 0
              ? searchProducts
                  .slice(
                    page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
                    page * ITEMS_PER_PAGE
                  )
                  .map((product) => {
                    return <ProductCard key={product.id} {...product} />;
                  })
              : products.length > 0 &&
                products
                  .slice(
                    page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
                    page * ITEMS_PER_PAGE
                  )
                  .map((product) => {
                    return <ProductCard key={product.id} {...product} />;
                  })}
          </div>
          <div className="search__filter__box">
            <Search search={search} setSearch={setSearch} />
            <Filter
              priceForFilter={priceForFilter}
              setPriceForFilter={setPriceForFilter}
            />
            {ITEMS_PER_PAGE < displayedProducts.length && (
              <Pagination
                totalPages={Math.ceil(
                  displayedProducts.length / ITEMS_PER_PAGE
                )}
                currentPage={page}
                onPageChange={(newPage) => setPage(newPage)}
              />
            )}

            <button
              className="clear__filter__button"
              onClick={() => {
                setPriceForFilter("");
                setFilteredProducts([]);

                setPage(1);
                fetchAllProducts();
                toast.success("Cleared  filters", {
                  theme: "dark",
                  autoClose: 3000,
                });
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </Fragment>
  );
};

export default Home;
