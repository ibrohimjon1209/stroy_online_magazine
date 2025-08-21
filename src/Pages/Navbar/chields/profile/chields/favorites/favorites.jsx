"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Heart } from "lucide-react"

const Favorites_main = ({ lang }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [likedProducts, setLikedProducts] = useState(() => {
    try {
      const stored = localStorage.getItem("likedProducts")
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error("Could not parse likedProducts from localStorage:", e)
      return []
    }
  })

  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
        ? 1
        : 2

  const uzs_lang = lang === "uz" ? "so'm" : lang === "en" ? "uzs" : lang === "ru" ? "сум" : "so'm"

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`https://backkk.stroybazan1.uz/api/api/products/?branch=${sl_option_id}`)
        const data = await response.json()
        console.log(data)

        const likedIds = likedProducts.map((item) => (typeof item === "object" ? item.product : item))
        const likedOnly = data.filter((product) => likedIds.includes(product.id))
        setProducts(likedOnly)
      } catch (error) {
        console.error("API xatosi:", error)
      } finally {
        setLoading(false)
      }
    }

    getProducts()
  }, [likedProducts])

  const handleLikeToggle = async (productId) => {
    const userId = localStorage.getItem("userId")
    const updatedLikes = likedProducts.filter((fav) =>
      typeof fav === "object" ? fav.product !== productId : fav !== productId,
    )

    if (!userId) {
      // No userId: Update localStorage, remove from products, no API calls
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes))
      setLikedProducts(updatedLikes)
      setProducts(products.filter((product) => product.id !== productId))
      return
    }

    // userId exists: Handle API call if needed
    const favorite = likedProducts.find((fav) => {
      const favProductId = typeof fav === "object" ? fav.product : fav
      return favProductId === productId && (typeof fav === "object" ? fav.user?.toString() === userId : true)
    })

    if (favorite && typeof favorite === "object" && favorite.id) {
      try {
        // You can add delete_favorites API call here if needed
        // await delete_favorites(favorite.id);
      } catch (error) {
        console.error("DELETE xatosi:", error)
      }
    }

    // Update localStorage and state
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes))
    setLikedProducts(updatedLikes)
    setProducts(products.filter((product) => product.id !== productId))
  }

  return (
    <div className="w-full sm:mx-15">
      {loading ? (
        <div className="flex justify-center items-center w-full h-[200px]">
          <div className="loader"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="mt-[10px] mb-[40px] w-full flex flex-wrap justify-between sm:gap-x-[40px]">
          {products.map((product) => (
            <div key={product.id} className="w-[150px] h-[235px] sm:h-[280px] cursor-pointer hover:shadow-xs">
              <Link to={`/product/${product.id}`}>
                <div className="w-full h-[150px] sm:h-[150px] aspect-square rounded-[10px] bg-[#F2F2F1] flex justify-center items-center overflow-hidden group">
                  <img
                    src={`https://backkk.stroybazan1.uz/${product.image}`}
                    className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
                    alt={product.name_uz}
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-[8px] sm:gap-[4px] p-2">
                <Link to={`/product/${product.id}`}>
                  <h1 className="font-inter font-[600] text-[11px] sm:text-[15px] text-black truncate">
                    {product[`name_${lang}`]}
                  </h1>
                </Link>
                <div className="flex items-center justify-between gap-3">
                  <Link to={`/product/${product.id}`}>
                    <p className="font-inter whitespace-nowrap font-[500] text-[11px] sm:text-[13px] text-black">
                      {product.variants && product.variants.length > 0 && product.variants[0].price
                        ? `${
                            lang === "uz" ? "Narxi" : lang === "en" ? "Price" : lang === "ru" ? "Цена" : "Narxi"
                          }: ${Number.parseFloat(product.variants[0].price).toFixed(2)} ${uzs_lang}`
                        : lang == "uz"
                          ? "Narxi mavjud emas"
                          : lang == "en"
                            ? "Price not found"
                            : lang == "ru"
                              ? "Цена не найдена"
                              : "Narxi mavjud emas"}
                    </p>
                  </Link>

                  <div className="flex items-center mr-2">
                    <Heart
                      className="w-[16px] h-[16px] sm:w-[25px] text-[#FF0000] sm:h-[25px] object-contain cursor-pointer"
                      fill="#FF0000"
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
      ) : (
        <p className="w-full text-lg text-center text-gray-500 font-inter">
          {lang == "uz"
            ? "Sevimlilar yo'q"
            : lang == "en"
              ? "Favorites not found"
              : lang == "ru"
                ? "Избранное не найдено"
                : "Sevimlilar yo'q"}
        </p>
      )}
    </div>
  )
}

export default Favorites_main
