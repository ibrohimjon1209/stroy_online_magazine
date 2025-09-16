import { Minus, Plus, Check, ChevronLeft, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import no_basket from "./no_basket.png";

export default function Basket_main({
  basket,
  set_formalization_open,
  lang,
  set_basket,
}) {
  const [products, setProducts] = useState(basket);
  const [paymentType, setPaymentType] = useState("immediate");
  const [contentHeight, setContentHeight] = useState("auto");
  const immediateRef = useRef(null);
  const installmentRef = useRef(null);
  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
        ? 1
        : 2;
  const uzs_lang =
    lang == "uz"
      ? "so'm"
      : lang == "en"
        ? "uzs"
        : lang == "ru"
          ? "сум"
          : "so'm";

  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) {
      const parsed_basket = JSON.parse(savedBasket);
      setProducts(parsed_basket);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    setProducts(basket);
  }, [basket]);

  useEffect(() => {
    if (products.length === 1 && !products[0].selected) {
      const updatedProducts = [{ ...products[0], selected: true }];
      setProducts(updatedProducts);
      set_basket(updatedProducts);
      localStorage.setItem("basket", JSON.stringify(updatedProducts));
    }
  }, [products, set_basket]);
  const visibleProducts = products.filter(
    (item) => item.branch_id == sl_option_id
  );

  const allSelected = visibleProducts.every((product) => product.selected);

  const toggleSelectAll = () => {
    const updated = products.map((product) =>
      product.branch_id == sl_option_id
        ? { ...product, selected: !allSelected }
        : product
    );
    setProducts(updated);
    set_basket(updated);
  };

  const toggleProductSelection = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId &&
          product.size[lang] === size &&
          product.color[lang] === color
          ? { ...product, selected: !product.selected }
          : product
      );
      set_basket(updatedProducts);
      return updatedProducts;
    });
  };

  const deleteQuantity = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((product) => {
          if (
            product.id === productId &&
            product.size[lang] === size &&
            product.color[lang] === color
          ) {
            const newQuantity = product.quantity = 0;
            return newQuantity > 0
              ? { ...product, quantity: newQuantity }
              : null;
          }
          return product;
        })
        .filter(Boolean);
      set_basket(updatedProducts);
      localStorage.setItem("basket", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const decreaseQuantity = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts
        .map((product) => {
          if (
            product.id === productId &&
            product.size[lang] === size &&
            product.color[lang] === color
          ) {
            const newQuantity = product.quantity - 1;
            return newQuantity > 0
              ? { ...product, quantity: newQuantity }
              : null;
          }
          return product;
        })
        .filter(Boolean);
      set_basket(updatedProducts);
      localStorage.setItem("basket", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const increaseQuantity = (productId, size, color) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === productId &&
          product.size[lang] === size &&
          product.color[lang] === color
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      set_basket(updatedProducts);
      localStorage.setItem("basket", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const totalPrice = visibleProducts
    .filter((product) => product.selected)
    .reduce((sum, product) => sum + product.price * product.quantity, 0);

  const monthlyPayment = Math.round(totalPrice / 24);

  useEffect(() => {
    const immediateHeight = immediateRef.current?.offsetHeight || 0;
    const installmentHeight = installmentRef.current?.offsetHeight || 0;
    setContentHeight(`${Math.max(immediateHeight, installmentHeight)}px`);
  }, [totalPrice]);

  const handleQuantityChange = (id, size, color, newQuantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === id && p.size[lang] === size && p.color[lang] === color
          ? { ...p, quantity: Number(newQuantity ? newQuantity : 1) }
          : p
      )
    );
  };

  const hasSelectedProducts = visibleProducts.some((p) => p.selected);

  return (
    <div className="flex flex-col w-full sm:mb-0 mb-21">
      <div className="w-full fixed z-50 h-[65px] bg-[#DCC38B] sm:hidden block">
        <Link
          className="w-full h-full flex items-center gap-[10px] pl-[13px]"
          to={"/"}
        >
          <ChevronLeft className="scale-110" />
          <h1 className="font-inter font-[500] text-[17px] leading-[22px] text-black">
            {lang === "uz"
              ? "Savatcha"
              : lang === "en"
                ? "Basket"
                : lang === "ru"
                  ? "Корзина"
                  : "Savatcha"}
          </h1>
        </Link>
      </div>

      <div className="w-full mx-auto p-5 sm:p-6 sm:mt-0 mt-16 pt-[20px] sm:pt-[35px]">
        {visibleProducts.length == 0 ? (
          <div className="w-full mt-[50px] mb-[6%] flex flex-col justify-center items-center">
            <img
              src={no_basket}
              alt="No basket"
              className="w-[400px] hover:scale-[103%] transition-all duration-[0.3s]"
            />
            <h1 className="ml-[40px] w-full mt-[10px] text-[25px] text-center text-gray-800 font-[600] font-inter">
              {lang === "uz"
                ? "Savatchangiz bo'sh"
                : lang === "en"
                  ? "Your basket is empty"
                  : "Ваша корзина пуста"}
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
                <button
                  onClick={toggleSelectAll}
                  className="w-[100%] flex items-center justify-between"
                >
                  <h1 className="font-inter font-[600] text-[15px] whitespace-nowrap sm:text-[24px] leading-[22px] text-black">
                    {lang === "uz"
                      ? "Hammasini tanlash"
                      : lang === "en"
                        ? "Select all"
                        : lang === "ru"
                          ? "Выбрать все"
                          : "Hammasini tanlash"}{" "}
                    <span className="hidden sm:inline">
                      {visibleProducts.length}{" "}
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
                    className={`sm:w-6 sm:h-6 w-5 h-5 ${allSelected && products.length > 0
                      ? "bg-[#DCC38B]"
                      : "bg-gray-300"
                      } rounded-md flex items-center border border-gray-500 justify-center cursor-pointer`}
                  >
                    {allSelected && products.length > 0 && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </button>
              </div>

              {visibleProducts.map((product) => (
                <div
                  key={`${product.id}-${product.size[lang]}-${product.color[lang]}`}
                  className="flex items-start py-4 my-5 border border-gray-400 sm:py-8 rounded-[15px] sm:px-10 px-4"
                >
                  <div className="rounded-[15px] mr-[10px] sm:mr-15 overflow-hidden p-1">
                    <div className="relative w-[90px] h-[90px] sm:w-[145px] sm:h-[145px] flex items-center justify-center">
                      <img
                        src={product.img || "/placeholder.svg"}
                        alt={product.name[lang]}
                        className="object-cover w-full h-full transition-transform rounded-[15px] hover:scale-105 border cursor-pointer"
                        onClick={() =>
                          (window.location.href = `/product/${product.id}`)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h2
                        className="font-inter font-[600] text-[14px] sm:mt-0 mt-2 sm:text-[17px] leading-[18px] sm:leading-[22px] text-black cursor-pointer hover:underline"
                        onClick={() => {
                          window.location.href = `/product/${product.id}`;
                        }}
                      >
                        {product.name[lang]}
                      </h2>
                      <div className="selection-div">
                        <button
                          onClick={() =>
                            toggleProductSelection(
                              product.id,
                              product.size[lang],
                              product.color[lang]
                            )
                          }
                          className={`sm:w-6 sm:h-6 w-5 h-5 ${product.selected ? "bg-[#DCC38B]" : "bg-gray-300"
                            } rounded-md flex items-center justify-center border border-gray-500 cursor-pointer sm:mr-0`}
                        >
                          {product.selected && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>


                      </div>
                    </div>
                    <p className="font-inter font-[600] text-[16px] mt-2">
                      {lang == "uz"
                        ? "O'lchami"
                        : lang == "en"
                          ? "Size"
                          : "Размер"}
                      : {product.size[lang]}
                    </p>
                    <p className="font-inter font-[600] text-[16px] leading-[22px] text-black mt-2">
                      {product.price.toLocaleString()} {uzs_lang}
                    </p>

                    <div className="flex justify-between ">

                      <div className="flex items-center mt-4 sm:mt-10">
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              product.id,
                              product.size[lang],
                              product.color[lang]
                            )
                          }
                          className="flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <input
                          className="w-16 mx-3 text-center border rounded-md sm:mx-4"
                          type="number"
                          min={1}
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.id,
                              product.size[lang],
                              product.color[lang],
                              e.target.value
                            )
                          }
                        />

                        <button
                          onClick={() =>
                            increaseQuantity(
                              product.id,
                              product.size[lang],
                              product.color[lang]
                            )
                          }
                          className="flex items-center justify-center w-8 h-8 border rounded-md cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>


                      <div className="flex items-end justify-center ">
                        <button
                          onClick={() =>
                            deleteQuantity(
                              product.id,
                              product.size[lang],
                              product.color[lang]
                            )
                          }
                          className={`sm:w-37 sm:h-8.5 w-9 h-7.5 opacity-70 sm:opacity-50 hover:opacity-100  duration-200 overflow-hidden justify-end gap-[8px] rounded-md flex items-center cursor-pointer sm:mr-0`}
                        >
                          <Trash2 />
                          <h1 className="hidden sm:block">{lang == "uz" ? "Yo'q qilish" : lang == "en" ? "Delete" : "Удалить"}</h1>
                        </button>

                      </div>


                    </div>


                  </div>
                </div>
              ))}
            </div>

            {products.length > 0 && (
              <div className="w-full relative h-[370px] sm:w-[350px] sm:h-[450px] bg-white border border-[#D5D5D5] rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="relative flex p-1 bg-gray-100 rounded-xl">
                    <button
                      onClick={() => setPaymentType("immediate")}
                      className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium cursor-pointer ${paymentType === "immediate"
                        ? "bg-white shadow-sm duration-400"
                        : "text-gray-500"
                        }`}
                    >
                      {lang === "uz"
                        ? "Hoziroq to'lash"
                        : lang === "en"
                          ? "Pay now"
                          : lang === "ru"
                            ? "Сразу"
                            : "Hoziroq to'lash"}
                    </button>
                    <button
                      onClick={() => setPaymentType("installment")}
                      className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium cursor-pointer ${paymentType === "installment"
                        ? "bg-white shadow-sm duration-400"
                        : "text-gray-500"
                        }`}
                    >
                      {lang === "uz"
                        ? "Muddatli to'lov"
                        : lang === "en"
                          ? "Installment"
                          : lang === "ru"
                            ? "Рассрочка"
                            : "Muddatli to'lov"}
                    </button>
                  </div>
                  <div
                    className="relative mt-[20px]"
                    style={{ height: contentHeight }}
                  >
                    <div
                      ref={immediateRef}
                      className={`absolute top-0 left-0 w-full ${paymentType === "immediate"
                        ? "opacity-100 z-10 duration-400"
                        : "opacity-0 z-0"
                        }`}
                    >
                      <div className="flex justify-between items-center font-inter font-[700] text-[16px] leading-[22px] text-black">
                        <span>
                          {lang === "uz"
                            ? "Umumiy"
                            : lang === "en"
                              ? "Total"
                              : lang === "ru"
                                ? "Итого"
                                : "Umumiy"}
                          :
                        </span>
                        <span>
                          {totalPrice.toLocaleString()} {uzs_lang}
                        </span>
                      </div>
                    </div>
                    <div
                      ref={installmentRef}
                      className={`absolute top-0 left-0 w-full ${paymentType === "installment"
                        ? "opacity-100 z-10 duration-400"
                        : "opacity-0 z-0"
                        }`}
                    >
                      <div className="flex justify-between">
                        <h1 className="font-inter font-[500] text-[16px] leading-[22px] text-black">
                          {visibleProducts.length}{" "}
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
                      <p className="font-inter font-[500] text-[16px] leading-[22px] text-[#000000BF] mt-[30px]">
                        {lang == "uz"
                          ? "Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."
                          : lang == "en"
                            ? "You can purchase an order for a period of 6 to 24 months for a fixed fee."
                            : lang == "ru"
                              ? "Вы можете приобрести заказ на срок от 6 до 24 месяцев за фиксированную плату."
                              : "Siz buyurtmani 6 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin."}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={hasSelectedProducts ? "/formalization" : "#"}
                    onClick={(e) => {
                      if (hasSelectedProducts) {
                        set_formalization_open(true);
                      } else {
                        e.preventDefault();
                      }
                    }}
                    className={`sm:w-[87%] w-[90%] absolute flex items-center justify-center py-4 sm:mt-[35%] mt-[28%] ${hasSelectedProducts
                      ? "bg-[#E6D1A7] hover:bg-[#dac59b] cursor-pointer"
                      : "bg-[#c9bb9d] cursor-not-allowed"
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
  );
}
