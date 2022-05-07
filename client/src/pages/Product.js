import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Container, Row, Col } from 'react-bootstrap';

import { UserContext } from '../context/userContext';

import { Carousel } from 'react-carousel-minimal';

// Import UseQuery

import { useQuery } from 'react-query';

import Navbar from '../components/Navbar';
import ProductCard from '../components/Product card/ProductCard';

import imgEmpty from '../assets/empty.svg';

// API config
import { API } from '../config/api';


export default function Product() {
  const title = 'Shop';
  document.title = 'DumbMerch | ' + title;

  // Fetching product data from database
let { data: products } = useQuery('productsCache', async () => {
  const response = await API.get('/products');
  return response.data.data;
});



  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    700: 3,
    500: 2,
  };

  // const data = [
  //   {
  //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
  //     caption: "San Francisco"
  //   },
  //   {
  //     image: "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
  //     caption: "Scotland"
  //   },
  //   {
  //     image: "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
  //     caption: "Darjeeling"
  //   },
  //   {
  //     image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
  //     caption: "San Francisco"
  //   },
  //   {
  //     image: "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
  //     caption: "Scotland"
  //   },
  //   {
  //     image: "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
  //     caption: "Darjeeling"
  //   },
  //   {
  //     image: "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
  //     caption: "San Francisco"
  //   },
  //   {
  //     image: "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
  //     caption: "Scotland"
  //   },
  //   {
  //     image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
  //     caption: "Darjeeling"
  //   }
  // ];

  // const captionStyle = {
  //   fontSize: '2em',
  //   fontWeight: 'bold',
  // }
  // const slideNumberStyle = {
  //   fontSize: '20px',
  //   fontWeight: 'bold',
  // }
  
  return (
    <div>
    <Navbar title={title} />
    <Container className="mt-5">
    <Row>
    <Col>
    <div className="text-header-product">Product</div>
    </Col>
    </Row>
    <Row className="my-4">
    {products?.length !== 0 ? (
      <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
      >
      {products?.map((item) => (
        <ProductCard item={item} key={item.id} />
        ))}
        </Masonry>
        
          ) : (
            <Col>
              <div className="text-center pt-5">
                <img
                  src={imgEmpty}
                  className="img-fluid"
                  style={{ width: '40%' }}
                  alt="empty"
                />
                <div className="mt-3">No data product</div>
              </div>
            </Col>
          )}
        </Row>
      </Container>

    </div>
  );
}
