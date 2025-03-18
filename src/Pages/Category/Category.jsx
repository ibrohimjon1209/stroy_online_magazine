import React, { useEffect, useState } from 'react';
import photo from '../Home/Images/photo.png';
import cart_icon from '../Home/Images/cart_icon.svg';
import like_icon from '../Home/Images/like_icon.svg';
import liked_icon from '../Home/Images/liked_icon.svg';
import { ChevronLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './styles.css';

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
    const [notification, setNotification] = useState('');
    const [isVisible, setIsVisible] = useState(false);

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

    const handleAddToCart = () => {
        setNotification('Mahsulot savatga qo\'shildi');
        setIsVisible(true); // Xabarni ko'rsatish
        setTimeout(() => {
            setIsVisible(false); // Xabarni yopish
        }, 3000);
    };

    return (
        <div className='w-full px-[80px] mb-[100px] flex flex-col items-center'>
            {isVisible && notification && (
                <div className={`absolute z-50 w-full h-auto flex justify-center items-center mt-[30px] notification`}>
                    <div className='bg-[#fefdfd] drop-shadow-lg w-[750px] h-[100px] flex items-center rounded-md transition-opacity duration-500 ease-in-out opacity-100'>
                        <div className='ml-[20px] rounded-[5px] overflow-hidden border-[1px] w-[120px] h-[80px] flex justify-center items-center'>
                            <img src={photo} className='w-[80px] h-[80px] object-contain' />
                        </div>

                        <div className='w-full h-full flex flex-col gap-[5px] mt-[20px] ml-[20px]'>
                            <h1 className='font-inter font-[500] text-[16px] leading-[22px] text-black'>Mahsulot savatga qo'shildi</h1>
                            <h1 className='w-[360px] font-inter font-[400] text-[16px] leading-[22px] text-black'>Penapleks 4.x6 o'lcham ko'k ranglisi Lorem ipsum dolor sit amet.</h1>
                        </div>

                        <div className='w-[250px]  flex flex-col items-end gap-[25px] h-full mt-[30px] pr-[20px]'>
                            <X onClick={() => setIsVisible(false)} className='cursor-pointer'></X>
                            <Link to={"/basket"}>
                                <h1 className='uppercase font-inter font-[600] text-[16px] leading-[22px] text-[#FFDF02]'>Savatga o'tish</h1>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className='mt-[50px] flex flex-wrap gap-x-[45px] gap-y-[40px]'>
                <Link className='w-full flex items-center gap-[10px]' to={"/"}>
                    <ChevronLeft className='scale-110' />
                    <h1 className='font-inter font-[500] text-[32px] leading-[45px] text-black'>Penoplex</h1>
                </Link>

                <div className='mt-[20px] flex flex-wrap gap-x-[45px] gap-y-[40px]'>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className='w-[283px] h-[403px] cursor-pointer hover:shadow-xs'
                        >
                            <Link to={"/product"}>
                                <div className='w-[283px] h-[283px] rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group'>
                                    <img
                                        src={product.image}
                                        className='transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-fill'
                                        alt={product.name}
                                    />
                                </div>
                            </Link>

                            <div className='flex flex-col gap-[16px]'>
                                <Link to={"/product"}>
                                    <div className='flex flex-col gap-[26px] mt-[30px]'>
                                        <h1 className='font-inter font-[600] text-[20px] text-black'>{product.name}</h1>
                                    </div>
                                </Link>
                                <div className='flex justify-between'>
                                    <Link to={"/product"}>
                                        <p className='font-inter font-[500] text-[20px] leading-[22px] text-black'>Narxi : {product.price}</p>
                                    </Link>

                                    <div className='relative z-50 flex items-center gap-[16.33px]'>
                                        <img
                                            className='hover:scale-[105%] transition-all duration-300 w-[26px] h-[26px] object-contain cursor-pointer'
                                            src={cart_icon}
                                            alt="Cart"
                                            onClick={handleAddToCart} // Cart icon ga bosilganda xabar chiqarish
                                        />
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
        </div>
    );
};

export default Category;
