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
        setNotification("Mahsulot savatga qo'shildi");
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 500000);
    };

    return (
        <div className='w-full  mb-[0px] sm:mb-[100px] flex flex-col items-center'>
            {isVisible && notification && (
                <div className={`absolute z-50 w-full h-auto flex justify-center items-center mt-[80px] sm:mt-[20px] notification overflow-hidden`}>
                    <div className='bg-[#fefdfd] shadow-2xl w-[370px] sm:w-[750px] h-[100px] flex items-center rounded-md transition-opacity duration-500 ease-in-out opacity-100 overflow-hidden'>
                        <div className='ml-[20px] rounded-[5px] overflow-hidden border-[1px] w-[120px] h-[80px] flex justify-center items-center'>
                            <img src={photo} className='w-[80px] h-[80px] object-contain' />
                        </div>

                        <div className='w-full h-full flex flex-col gap-[5px] mt-[20px] ml-[20px]'>
                            <h1 className='font-inter font-[500] text-[10px] sm:text-[16px] leading-[22px] text-black'>Mahsulot savatga qo'shildi</h1>
                            <h1 className='w-[360px] font-inter font-[400] text-[10px] sm:text-[16px] leading-[22px] text-black'>Penapleks 4.x6 o'lcham ko'k ranglisi Lorem ipsum dolor sit amet.</h1>
                        </div>

                        <div className='w-[0px] sm:w-[250px]  flex flex-col items-end gap-[25px] h-full mt-[30px] pr-[20px]'>
                            <X onClick={() => setIsVisible(false)} className='cursor-pointer mr-[40px] sm:mr-[0px] w-[30px]'></X>
                            <Link to={"/basket"}>
                                <h1 className='mr-[50px] mb-[20px] sm:mb-[0px]  sm:mr-[0px] uppercase font-inter font-[600] text-[10px] sm:text-[16px] leading-[22px] text-[#FFDF02]'>Savatga <span className='hidden sm:block'>o'tish</span></h1>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className='mt-[0px] sm:mt-[50px] flex flex-col w-full sm:w-[1440px] m-auto h-auto sm:px-[77px] mb-[100px] sm:mb-[0]'>
                <div className='hidden sm:block'>
                    <Link className='w-full flex items-center gap-[10px]' to={"/"}>
                        <ChevronLeft className='scale-110' />
                        <h1 className='font-inter font-[500] text-[32px] leading-[45px] text-black'>Penoplex</h1>
                    </Link>
                </div>

                <div className='sticky top-0 z-50 block sm:hidden'>
                    <div className='w-full h-[65px] bg-[#DCC38B]'>
                        <Link className='w-full h-full flex items-center gap-[10px] pl-[13px]' to={"/"}>
                            <ChevronLeft className='scale-110' />
                            <h1 className='font-inter font-[500] text-[15px] leading-[22px] text-black'>Penoplex</h1>
                        </Link>
                    </div>
                </div>

                <div className="mt-[20px] px-[15px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[10px] sm:gap-x-[20px] gap-y-[15px] sm:gap-y-[30px]">
                    {products.map((product) => (
                        <div key={product.id} className="w-full cursor-pointer hover:shadow-sm rounded-[10px] bg-white">
                            <Link to={"/product"}>
                                <div className="w-full aspect-square rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        className="transition-transform duration-300 transform group-hover:scale-105 w-full h-full object-contain"
                                        alt={product.name}
                                    />
                                </div>
                            </Link>

                            <div className="flex flex-col gap-[8px] sm:gap-[16px] p-2">
                                <Link to={"/product"}>
                                    <div className="flex flex-col">
                                        <h1 className="font-inter font-[600] text-[12px] sm:text-[16px] text-black truncate">
                                            {product.name}
                                        </h1>
                                    </div>
                                </Link>
                                <div className="flex justify-between items-center">
                                    <Link to={"/product"}>
                                        <p className="font-inter font-[500] text-[12px] sm:text-[14px] text-black">
                                            Narxi: {product.price}
                                        </p>
                                    </Link>

                                    <div className="flex items-center gap-[8px]">
                                        <img
                                            className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain"
                                            src={cart_icon || "/placeholder.svg"}
                                            alt="Cart"
                                            onClick={handleAddToCart}
                                        />
                                        <img
                                            className={`${product.liked ? "p-[2px]" : "p-0"} w-[16px] h-[16px] sm:w-[20px] sm:h-[20px] object-contain cursor-pointer`}
                                            src={product.liked ? liked_icon : like_icon}
                                            alt="Like"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleLikeToggle(product.id)
                                            }}
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
