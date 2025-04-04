"use client"

import { useState, useEffect, useRef } from "react"
import product_1 from "./Images/product_1.svg"
import product_2 from "./Images/product_2.webp"
import product_3 from "./Images/product_3.png"
import payme_icon from "./Images/payme.svg"
import second_icon from "./Images/second.svg"
import anorbank_icon from "./Images/anorbank.svg"
import uzum_icon from "./Images/uzum.svg"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const Product = () => {
  const navigate = useNavigate()
  const [productData, setProductData] = useState(null)
  const [selectedSize, setSelectedSize] = useState("4x6")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(3)
  const [isAdded, setIsAdded] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [notification, setNotification] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState(product_1)
  const [slideDirection, setSlideDirection] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [uniqueSizes, setUniqueSizes] = useState([])
  const [sizeVariants, setSizeVariants] = useState({})

  const productImages = [product_1, product_2, product_3]
  const paymentOptions = ["3 oy", "6 oy", "12 oy", "24 oy"]
  const productImagesRef = useRef(productImages)

  useEffect(() => {
    setSelectedImage(productImagesRef.current[selectedImageIndex])
  }, [selectedImageIndex])

  const fetchProduct = async () => {
    try {
      const url = window.location.href
      const id = url.split("/").pop()
      const response = await fetch(`https://back.stroybazan1.uz/api/api/products/${id}/`)
      const data = await response.json()
      setProductData(data)
      setSelectedSize(data.variants[0].size_uz)

      // Generate unique sizes
      const uniqueSizesMap = new Map()
      const sizeVariantsMap = {}

      data.variants.forEach((variant, index) => {
        const sizeLower = variant.size_uz.toLowerCase().trim()

        // Group variants by size
        if (!sizeVariantsMap[sizeLower]) {
          sizeVariantsMap[sizeLower] = []
        }
        sizeVariantsMap[sizeLower].push(index)

        if (!uniqueSizesMap.has(sizeLower)) {
          uniqueSizesMap.set(sizeLower, {
            size: variant.size_uz,
            variantIndex: index,
          })
        }
      })

      const uniqueSizesArray = Array.from(uniqueSizesMap.values())
      setUniqueSizes(uniqueSizesArray)
      setSizeVariants(sizeVariantsMap)
    } catch (error) {
      console.error("Xatolik yuz berdi:", error)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const handleThumbnailClick = (index) => {
    if (index > selectedColorIndex) {
      setSlideDirection("slide-left")
    } else if (index < selectedColorIndex) {
      setSlideDirection("slide-right")
    }
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedColorIndex(index)
      setTimeout(() => {
        setIsTransitioning(false)
        setSlideDirection("")
      }, 300)
    }, 50)
  }

  const handlePrevImage = () => {
    if (!productData || !productData.variants || productData.variants.length === 0) return

    // Get current size
    const currentSize = productData.variants[selectedColorIndex].size_uz.toLowerCase().trim()

    // Get variants with the same size
    const sameSize = sizeVariants[currentSize] || []
    if (sameSize.length <= 1) return // No other variants with same size

    // Find current position in the same-size variants
    const currentPosInSize = sameSize.indexOf(selectedColorIndex)

    // Get previous variant with same size (or loop to the end)
    const prevPos = currentPosInSize > 0 ? currentPosInSize - 1 : sameSize.length - 1
    const newIndex = sameSize[prevPos]

    setSlideDirection("slide-right")
    setIsTransitioning(true)

    setTimeout(() => {
      setSelectedColorIndex(newIndex)

      // Find the index in uniqueSizes that matches this variant's size
      const sizeIndex = uniqueSizes.findIndex(
        (item) => item.size.toLowerCase() === productData.variants[newIndex].size_uz.toLowerCase(),
      )

      if (sizeIndex !== -1) {
        setSelectedIndex(sizeIndex)
      }

      setTimeout(() => {
        setIsTransitioning(false)
        setSlideDirection("")
      }, 300)
    }, 50)
  }

  const handleNextImage = () => {
    if (!productData || !productData.variants || productData.variants.length === 0) return

    // Get current size
    const currentSize = productData.variants[selectedColorIndex].size_uz.toLowerCase().trim()

    // Get variants with the same size
    const sameSize = sizeVariants[currentSize] || []
    if (sameSize.length <= 1) return // No other variants with same size

    // Find current position in the same-size variants
    const currentPosInSize = sameSize.indexOf(selectedColorIndex)

    // Get next variant with same size (or loop to the beginning)
    const nextPos = currentPosInSize < sameSize.length - 1 ? currentPosInSize + 1 : 0
    const newIndex = sameSize[nextPos]

    setSlideDirection("slide-left")
    setIsTransitioning(true)

    setTimeout(() => {
      setSelectedColorIndex(newIndex)

      // Find the index in uniqueSizes that matches this variant's size
      const sizeIndex = uniqueSizes.findIndex(
        (item) => item.size.toLowerCase() === productData.variants[newIndex].size_uz.toLowerCase(),
      )

      if (sizeIndex !== -1) {
        setSelectedIndex(sizeIndex)
      }

      setTimeout(() => {
        setIsTransitioning(false)
        setSlideDirection("")
      }, 300)
    }, 50)
  }

  const handleColorClick = (index) => {
    setSelectedColorIndex(index)
    setSelectedSize(productData.variants[index].size_uz)

    // Find the index in uniqueSizes that matches this variant's size
    const sizeIndex = uniqueSizes.findIndex(
      (item) => item.size.toLowerCase() === productData.variants[index].size_uz.toLowerCase(),
    )

    if (sizeIndex !== -1) {
      setSelectedIndex(sizeIndex)
    }
  }

  const handleSizeClick = (size, index) => {
    setSelectedSize(size)
    setSelectedIndex(index)

    // Find the first variant with this size
    const variantIndex = productData.variants.findIndex(
      (variant) => variant.size_uz.toLowerCase() === size.toLowerCase(),
    )

    if (variantIndex !== -1) {
      setSelectedColorIndex(variantIndex)
    }
  }

  const handlePaymentClick = (index) => {
    setSelectedPaymentIndex(index)
  }

  const handleClick = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAdded(true)
      setIsAnimating(false)
      handleAddToCart()

      // Navigate to basket page after a short delay
      setTimeout(() => {
      }, 800)
    }, 600)
  }

  const handleAddToCart = () => {
    // Here you would typically add the product to the cart in your state management or localStorage
    // For example:
    // const cartItem = {
    //     id: productData.id,
    //     name: productData.name_uz,
    //     size: selectedSize,
    //     color: productData.variants[selectedColorIndex].color_uz,
    //     price: productData.variants[selectedColorIndex].price,
    //     image: productData.variants[selectedColorIndex].image,
    //     quantity: 1
    // };
    // Add to cart logic here...

    setNotification("Mahsulot savatga qo'shildi")
    setIsVisible(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 3000)
  }

  // Check if a variant is of the currently selected size
  const isCurrentSizeVariant = (index) => {
    if (!productData || !productData.variants) return false

    const currentSize = productData.variants[selectedColorIndex].size_uz.toLowerCase().trim()
    const variantSize = productData.variants[index].size_uz.toLowerCase().trim()

    return currentSize === variantSize
  }

  if (!productData) {
    return <div>Loading...</div>
  }

  const monthlyPayments = [
    productData.variants[selectedColorIndex].monthly_payment_3,
    productData.variants[selectedColorIndex].monthly_payment_6,
    productData.variants[selectedColorIndex].monthly_payment_12,
    productData.variants[selectedColorIndex].monthly_payment_24,
  ]

  // Get current size variants count
  const currentSize = productData.variants[selectedColorIndex].size_uz.toLowerCase().trim()
  const currentSizeVariants = sizeVariants[currentSize] || []
  const hasMultipleVariants = currentSizeVariants.length > 1

  return (
    <div className="w-full h-auto mt-[0px] sm:mt-[50px] px-[22px] sm:px-[190px] mb-[111px]">
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
                .slide-left { animation: slideLeft 0.3s forwards; }
                .slide-right { animation: slideRight 0.3s forwards; }
                .slide-in-left { animation: slideInLeft 0.3s forwards; }
                .slide-in-right { animation: slideInRight 0.3s forwards; }
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
                .nav-button:hover { background-color: rgba(255, 255, 255, 0.9); }
                .nav-button-left { left: 10px; }
                .nav-button-right { right: 10px; }
                .dimmed {
                    opacity: 0.4;
                    pointer-events: none;
                }
                .disabled-nav {
                    opacity: 0.3;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            `}</style>

      <div className="mx-[-22px] sticky top-0 z-50 block sm:hidden">
        <div className="w-full h-[65px] bg-[#DCC38B]">
          <Link className="w-full h-full flex items-center gap-[10px] pl-[13px]" to={"/"}>
            <ChevronLeft className="scale-110" />
            <h1 className="font-inter font-[500] text-[15px] leading-[22px] text-black">{productData.name_uz}</h1>
          </Link>
        </div>
      </div>

      {isVisible && notification && (
        <div className={`absolute z-50 left-1 w-full h-auto flex justify-center items-center notification`}>
          <div className="bg-[#fefdfd] drop-shadow-lg w-[750px] h-[100px] flex items-center rounded-md transition-opacity duration-500 ease-in-out opacity-100">
            <div className="ml-[20px] rounded-[5px] overflow-hidden border-[1px] w-[120px] h-[80px] flex justify-center items-center">
              <img
                src={
                  `https://back.stroybazan1.uz${productData.variants[selectedColorIndex].image}` || "/placeholder.svg"
                }
                className="w-[80px] h-[80px] object-contain"
              />
            </div>
            <div className="w-full h-full flex flex-col gap-[5px] mt-[20px] ml-[20px]">
              <h1 className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                Mahsulot savatga qo'shildi
              </h1>
              <h1 className="w-[360px] font-inter font-[400] text-[16px] leading-[22px] text-black">
                {productData.name_uz} {selectedSize}
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

      <h1 className="hidden sm:block font-inter font-[600] text-[20px] leading-[22px] text-black">
        {productData.name_uz}
      </h1>
      <div className="flex flex-col sm:flex-row gap-[20px]">
        <div className="product-div">
          <div className="mt-[20px] flex gap-[19px]">
            <div className="hidden sm:block overflow-y-scroll h-[500px] image-selection-div space-y-[15px]">
              {productData.variants.map((variant, index) => (
                <div
                  key={index}
                  className={`border-[3px] ${selectedColorIndex === index ? "border-[rgba(190,160,134,1)]" : "border-transparent"} overflow-hidden w-[158px] h-[156px] bg-[rgba(242,242,241,1)] rounded-[15px] flex justify-center items-center cursor-pointer ${!isCurrentSizeVariant(index) ? "dimmed" : ""}`}
                  onClick={() => handleColorClick(index)}
                >
                  <img
                    src={`https://back.stroybazan1.uz${variant.image}` || "/placeholder.svg"}
                    className="w-[158px] h-[156px] object-fill"
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center big-selected-image relative w-full sm:w-[504px] h-[330px] sm:h-[504px] overflow-hidden bg-[rgba(242,242,241,1)] rounded-[15px]">
              <div
                className={`nav-button nav-button-left ${!hasMultipleVariants ? "disabled-nav" : ""}`}
                onClick={handlePrevImage}
              >
                <ChevronLeft size={24} />
              </div>
              <div
                className={`nav-button nav-button-right ${!hasMultipleVariants ? "disabled-nav" : ""}`}
                onClick={handleNextImage}
              >
                <ChevronRight size={24} />
              </div>
              <img
                src={
                  `https://back.stroybazan1.uz${productData.variants[selectedColorIndex].image}` || "/placeholder.svg"
                }
                className={`w-[162px] sm:w-[504px] h-[188px] sm:h-[504px] object-fill ${isTransitioning ? slideDirection : slideDirection ? (slideDirection === "slide-left" ? "slide-in-right" : "slide-in-left") : ""}`}
              />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="mt-[40px] flex flex-col gap-[15px] w-[681px]">
              <h1 className="font-inter font-[600] text-[28px] leading-[22px] text-black">Tasnif</h1>
              <p className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                {productData.description_uz}
              </p>
            </div>
          </div>
        </div>

        <div className="product-details mt-[0px] sm:mt-[20px]">
          <div className="flex flex-col gap-[10px]">
            <h5 className="font-inter font-[600] text-[16px] leading-[22px] text-[rgba(66,206,94,1)]">
              {productData.is_available ? "Mavjud" : "Mavjud emas"}
            </h5>
            <h1 className="font-inter font-[600] text-[24px] leading-[22px] text-black">{productData.name_uz}</h1>
          </div>
          <div className="color-div mt-[7px] flex flex-col gap-[6px]">
            <h1 className="font-inter font-[400] text-[13px] leading-[22px] text-black">
              Rang : <span className="font-[500]">{productData?.variants[selectedColorIndex]?.color_uz || "Ko'k"}</span>
            </h1>
            <div className="select-color flex gap-[10px]">
              {productData?.variants?.map((variant, index) => (
                <div
                  key={variant.id}
                  className={`transition-all duration-200 overflow-hidden w-[62px] h-[80px] flex justify-center items-center rounded-[5px] 
                                    ${selectedColorIndex === index ? "border-[1.5px] border-[rgba(190,160,134,1)]" : "border-transparent"} 
                                    bg-[rgba(247,247,246,1)] cursor-pointer ${!isCurrentSizeVariant(index) ? "dimmed" : ""}`}
                  onClick={() => handleColorClick(index)}
                >
                  <img
                    src={`https://back.stroybazan1.uz${variant.image}`}
                    alt={variant.color_uz}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="size-div mt-[20px]">
            <h1 className="font-inter font-[400] text-[13px] leading-[22px] text-[rgba(0,0,0,1)]">
              O'lchami: {selectedSize}
            </h1>
            <div className="sizes flex gap-[10px] mt-[7px] transition-all duration-300 cursor-pointer">
              {uniqueSizes.map((sizeObj, index) => (
                <div
                  key={index}
                  className={`active:scale-[99%] transition-all duration-200 flex justify-center items-center w-[62px] h-[62px] rounded-[5px] 
                                    ${selectedIndex === index ? "border-[rgba(190,160,134,1)] border-[1.5px]" : "border-transparent"} 
                                    bg-[rgba(247,247,246,1)]`}
                  onClick={() => handleSizeClick(sizeObj.size, index)}
                >
                  <span className="font-inter font-[400] text-[16px] leading-[22px] text-black">{sizeObj.size}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[20px]">
            <h1 className="font-inter font-[700] text-[20px] leading-[22px] text-[rgba(0,0,0,1)]">
              {productData.variants[selectedColorIndex].price} so'm
            </h1>
          </div>

          <div className="term-payment mt-[20px]">
            <div className="flex flex-col justify-between w-full py-[10px] px-[12px] h-[87px] rounded-[8px] border-[1px] border-[rgba(213,213,213,1)] bg-[rgba(242,242,241,1)]">
              <div className="w-full h-[26px] rounded-[5px] flex justify-between gap-[3.75px] bg-[rgba(213,213,213,1)]">
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
                  {monthlyPayments[selectedPaymentIndex]} so'm
                </h1>
                <h1 className="font-inter font-[500] text-[10px] leading-[22px] text-[rgba(0,0,0,1)]">
                  x {paymentOptions[selectedPaymentIndex]}
                </h1>
              </div>
            </div>

            <p className="mt-[10px] w-[318px] font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]">
              Siz buyurtmani 3 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.
            </p>

            <div className="payment-options p-[20px] mt-[20px] w-full h-fit rounded-[10px] border-[1px] border-[rgba(213,213,213,1)]">
              <h1 className="font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]">
                Yetkazib berish <span className="font-inter font-[800]">1 kun</span> ichida Agar{" "}
                <span className="font-inter font-[800]">5mln</span> so'mdan ortiq mahsulotga buyurtma bersangiz yetkazib
                berish VODIY bo'ylab be'pul.
              </h1>
              <div className="mt-[20px] w-full h-[1px] bg-[rgba(213,213,213,1)]"></div>
              <h1 className="mt-[20px] font-inter font-[500] text-[12px] leading-[22px] text-[rgba(0,0,0,0.75)]">
                Muddatli to'lovni rasmiylashtirayotganingizda bizdan va hamkorlarimizdan eng ma'qul takliflarga ega
                bo'lishingiz mumkin.
              </h1>
              <div className="flex gap-[15px] mt-[20px]">
                <div className="w-[68px] h-fit rounded-[10px] bg-green-300">
                  <img src={payme_icon || "/placeholder.svg"} />
                </div>
                <div className="w-[68px] h-fit rounded-[10px] bg-green-300">
                  <img src={second_icon || "/placeholder.svg"} />
                </div>
                <div className="w-[68px] h-fit rounded-[10px] bg-green-300">
                  <img src={anorbank_icon || "/placeholder.svg"} />
                </div>
                <div className="w-[68px] h-fit rounded-[10px] bg-green-300">
                  <img src={uzum_icon || "/placeholder.svg"} />
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                className={`mt-[20px] w-full h-[60px] rounded-[10px] bg-[rgba(220,195,139,1)] cursor-pointer hover:bg-[#e9d8b2] transition-all duration-200 font-inter font-[600] text-[15px] leading-[22px] text-[rgba(0,0,0,1)] ${isAnimating ? "animate-circle" : ""}`}
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

