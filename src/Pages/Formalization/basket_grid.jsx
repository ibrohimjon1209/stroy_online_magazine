"use client"

import { useState } from "react"

const BasketGrid = ({ basket, lang }) => {
  const [showAll, setShowAll] = useState(false)

  const selectedItems = basket.filter((item) => item.selected)

  const visibleItems = showAll ? selectedItems : selectedItems.slice(0, 8)

  return (
    <div className="flex flex-col gap-8 mx-5 my-8 sm:my-13">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleItems.map((item) => (
          <div
            key={item.id}
            onClick={() => window.location.href = `/product/${item.id}`}
            className="flex flex-col items-center gap-3 p-4 transition-all duration-200 bg-white border border-gray-100 shadow-sm cursor-pointer rounded-xl hover:shadow-md hover:border-gray-200 hover:-translate-y-1"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-20 h-20 shadow-inner bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:w-30 sm:h-30 lg:w-28 lg:h-28">
              <img
                src={item.img || "/placeholder.svg"}
                alt={item.name[lang]}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="w-full space-y-2 text-center">
              <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                <span className="px-1 truncate">{item.name[lang]}</span>
              </h3>
              <div className="space-y-1">
                <p className="text-base font-bold text-green-600 sm:text-lg">
                  {item.price}{" "}
                  <span className="text-xs font-medium text-gray-500 sm:text-sm">
                    {lang === "uz" ? "so'm" : lang === "en" ? "uzs" : lang === "ru" ? "сум" : "so'm"}
                  </span>
                </p>
                <p className="inline-block px-2 py-1 text-xs text-gray-600 rounded-full sm:text-sm bg-gray-50">
                  {item.quantity} {lang === "uz" ? "dona" : lang === "en" ? "piece" : lang === "ru" ? "шт" : "dona"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 8 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="px-8 py-3 mx-auto mt-1 font-semibold transition-all duration-200 border shadow-sm sm:mt-3 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 rounded-xl text-amber-800 hover:shadow-md border-amber-200 hover:border-amber-300"
        >
          {lang === "uz"
            ? "Barchasini ko'rsatish"
            : lang === "en"
              ? "Show all"
              : lang === "ru"
                ? "Показать все"
                : "Barchasini ko'rsatish"}
        </button>
      )}
    </div>
  )
}

export default BasketGrid
