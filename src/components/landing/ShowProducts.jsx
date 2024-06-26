import { useContext, useEffect, useState } from "react";
import LoadingPrd from "./LoadingPrd";
import ProductList from "./ProductList";
import { useQuery } from "@tanstack/react-query";
import { getAllProductPaginated } from "../../fetch/products";
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

  const { page: pageFilter } = useContext(ProductContext);
  const { size: sizeFilter } = useContext(ProductContext);
  const { filterType } = useContext(ProductContext);
  const { sort } = useContext(ProductContext);
  const { filter } = useContext(ProductContext);
  const { idFilter } = useContext(ProductContext);
  const { maxPrice } = useContext(ProductContext);
  const { minPrice } = useContext(ProductContext);

  const { data: productsData } = useQuery({
    queryKey: ["products", pageFilter, sizeFilter],
    queryFn: () => getAllProductPaginated(pageFilter, sizeFilter),
  });

  useEffect(() => {
    if (productsData) {
      setProducts(productsData);
      setProductsBackUp(productsData);
      productsData.length > 0 ? setLoading(false) : setLoading(true);
    }
  }, [productsData, setProducts, setProductsBackUp]);

  useEffect(() => {
    console.log(
      "entro al useeffect de showproducts",
      filterType,
      idFilter,
      filter,
      sort,
      pageFilter,
      sizeFilter,
      maxPrice,
      minPrice
    );
    if (filterType === "department") {
      console.log("entro al useeffect de department");
      console.log(idFilter, pageFilter, sizeFilter, sort, filter);
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
      console.log("entro al useeffect de Category");
      console.log(idFilter, pageFilter, sizeFilter, sort, filter);
      getProductByCategory(idFilter, pageFilter, sizeFilter, sort, filter).then(
        (data) => {
          setProducts(data);
          setLoading(false);
        }
      );
    } else if (filterType === "price") {
      console.log("entro al useeffect de precio");
      console.log(idFilter, pageFilter, sizeFilter, sort, filter);
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

  return (
    <div className="content" style={{ padding: "10px", zIndex: "-1" }}>
      {loading ? <LoadingPrd /> : <ProductList products={products} />}
    </div>
  );
};

export default ShowProducts;
