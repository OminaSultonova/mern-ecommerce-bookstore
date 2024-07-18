import Banner from '../../components/Banner/Banner'
// import SalesBooks from '../../components/ChineseBooks/ChineseBooks'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Header from '../../components/Header/Header'
import products from '../../data/list'

const Home = () => {
  
  // Assuming products array is available in list.js
  const { malayBooks, englishBooks, chineseBooks } = products;

  // Function to handle adding to cart
  const addToCart = (product) => {
    // Implement your addToCart logic here
    console.log('Adding to cart:', product);
  };

  // Combine all products into a single array for FeaturedProducts
  const allProducts = [...malayBooks, ...englishBooks, ...chineseBooks];


  return (
    <div>
      <Header />
      {/* <SalesBooks /> */}
      <Banner/>
      <FeaturedProducts products={allProducts} addToCart={addToCart} />
    </div>
  )
}

export default Home;
