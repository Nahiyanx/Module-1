import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper/core';
//import 'swiper/css/bundle';
import 'swiper/swiper-bundle.css';
import ListingItem from '../components/Listingitem';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  
  
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  //console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };


    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    // <div className='bg-gradient-to-r from-gray-100 via-green-100 to-gray-300'>
    // <div className='bg-gradient-to-r from-gray-200 via-gray-200 to-blue-200'>
    <div className='bg-gradient-to-r from-blue-200 via-pink-100 to-purple-300'>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-pink-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-orange-500'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-violet-600 text-xs sm:text-sm'>
          Airbnb Rent is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-yellow-500 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing,index) => (
            //console.log(listing.imageUrls[0]),
            <SwiperSlide key={listing.imageUrls[0]}>
              {/* <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='h-[500px]'
                key={listing._id}
              ></div> */}

              <div className='flex justify-center items-center h-[700px]'>
                <img 
                  src={listing.imageUrls[0]} 
                  alt={`Slide ${index}`} 
                  className='h-[90%] w-[90%] object-cover rounded-lg shadow-2xl'
                />
              </div>

            </SwiperSlide>
            
          ))}
      </Swiper>

      {/* listing results for offer, sale and rent */}

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-pink-600'>Recent offers</h2>
              <Link className='text-sm text-orange-600 hover:underline' to={'/search?offer=true'}>Show More Offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-pink-600'>Recent places for rent</h2>
              <Link className='text-sm text-orange-600 hover:underline' to={'/search?type=rent'}>Show More Places For Rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-pink-600'>Recent places for sale</h2>
              <Link className='text-sm text-orange-600 hover:underline' to={'/search?type=sale'}>Show More Places For Sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}