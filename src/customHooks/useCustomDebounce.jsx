import  { useEffect, useState } from 'react'

const useCustomDebounce = (searchTerm) => {
    const [debounceSearch,setDebounceSearch]=useState(searchTerm)
    useEffect(()=>{
      const interval=setTimeout(()=>{
       setDebounceSearch(searchTerm)
      },300)
      return ()=>clearTimeout(interval)
    },[searchTerm])
  return debounceSearch
   
  
}

export default useCustomDebounce
