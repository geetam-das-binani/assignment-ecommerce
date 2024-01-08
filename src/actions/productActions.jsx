import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const URL='https://dummyjson.com/products'
export const fetchAllProducts = async (setLoading,setProducts) => {
    const cachedProducts = sessionStorage.getItem("products");
    if (cachedProducts) return setProducts(JSON.parse(cachedProducts));

    try {
      setLoading(true);

      const res = await axios.get(URL);
      if (res.status === 200) {
        setProducts(res.data.products);
        sessionStorage.setItem("products", JSON.stringify(res.data.products));
      }
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };
  export const handleSearch = async (debounceSearch,setSearchProducts) => {
    try {
      const res = await axios.get(
        `${URL}/search?q=${debounceSearch}`
      );
      if (res.status === 200) {
        setSearchProducts(res.data.products);
      }
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    }
  };
  export const handleFilterSearch = (priceForFilter,products,setFilteredProducts) => {
    const [minPrice, maxPrice] = priceForFilter.split("-");
    const filteredProducts = products.filter(
      (prod) => prod.price >= minPrice && prod.price <= maxPrice
    );

    setFilteredProducts(filteredProducts);
  };

