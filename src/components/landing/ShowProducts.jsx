import { useContext, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery, QueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../store/auth";
import LoadingPrd from "./LoadingPrd";
import ProductList from "./ProductList";
import { getAllProductPaginated, getWishListProductByUser } from "../../fetch/products";
import { ProductContext } from "./Landing";
import {
  getProductByCategory,
  getProductByDepartment,
  getProductByRange,
  
} from "../../fetch/filter";

const ShowProducts = () => {
  const { products } = useContext(ProductContext);
  const { setProducts } = useContext(ProductContext);
  const { setProductsBackUp } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const { wishList, setWishList } = useContext(ProductContext);
  const idUser = useAuthStore((state) => state.idUser);


  const { page: pageFilter } = useContext(ProductContext);
  const { size: sizeFilter } = useContext(ProductContext);
  const { filterType } = useContext(ProductContext);
  const { sort } = useContext(ProductContext);
  const { filter } = useContext(ProductContext);
  const { idFilter } = useContext(ProductContext);
  const { maxPrice } = useContext(ProductContext);
  const { minPrice } = useContext(ProductContext);
  const prodAreaRef = useRef(null);

  // const { data: productsData } = useQuery({
  //   queryKey: ["products", pageFilter, sizeFilter],
  //   queryFn: () => getAllProductPaginated(pageFilter, sizeFilter),
  // });
  // const pageIQ = 1;
  const sizeIQ = 3;

  const {
    data: productsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products", sizeIQ],
    queryFn: ({ pageParam = 0 }) => getAllProductPaginated(pageParam, sizeIQ),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length == 0) return null;
      if (lastPage.length < sizeIQ) return null;
      return allPages.length;
    },
  });

  const { data: wishListData, isError } = useQuery({
    queryKey: ["wishList", idUser],
    queryFn: () => getWishListProductByUser(idUser),
  });

  useEffect(() => {
    setWishList(!wishListData?.message ? wishListData : []);
    console.log("wishListData: ", wishListData);
  }, [wishListData]);

  useEffect(() => {
    if (productsData) {
      setProducts(
        productsData.pages.reduce((prev, current) => prev.concat(current), [])
      );
      setProductsBackUp(
        productsData.pages.reduce((prev, current) => prev.concat(current), [])
      );
      productsData.pages[0].length > 0 ? setLoading(false) : setLoading(true);
    }
  }, [productsData, setProducts, setProductsBackUp]);

  useEffect(() => {
    if (filterType === "department") {
      getProductByDepartment(
        idFilter,
        pageFilter,
        sizeFilter,
        sort,
        filter
      ).then((data) => {
        setProducts(data);
        setLoading(false);
      });
    } else if (filterType === "category") {
      getProductByCategory(idFilter, pageFilter, sizeFilter, sort, filter).then(
        (data) => {
          setProducts(data);
          setLoading(false);
        }
      );
    } else if (filterType === "price") {
      getProductByRange(
        minPrice,
        maxPrice,
        pageFilter,
        sizeFilter,
        sort,
        filter
      ).then((data) => {
        setProducts(data);
        setLoading(false);
      });
    }
  }, [
    idFilter,
    filterType,
    filter,
    sort,
    pageFilter,
    sizeFilter,
    setProducts,
    maxPrice,
    minPrice,
  ]);

  const infiniteScroll = () => {
    if (isFetchingNextPage) return;
    if (
      prodAreaRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      console.log("FINAL");
      console.log(prodAreaRef.current.getBoundingClientRect().bottom);
      fetchNextPage();
    } 

  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);

    const intervalID = setInterval(() => {
      if (
        prodAreaRef.current.getBoundingClientRect().bottom <= window.innerHeight
      ) {
        fetchNextPage();
      } else {
        clearInterval(intervalID)
        console.log("Salio  Intervalo...");
      }
      
    }, 1000);

    return () => {
      // console.log("ShowProducts fue retirado de la pantalla")
      clearInterval(intervalID)
      window.removeEventListener("scroll", infiniteScroll);
    }
  }, []);

  return (
    <div
      className="content"
      style={{ padding: "10px", zIndex: "-1" }}
      ref={prodAreaRef}
    >
      {/* <button 
      onClick={() => { fetchNextPage() } }
      style={{padding: '10px'}}>
        fetchNextPage
      </button>  */}

      {loading ? <LoadingPrd /> : <ProductList products={products} />}
      {isFetchingNextPage ? (
        <span>...Cargando</span>
      ) : (
        !hasNextPage && <span>No hay mas resultados</span>
      )}
    </div>
  );
};

export default ShowProducts;
