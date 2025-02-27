import { Minus, Plus, Check } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import photo from "./photo.png"

export default function Basket_main() {
  const [products, setProducts] = useState([
    { id: 1, name: "PENOPLEX COMFORT", price: 125650, quantity: 1, selected: true },
    { id: 2, name: "PENOPLEX COMFORT", price: 125650, quantity: 1, selected: true },
  ])

  const [paymentType, setPaymentType] = useState("immediate")
  const [contentHeight, setContentHeight] = useState("auto")
  const immediateRef = useRef(null)
  const installmentRef = useRef(null)

  const allSelected = products.every((product) => product.selected)
  const toggleSelectAll = () => {
    setProducts(products.map((product) => ({ ...product, selected: !allSelected })))
  }

  const toggleProductSelection = (productId) => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, selected: !product.selected } : product)))
  }

  const increaseQuantity = (productId) => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, quantity: product.quantity + 1 } : product)))
  }

  const decreaseQuantity = (productId) => {
    setProducts(products.map((product) => (product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product)))
  }

  const totalPrice = products.filter((product) => product.selected).reduce((sum, product) => sum + product.price * product.quantity, 0)
  const monthlyPayment = Math.round(totalPrice / 24)

  useEffect(() => {
    const immediateHeight = immediateRef.current?.offsetHeight || 0
    const installmentHeight = installmentRef.current?.offsetHeight || 0
    setContentHeight(`${Math.max(immediateHeight, installmentHeight)}px`)
  }, [totalPrice])

  return (
    <div className="w-full mx-auto p-6 pt-[35px]">
      <div className="flex w-[100%] flex-col lg:flex-row gap-[100px]">
        <div className="flex-1">
          <div className="flex items-center mb-6">
            <button onClick={toggleSelectAll} className="w-[100%] flex items-center justify-between">
              <h1 className="font-inter font-[600] text-[24px] leading-[22px] text-black">Hammasini tanlash ({products.length} ta maxsulot)</h1>
              <div className={`w-6 h-6 ${allSelected ? "bg-[#DCC38B]" : "bg-gray-200"} rounded-md flex items-center justify-center cursor-pointer`}>
                {allSelected && <Check className="w-4 h-4 text-white" />}
              </div>
            </button>
          </div>
          {products.map((product) => (
            <div key={product.id} className="flex items-start py-8">
              <div className="bg-gray-100 p-4 rounded-[15px] mr-15">
                <div className="relative w-[150px] h-[150px] flex items-center justify-center">
                  <img src={photo} alt={product.name} width={96} height={96} className="object-contain w-[120px] h-[120px]" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h2 className="font-inter font-[600] text-[15px] leading-[22px] text-black">{product.name}</h2>
                  <button onClick={() => toggleProductSelection(product.id)} className={`w-6 h-6 ${product.selected ? "bg-[#DCC38B]" : "bg-gray-200"} rounded-md flex items-center justify-center cursor-pointer`}>
                    {product.selected && <Check className="w-4 h-4 text-white" />}
                  </button>
                </div>
                <p className="font-inter font-[600] text-[15px] leading-[22px] text-black mt-2">{product.price.toLocaleString()} so'm</p>
                <div className="flex items-center mt-15">
                  <button onClick={() => decreaseQuantity(product.id)} className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer" disabled={product.quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)} className="w-8 h-8 border rounded-md flex items-center justify-center cursor-pointer">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[350px] h-[450px] bg-white border border-[#D5D5D5] rounded-2xl p-6 flex flex-col justify-between">
        <div>
          <div className="relative flex p-1 bg-gray-100 rounded-xl">
            <button onClick={() => setPaymentType("immediate")} className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium cursor-pointer ${paymentType === "immediate" ? "bg-white shadow-sm duration-400" : "text-gray-500"}`}>
              Hoziroq to'lash
            </button>
            <button onClick={() => setPaymentType("installment")} className={`flex-1 py-2.5 text-center rounded-lg text-sm font-medium cursor-pointer ${paymentType === "installment" ? "bg-white shadow-sm duration-400" : "text-gray-500"}`}>
              Muddatli to'lov
            </button>
          </div>
          <div className="relative mt-[20px]" style={{ height: contentHeight }}>
            <div ref={immediateRef} className={`absolute top-0 left-0 w-full ${paymentType === "immediate" ? "opacity-100 z-10 duration-400" : "opacity-0 z-0"}`}>
              <div className="flex justify-between items-center font-inter font-[700] text-[16px] leading-[22px] text-black">
                <span>Umumiy:</span>
                <span>{totalPrice.toLocaleString()} so'm</span>
              </div>
            </div>
            <div ref={installmentRef} className={`absolute top-0 left-0 w-full ${paymentType === "installment" ? "opacity-100 z-10 duration-400" : "opacity-0 z-0"}`}>
          <div className="flex justify-between">
          <h1 className="font-inter font-[500] text-[16px] leading-[22px] text-black">{products.length} ta maxsulot</h1>
          <p className="font-inter font-[500] text-[16px] leading-[22px] text-black">{totalPrice.toLocaleString()}so'm</p>
          </div>
              <p className="font-inter font-[500] text-[14px] leading-[22px] text-[#000000BF] mt-[15px]">Siz buyurtmani 3 oydan 24 oygacha muddatli to'lov evaziga xarid qilishingiz mumkin.</p>
              <div className="flex justify-between items-center font-inter font-[700] text-[16px] leading-[22px] text-black mt-[50%]">
                <span>Muddatli to'lov</span>
                <span>{monthlyPayment.toLocaleString()} so'mdan × 24</span>
              </div>
            </div>
          </div>
          </div>
          <button className="w-full py-4 bg-[#E6D1A7] rounded-xl font-inter font-[600] text-[15px] leading-[22px] text-black hover:bg-[#dac59b] transition-colors cursor-pointer duration-300">
            Rasmiylashtirish
          </button>
        </div>
      </div>
    </div>
  )
}
