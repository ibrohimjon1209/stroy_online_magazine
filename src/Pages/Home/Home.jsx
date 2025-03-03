import React, { useEffect, useState } from 'react';
import photo from './Images/photo.png';
import cart_icon from './Images/cart_icon.svg';
import like_icon from './Images/like_icon.svg';
import liked_icon from './Images/liked_icon.svg';
import Carusel from './Carusel';
import Download from './Download';

// Mock API function to fetch product data
const fetchProducts = () => {
    return new Promise((resolve) => {
        const products = Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            price: "9.999 UZS",
            image: photo,
            liked: false, // Initialize liked state
        }));
        resolve(products);
    });
};

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    // Function to handle like button click
    const handleLikeToggle = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, liked: !product.liked } : product
            )
        );
    };

    return (
        <div className='sd'>
            <div className='w-full h-auto flex flex-col'>

                <Carusel />
                <div className='popular flex flex-col w-[350px] sm:w-[1440px] m-auto h-auto px-[77px] mt-[50px]'>
                    <h1 className='font-inter font-[600] text-[28px] text-black'>Ommabop tavarlar</h1>

                    <div className='mt-[20px] flex flex-wrap gap-x-[45px] gap-y-[40px]'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className='w-[283px] h-[403px] cursor-pointer hover:shadow-xs'
                            >
                                <div className='w-[283px] h-[283px] rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group'>
                                    <img
                                        src={product.image}
                                        className='transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-fill'
                                        alt={product.name}
                                    />
                                </div>

                                <div className='flex flex-col gap-[16px]'>
                                    <div className='flex flex-col gap-[26px] mt-[30px]'>
                                        <h1 className='font-inter font-[600] text-[20px] text-black'>{product.name}</h1>
                                    </div>
                                    <div className='flex justify-between'>
                                        <p className='font-inter font-[500] text-[20px] leading-[22px] text-black'>Narxi : {product.price}</p>

                                        <div className='flex items-center gap-[16.33px]'>
                                            <img className='hover:scale-[105%] transition-all duration-300 w-[26px] h-[26px] object-contain' src={cart_icon} alt="Cart" />
                                            <img
                                                className={`hover:scale-[105%] transition-all duration-300 ${product.liked ? 'p-[3px]' : 'p-0'} w-[26px] h-[26px] object-contain cursor-pointer`}
                                                src={product.liked ? liked_icon : like_icon}
                                                alt="Like"
                                                onClick={() => handleLikeToggle(product.id)} // Toggle like on click
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>



                <Download />
            </div>
        </div>
    );
}

export default Home;
