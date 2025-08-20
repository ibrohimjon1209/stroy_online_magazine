"use client"

import { Minus, Plus, Check, ChevronLeft } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import no_basket from './no_basket.png'

export default function Basket_main({ basket, set_formalization_open, lang, set_basket }) {
  const [products, setProducts] = useState(basket)
  const [paymentType, setPaymentType] = useState("immediate")
  const [contentHeight, setContentHeight] = useState("auto")
  const immediateRef = useRef(null)
  const installmentRef = useRef(null)
  const uzs_lang = lang == "uz" ? "so'm" : lang == "en" ? "uzs" : lang == "ru" ? "сум" : "so'm"

  useEffect(() => {
    const savedBasket = localStorage.getItem("basket")
    if (savedBasket) {
      setProducts(JSON.parse(savedBasket))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(products))
  }, [products])

  useEffect(() => {
    setProducts(basket)
  }, [basket])

  useEffect(() => {
    if (products.length === 1 && !products[0].selected) {
      const updatedProducts = [{ ...products[0], selected: true }]
      setProducts(updatedProducts)
      set_basket(updatedProducts)
      localStorage.setItem("basket", JSON.stringify(updatedProducts))
    }
  }, [products, set_basket])

  const allSelected = products.every((product) => product.selected)
  const toggleSelectAll = () => {
    const updated = products.map((product) => ({ ...product, selected: !allSelected }))
    setProducts(updated)
    set_basket(updated)
  }

  const toggleProductSelection = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId && product.size[lang] === size && product.color[lang] === color
          ? { ...product, selected: !product.selected }
          : product
      )
      set_basket(updatedProducts)
      return updatedProducts
    })
  }

  const decreaseQuantity = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((product) => {
          if (product.id === productId && product.size[lang] === size && product.color[lang] === color) {
            const newQuantity = product.quantity - 1
            return newQuantity > 0 ? { ...product, quantity: newQuantity } : null
          }
          return product
        })
        .filter(Boolean)
      set_basket(updatedProducts)
      localStorage.setItem("basket", JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  const increaseQuantity = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId && product.size[lang] === size && product.color[lang] === color
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
      set_basket(updatedProducts)
      localStorage.setItem("basket", JSON.stringify(updatedProducts))
      return updatedProducts
    })
  }

  const totalPrice = products
    .filter((product) => product.selected)
    .reduce((sum, product) => sum + product.price * product.quantity, 0)

  const monthlyPayment = Math.round(totalPrice / 24)

  useEffect(() => {
    const immediateHeight = immediateRef.current?.offsetHeight || 0
    const installmentHeight = installmentRef.current?.offsetHeight || 0
    setContentHeight(`${Math.max(immediateHeight, installmentHeight)}px`)
  }, [totalPrice])

  return (
    <div className="flex flex-col w-full sm:mb-0 mb-21">
      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link className="w-full h-full flex items-center gap-[10px] pl-[13px]" to={"/"}>
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            {lang === "uz" ? "Savatcha" : lang === "en" ? "Basket" : lang === "ru" ? "Корзина" : "Savatcha"}
          </h1>
        </Link>
      </div>

      <div className="w-full mx-auto p-5 sm:p-6 sm:mt-0 mt-16 pt-[20px] sm:pt-[35px]">
        {products.length === 0 ? (
          <div className="w-full mt-[50px] flex flex-col justify-center items-center">
            <img
              src={no_basket}
              alt="No basket"
              className="w-[400px] hover:scale-[103%] transition-all duration-[0.3s]"
            />
            <h1 className="ml-[40px] w-full mt-[10px] text-[25px] text-center text-gray-800 font-[600] font-inter">
              {lang === "uz" ? "Savatchangiz bo'sh" : lang === "en" ? "Your basket is empty" : "Ваша корзина пуста"}
            </h1>
            <h1 className="ml-[40px] w-full mt-[10px] text-[18px] text-center text-gray-700 font-[500] font-inter">
              {lang === "uz"
                ? "Iltimos, mahsulotlarni tanlang"
                : lang === "en"
                  ? "Please select some products"
                  : "Пожалуйста, выберите товары"}
            </h1>
          </div>
        ) : (
          <div className="flex w-[100%] flex-col sm:flex-row lg:flex-row gap-[30px] sm:gap-[100px]">
            <div className="flex-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <button onClick={toggleSelectAll} className="w-[100%] flex items-center justify-between">
                  <h1 className="font-inter font-[600] text-[15px] whitespace-nowrap sm:text-[24px] leading-[22px] text-black">
                    {lang === "uz"
                      ? "Hammasini tanlash"
                      : lang === "en"
                        ? "Select all"
                        : lang === "ru"
                          ? "Выбрать все"
                          : "Hammasini tanlash"}{" "}
                    <span className="hidden sm:inline">
                      {products.length}{" "}
                      {lang == "uz"
                        ? "ta maxsulot"
                        : lang === "en"
                          ? "products"
                          : lang === "ru"
                            ? "продукт"
                            : "ta maxsulot"}
                    </span>
                  </h1>
                  <div
                    className={`w-6 h-6 ${allSelected && products.length > 0 ? "bg-[#DCC38B]" : "bg-gray-200"} rounded-md flex items-center justify-center cursor-pointer`}
                  >
                    {allSelected && products.length > 0 && <Check className="w-4 h-4 text-white" />}
                  </div>
                </button>
              </div>

              {products.map((product) => (
                <div key={`${product.id}-${product.size[lang]}-${product.color[lang]}`} className="flex items-start py-4 sm:py-8">
                  <div className="rounded-[15px] mr-[1px] sm:mr-15 overflow-hidden p-1">
                    <div className="relative w-[90px] h-[90px] sm:w-[150px] sm:h-[150px] flex items-center justify-center">
                      <img src={product.img || "/placeholder.svg"} alt={product.name[lang]} className="object-contain w-full h-full" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2 className="font-inter font-[600] text-[15px] leading-[22px] text-black">{product.name[lang]}</h2>
                      <button
                        onClick={() => toggleProductSelection(product.id, product.size[lang], product.color[lang])}
                        className={`w-6 h-6 ${product.selected ? "bg-[#DCC38B]" : "bg-gray-200"} rounded-md flex items-center justify-center cursor-pointer`}
                      >
                        {product.selected && <Check className="w-4 h-4 text-white" />}
                      </button>
                    </div>
                    <p className="font-inter font-[600] text-[15px] leading-[22px] text-black mt-2">
                      {product.price.toLocaleString()} {uzs_lang}
                    </p>
                    <div className="flex items-center mt-11 sm:mt-15">
                      <button
                        onClick={() => decreaseQuantity(product.id, product.size[lang], product.color[lang])}
                        className="flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="mx-4">{product.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(product.id, product.size[lang], product.color[lang])}
                        className="flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pay now / Installment block */}
            {products.length > 0 && (
              <div className="w-full relative h-[370px] sm:w-[350px] sm:h-[450px] bg-white border border-[#D5D5D5] rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="relative flex p-1 bg-gray-100 rounded-xl">
                    <button
                      onClick={() => setPaymentType("immediate")}
                      className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium cursor-pointer ${
                        paymentType === "immediate" ? "bg-white shadow-sm duration-400" : "text-gray-500"
                      }`}
                    >
                      {lang === "uz" ? "Hoziroq to'lash" : lang === "en" ? "Pay now" : lang === "ru" ? "Сразу" : "Hoziroq to'lash"}
                    </button>
                    <button
                      onClick={() => setPaymentType("installment")}
                      className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium cursor-pointer ${
                        paymentType === "installment" ? "bg-white shadow-sm duration-400" : "text-gray-500"
                      }`}
                    >
                      {lang === "uz" ? "Muddatli to'lov" : lang === "en" ? "Installment" : lang === "ru" ? "Рассрочка" : "Muddatli to'lov"}
                    </button>
                  </div>
                  <div className="relative mt-[20px]" style={{ height: contentHeight }}>
                    <div
                      ref={immediateRef}
                      className={`absolute top-0 left-0 w-full ${paymentType === "immediate" ? "opacity-100 z-10 duration-400" : "opacity-0 z-0"}`}
                    >
                      <div className="flex justify-between items-center font-inter font-[700] text-[16px] leading-[22px] text-black">
                        <span>{lang === "uz" ? "Umumiy" : lang === "en" ? "Total" : lang === "ru" ? "Итого" : "Umumiy"}:</span>
                        <span>{totalPrice.toLocaleString()} {uzs_lang}</span>
                      </div>
                    </div>
                    <div
                      ref={installmentRef}
                      className={`absolute top-0 left-0 w-full ${paymentType === "installment" ? "opacity-100 z-10 duration-400" : "opacity-0 z-0"}`}
                    >
                      <div className="flex justify-between">
                        <h1 className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                          {products.length}{" "}
                          {lang == "uz"
                            ? "ta maxsulot"
                            : lang === "en"
                              ? "products"
                              : lang === "ru"
                                ? "продукт"
                                : "ta maxsulot"}
                        </h1>
                        <p className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                          {totalPrice.toLocaleString()} {uzs_lang}
                        </p>
                      </div>
                      <p className="font-inter font-[500] text-[14px] leading-[22px] text-[#000000BF] mt-[15px]">
                        {lang == "uz"
                          ? "Siz buyurtmani 3 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."
                          : lang == "en"
                            ? "You can purchase an order for a period of 3 to 24 months for a fixed fee."
                            : lang == "ru"
                              ? "Вы можете приобрести заказ на срок от 3 до 24 месяцев за фиксированную плату."
                              : "Siz buyurtmani 3 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."}
                      </p>
                      <div className="flex justify-between items-center font-inter font-[700] text-[16px] leading-[22px] text-black mt-[20%] sm:mt-[50%]">
                        <span>{lang === "uz" ? "Muddatli to'lov" : lang === "en" ? "Installment" : lang === "ru" ? "Рассрочка" : "Muddatli to'lov"}</span>
                        <span>
                          {lang === "uz"
                            ? `${monthlyPayment.toLocaleString()} so'mdan × 24`
                            : lang === "en"
                              ? `${monthlyPayment.toLocaleString()} × 24`
                              : lang === "ru"
                                ? `От ${monthlyPayment.toLocaleString()} Сум × 24`
                                : `${monthlyPayment.toLocaleString()} so'mdan × 24`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={products.length > 0 ? "/formalization" : ""}
                    onClick={() => products.length > 0 && set_formalization_open(true)}
                    className={`sm:w-[87%] w-[90%] absolute flex items-center justify-center py-4 sm:mt-[8%] mt-[5%] ${
                      products.length > 0
                        ? "bg-[#E6D1A7] hover:bg-[#dac59b] cursor-pointer"
                        : "bg-[#c9bb9d] hover:bg-[#cdc2aa] cursor-not-allowed"
                    } rounded-xl font-inter font-[600] text-[15px] leading-[22px] text-black transition-colors duration-300`}
                  >
                    {lang === "uz"
                      ? "Rasmiylashtirish"
                      : lang === "en"
                        ? "Formalization"
                        : lang === "ru"
                          ? "Формализация"
                          : "Rasmiylashtirish"}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
