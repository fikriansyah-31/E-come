import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, } from 'react-router-dom';
import { UserContext } from './context/userContext';

import Auth from './pages/Auth';
import Product from './pages/Product';
import DetailProduct from './pages/DetailProduct';
import Complain from './pages/Complain';
import Profile from './pages/Profile';
import ComplainAdmin from './pages/ComplainAdmin';
import CategoryAdmin from './pages/CategoryAdmin';
import ProductAdmin from './pages/ProductAdmin';
import UpdateCategoryAdmin from './pages/UpdateCategoryAdmin';
import AddCategoryAdmin from './pages/AddCategoryAdmin';
import AddProductAdmin from './pages/AddProductAdmin';
import UpdateProductAdmin from './pages/UpdateProductAdmin';

// Get API config & setAuthToken here ...


// Init token
import { setAuthToken, API } from './config/api';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate();

  // Init user context 
  const [state, dispatch] = useContext(UserContext)
  console.log(state);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'admin') {
        navigate('/complain-admin');
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);


  // Create/check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
  
      // Kalau token gagal
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      // Get user data
      let payload = response.data.data.user;

      // Get token dari local storage
      payload.token = localStorage.token;
  
      // kirim data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);
  





  return (
    <Routes>
      <Route exact path="/" element={<Product />} /> 
      <Route path="/auth" element={<Auth />} />
      <Route path="/product/:id" element={<DetailProduct />} /> 
      <Route path="/complain" element={<Complain />} />
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/complain-admin" element={<ComplainAdmin />} />
      <Route path="/category-admin" element={<CategoryAdmin />} /> 
      <Route path="/update-category/:id" element={<UpdateCategoryAdmin />} /> 
      <Route path="/add-category" element={<AddCategoryAdmin />} /> 
      <Route path="/product-admin" element={<ProductAdmin />} />
      <Route path="/add-product" element={<AddProductAdmin />} /> 
      <Route path="/update-product/:id" element={<UpdateProductAdmin />} /> 
    </Routes>
  );
}

export default App;