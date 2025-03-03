import React, { useEffect, useState } from 'react'
import photo from '../Home/Images/photo.png';
import cart_icon from '../Home/Images/cart_icon.svg';
import like_icon from '../Home/Images/like_icon.svg';
import liked_icon from '../Home/Images/liked_icon.svg';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';



const fetchProducts = () => {
    return new Promise((resolve) => {
        const products = Array.from({ length: 12 }, (_, index) => ({
            id: index + 1,
            name: `Product ${index + 1}`,
            price: "9.999 UZS",
            image: photo,
            liked: false,
        }));
        resolve(products);
    });
};



const Category = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    const handleLikeToggle = (id) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, liked: !product.liked } : product
            )
        );
    };

    return (
        <div className='w-full px-[80px] mb-[100px] flex justify-center'>

            <div className='mt-[50px] flex flex-wrap gap-x-[45px] gap-y-[40px]'>

                <Link className='w-full flex items-center gap-[10px]' to={"/"}>

                    <ChevronLeft className='scale-110' />
                    <h1 className='font-inter font-[500] text-[32px] leading-[45px] text-black'>Penoplex</h1>
                </Link>

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
                                        onClick={() => handleLikeToggle(product.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Category