import Filter from "./Filter";
import Search from "./Search";


const ProductHeader = () => {

  return (
    <div className="productHeader">
      <Filter />
      <Search />
    </div>
  );
};

export default ProductHeader;
