"use client"

import { useState, useEffect, useRef } from "react" // useState import qilindi
import product_1 from "./Images/product_1.svg"
import product_2 from "./Images/product_2.webp"
import product_3 from "./Images/product_3.png"
import payme_icon from "./Images/payme.svg"
import second_icon from "./Images/second.svg"
import anorbank_icon from "./Images/anorbank.svg"
import uzum_icon from "./Images/uzum.svg"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

const Product = () => {
    const [selectedSize, setSelectedSize] = useState("4x6")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [selectedColorIndex, setSelectedColorIndex] = useState(0)
    const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(3)
    const [isAdded, setIsAdded] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)
    const [notification, setNotification] = useState("")
    const [isVisible, setIsVisible] = useState(false)

    // Product images array
    const productImages = [product_1, product_2, product_3]

    // State for selected image and its index
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [selectedImage, setSelectedImage] = useState(productImages[0])

    // Animation states
    const [slideDirection, setSlideDirection] = useState("")
    const [isTransitioning, setIsTransitioning] = useState(false)

    const colors = [{ col: product_1 }, { col: product_2 }, { col: product_3 }, { col: product_1 }]

    const paymentOptions = ["3 oy", "6 oy", "12 oy", "24 oy"]
    const sizes = ["4x6", "4x6", "5x6", "4x6"]

    const productImagesRef = useRef(productImages)

    // Update selected image when index changes
    useEffect(() => {
        setSelectedImage(productImagesRef.current[selectedImageIndex])
    }, [selectedImageIndex])

    // Handle thumbnail click
    const handleThumbnailClick = (index) => {
        // Set direction based on current and new index
        if (index > selectedImageIndex) {
            setSlideDirection("slide-left")
        } else if (index < selectedImageIndex) {
            setSlideDirection("slide-right")
        }

        // Start transition
        setIsTransitioning(true)

        // After a short delay, update the image
        setTimeout(() => {
            setSelectedImageIndex(index)

            // End transition after the animation completes
            setTimeout(() => {
                setIsTransitioning(false)
                setSlideDirection("")
            }, 300)
        }, 50)
    }

    // Navigate to previous image
    const handlePrevImage = () => {
        if (selectedImageIndex > 0) {
            setSlideDirection("slide-right")
            setIsTransitioning(true)

            setTimeout(() => {
                setSelectedImageIndex((prevIndex) => prevIndex - 1)

                setTimeout(() => {
                    setIsTransitioning(false)
                    setSlideDirection("")
                }, 300)
            }, 50)
        } else {
            // Cycle to the last image if at the beginning
            setSlideDirection("slide-right")
            setIsTransitioning(true)

            setTimeout(() => {
                setSelectedImageIndex(productImagesRef.current.length - 1)

                setTimeout(() => {
                    setIsTransitioning(false)
                    setSlideDirection("")
                }, 300)
            }, 50)
        }
    }

    // Navigate to next image
    const handleNextImage = () => {
        if (selectedImageIndex < productImagesRef.current.length - 1) {
            setSlideDirection("slide-left")
            setIsTransitioning(true)

            setTimeout(() => {
                setSelectedImageIndex((prevIndex) => prevIndex + 1)

                setTimeout(() => {
                    setIsTransitioning(false)
                    setSlideDirection("")
                }, 300)
            }, 50)
        } else {
            // Cycle to the first image if at the end
            setSlideDirection("slide-left")
            setIsTransitioning(true)

            setTimeout(() => {
                setSelectedImageIndex(0)

                setTimeout(() => {
                    setIsTransitioning(false)
                    setSlideDirection("")
                }, 300)
            }, 50)
        }
    }

    const handleColorClick = (index) => {
        setSelectedColorIndex(index)
    }

    const handleSizeClick = (size, index) => {
        setSelectedSize(size)
        setSelectedIndex(index)
    }

    const handlePaymentClick = (index) => {
        setSelectedPaymentIndex(index)
    }

    const handleClick = () => {
        setIsAnimating(true)
        setTimeout(() => {
            setIsAdded(true)
            setIsAnimating(false)
            handleAddToCart() // Xabarni ko'rsatish
        }, 600)
    }

    const handleAddToCart = () => {
        setNotification("Mahsulot savatga qo'shildi")
        setIsVisible(true) // Xabarni ko'rsatish
        setTimeout(() => {
            setIsVisible(false) // Xabarni yopish
        }, 3000)
    }

    return (
        <div className="w-full h-auto mt-[50px] px-[190px] mb-[111px]">
            {/* CSS for image transitions */}
            <style jsx>{`
                @keyframes slideLeft {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(-20px); opacity: 0; }
                }
                
                @keyframes slideRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(20px); opacity: 0; }
                }
                
                @keyframes slideInLeft {
                    from { transform: translateX(20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideInRight {
                    from { transform: translateX(-20px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                .slide-left {
                    animation: slideLeft 0.3s forwards;
                }
                
                .slide-right {
                    animation: slideRight 0.3s forwards;
                }
                
                .slide-in-left {
                    animation: slideInLeft 0.3s forwards;
                }
                
                .slide-in-right {
                    animation: slideInRight 0.3s forwards;
                }
                
                .nav-button {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(255, 255, 255, 0.7);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    z-index: 10;
                }
                
                .nav-button:hover {
                    background-color: rgba(255, 255, 255, 0.9);
                }
                
                .nav-button-left {
                    left: 10px;
                }
                
                .nav-button-right {
                    right: 10px;
                }
            `}</style>

            {isVisible && notification && (
                <div className={`absolute z-50 left-1 w-full h-auto flex justify-center items-center notification`}>
                    <div className="bg-[#fefdfd] drop-shadow-lg w-[750px] h-[100px] flex items-center rounded-md transition-opacity duration-500 ease-in-out opacity-100">
                        <div className="ml-[20px] rounded-[5px] overflow-hidden border-[1px] w-[120px] h-[80px] flex justify-center items-center">
                            <img src={product_1 || "/placeholder.svg"} className="w-[80px] h-[80px] object-contain" />
                        </div>

                        <div className="w-full h-full flex flex-col gap-[5px] mt-[20px] ml-[20px]">
                            <h1 className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                                Mahsulot savatga qo'shildi
                            </h1>
                            <h1 className="w-[360px] font-inter font-[400] text-[16px] leading-[22px] text-black">
                                Penapleks 4.x6 o'lcham ko'k ranglisi Lorem ipsum dolor sit amet.
                            </h1>
                        </div>

                        <div className="w-[250px] flex flex-col items-end gap-[25px] h-full mt-[30px] pr-[20px]">
                            <X onClick={() => setIsVisible(false)} className="cursor-pointer"></X>
                            <Link to={"/basket"}>
                                <h1 className="uppercase font-inter font-[600] text-[16px] leading-[22px] text-[#FFDF02]">
                                    Savatga o'tish
                                </h1>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <h1 className="font-inter font-[600] text-[20px] leading-[22px] text-black">PENOPLESK</h1>
            <div className="flex gap-[20px]">
                <div className="product-div">
                    <div className="mt-[20px] flex gap-[19px]">
                        <div className="image-selection-div flex flex-col gap-[18px]">
                            {productImagesRef.current.map((image, index) => (
                                <div
                                    key={index}
                                    className={`border-[2px] ${selectedImageIndex === index ? "border-[rgba(190,160,134,1)]" : "border-transparent"} overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center cursor-pointer`}
                                    onClick={() => handleThumbnailClick(index)}
                                >
                                    <img src={image || "/placeholder.svg"} className="w-[158px] h-[156px] object-fill" />
                                </div>
                            ))}
                        </div>
                        <div className="big-selected-image relative w-[504px] h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]">
                            <div className="nav-button nav-button-left" onClick={handlePrevImage}>
                                <ChevronLeft size={24} />
                            </div>

                            <div className="nav-button nav-button-right" onClick={handleNextImage}>
                                <ChevronRight size={24} />
                            </div>

                            <img
                                src={selectedImage || "/placeholder.svg"}
                                className={`w-[504px] h-[504px] object-fill ${isTransitioning ? slideDirection : slideDirection ? (slideDirection === "slide-left" ? "slide-in-right" : "slide-in-left") : ""}`}
                            />
                        </div>
                    </div>

                    <div className="mt-[40px] flex flex-col gap-[28px] w-[681px]">
                        <h1 className="font-inter font-[600] text-[28px] leading-[22px] text-black">Tasnif</h1>
                        <p className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero recusandae nihil earum eligendi officiis
                            quaerat odit magnam? Veniam, vitae dolores! Velit, quo officia sapiente saepe ratione, nemo ea cupiditate
                            molestias blanditiis sequi qui in reiciendis ab optio officiis veniam delectus eos iure quia nostrum?
                            Consequatur nulla sequi ea eos quo maxime, commodi atque dolorem asperiores dolores, eaque, delectus
                            doloremque repellendus sunt quis ab molestiae. Exercitationem explicabo, porro pariatur eveniet, assumenda
                            quo non atque ipsa molestiae saepe repellat iste eaque cupiditate quisquam aliquid consequatur dicta,
                            possimus sunt ad blanditiis. Praesentium voluptates fuga reprehenderit? Rem nam est nobis consectetur enim
                            pariatur reiciendis deserunt vitae nisi odio assumenda, alias quidem, aut impedit, quia labore earum qui
                            asperiores. Ut in, officia qui modi minus fuga culpa iste consectetur illum, veritatis illo quasi
                            architecto accusantium. Quae doloremque modi unde vero. Neque tempora numquam reprehenderit mollitia amet
                            illo, rerum iusto aperiam molestiae ullam porro dolore suscipit itaque ipsa, voluptatum ipsam consequuntur
                            necessitatibus facilis laborum cupiditate asperiores dolorem, quae exercitationem! Ipsa, obcaecati eum!
                            Quibusdam nam facere iusto consequatur veritatis corporis perferendis vero eius totam? Beatae iusto
                            deserunt non hic? Porro eveniet incidunt fugit quia minus, pariatur nihil illum repudiandae quis! Deleniti
                            ipsam possimus vel reprehenderit! Modi, perferendis.
                        </p>
                    </div>
                </div>

                <div className="product-details mt-[20px]">
                    <div className="flex flex-col gap-[10px]">
                        <h5 className="font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]">Mavjud</h5>
                        <h1 className="font-inter font-[600] text-[24px] leading-[22px] text-black">Penoplex Komfort</h1>
                    </div>
                    <div className="color-div mt-[7px] flex flex-col gap-[6px]">
                        <h1 className="font-inter font-[400] text-[13px] leading-[22px] text-black">
                            Rang : <span className="font-[500]">Ko'k</span>
                        </h1>
                        <div className="select-color flex gap-[10px]">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-200 overflow-hidden w-[62px] h-[80px] flex justify-center items-center rounded-[5px] 
                                    ${selectedColorIndex === index ? "border-[1.5px] border-[rgba(190,160,134,1)]" : "border-transparent"} 
                                    bg-[rgba(247,247,246,1)] cursor-pointer`}
                                    onClick={() => handleColorClick(index)}
                                >
                                    <span className="font-inter font-[400] text-[16px] leading-[22px] text-black">
                                        <img src={color.col || "/placeholder.svg"} alt="" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="size-div mt-[20px]">
                        <h1 className="font-inter font-[400] text-[13px] leading-[22px] text-[rgba(0,0,0,1)]">
                            O'lchami (Metr²): {selectedSize}
                        </h1>
                        <div className="sizes flex gap-[10px] mt-[7px] transition-all duration-300 cursor-pointer">
                            {sizes.map((size, index) => (
                                <div
                                    key={index}
                                    className={`active:scale-[99%] transition-all duration-200 flex justify-center items-center w-[62px] h-[62px] rounded-[5px] 
                                    ${selectedIndex === index ? "border-[rgba(190,160,134,1)] border-[1.5px]" : "border-transparent"} 
                                    bg-[rgba(247,247,246,1)]`}
                                    onClick={() => handleSizeClick(size, index)}
                                >
                                    <span className="font-inter font-[400] text-[16px] leading-[22px] text-black">{size}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-[20px]">
                        <h1 className="font-inter font-[700] text-[20px] leading-[22px] text-[rgba(0,0,0,1)]">1.116.000 so'm</h1>
                    </div>

                    <div className="term-payment mt-[20px]">
                        <div className="flex flex-col justify-between w-[358px] py-[10px] px-[12px] h-[87px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]">
                            <div className="w-[335px] h-[26px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]">
                                {paymentOptions.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`transition-all duration-100 flex justify-center items-center w-[80px] h-[26px] rounded-[5px] cursor-pointer ${selectedPaymentIndex === index ? "bg-white border-[1.5px] border-[rgba(190,160,134,1)]" : ""}`}
                                        onClick={() => handlePaymentClick(index)}
                                    >
                                        <h1 className="font-inter font-[500] text-[10px] text-[rgba(0,0,0,1)]">{option}</h1>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-[10px] items-center">
                                <h1 className="w-[89px] h-[28px] rounded-[2.5px] bg-[rgba(254,242,157,1)] font-inter font-[500] text-[13px] leading-[22px] flex justify-center items-center">
                                    135.652 so'm
                                </h1>
                                <h1 className="font-inter font-[500] text-[10px] leading-[22px] text-[rgba(0,0,0,1)]">x 24oy</h1>
                            </div>
                        </div>

                        <p className="mt-[10px] w-[318px] font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]">
                            Siz buyurtmani 3 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.
                        </p>

                        <div className="payment-options p-[20px] mt-[20px] w-[358px] h-[297px] rounded-[10px] border-[1px] border-[rgba(213,213,213,1)]">
                            <h1 className="font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]">
                                Yetkazib berish <span className="font-inter font-[800]">1 kun</span> ichida Agar{" "}
                                <span className="font-inter font-[800]">5mln</span> so'mdan ortiq mahsulotga buyurtma bersangiz yetkazib
                                berish VODIY bo'ylab be'pul.
                            </h1>
                            <div className="mt-[20px] w-[318px] h-[1px] bg-[rgba(213,213,213,1)]"></div>
                            <h1 className="mt-[20px] font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]">
                                Muddatli to'lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma'qul takliflarga ega
                                bo'lishingiz mumkin.
                            </h1>

                            <div className="flex gap-[15px] mt-[20px]">
                                <div className="w-[68px] h-[65px] rounded-[10px] bg-green-300">
                                    <img src={payme_icon || "/placeholder.svg"} />
                                </div>
                                <div className="w-[68px] h-[65px] rounded-[10px] bg-green-300">
                                    <img src={second_icon || "/placeholder.svg"} />
                                </div>
                                <div className="w-[68px] h-[65px] rounded-[10px] bg-green-300">
                                    <img src={anorbank_icon || "/placeholder.svg"} />
                                </div>
                                <div className="w-[68px] h-[65px] rounded-[10px] bg-green-300">
                                    <img src={uzum_icon || "/placeholder.svg"} />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <button
                                className={`mt-[20px] w-[358px] h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-[rgba(0,0,0,1)] ${isAnimating ? "animate-circle" : ""}`}
                                onClick={handleClick}
                            >
                                {!isAnimating ? (isAdded ? "Qo'shildi ✅" : "Savatchaga qo'shish") : ""}
                            </button>
                            {isAnimating && (
                                <div className="absolute mt-[20px] inset-0 flex justify-center items-center">
                                    <div className="w-8 h-8 border-4 border-t-4 border-t-[#ffffff] border-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product

