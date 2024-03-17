import NavBar from "../generalComponents/NavBar";
import ShowProducts from "./ShowProducts";

const Landing = () => {
  return (
    <main className="container">
      <NavBar />
      <div className="content">
        <ShowProducts />
        
      </div>
    </main>
  );
};

export default Landing;
