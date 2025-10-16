"use client"

import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"
import logo from "./Images/logo_mobile.svg"
import logo2 from "../Enter/Images/photo_1.png"
import logo3 from "../Enter/Images/photo_3.png"
import Carusel from "./Carusel"
import { Search, CirclePlus, Heart, History, X, Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"
import Download_page from "./Download"
import { products_get } from "../../Services/products_get"
import create_favorites from "../../Services/favorites/create_favorites"
import delete_favorites from "../../Services/favorites/delete_favorites"
import like_icon from "./Images/like_a.svg"

const getStoredTopics = () => {
  try {
    const item = localStorage.getItem("searchTopics")
    return item ? JSON.parse(item) : []
  } catch (error) {
    return []
  }
}

function VideoPlayer({ video, onEnded, autoplay = false }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const controlsTimeoutRef = useRef(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onEnded) onEnded()
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("ended", handleEnded)
    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)

    if (autoplay) {
      videoElement.play().catch((err) => console.log("[v0] Autoplay prevented:", err))
    }

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("ended", handleEnded)
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
    }
  }, [autoplay, onEnded])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      if (newVolume === 0) {
        setIsMuted(true)
      } else if (isMuted) {
        setIsMuted(false)
      }
    }
  }

  const handleProgressChange = (e) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false)
      }
    }, 3000)
  }

  return (
    <div
      className="relative w-full sm:h-[600px] h-[170px] bg-black rounded-lg overflow-hidden group"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={video.video}
        className="w-full h-full object-contain cursor-pointer"
        onClick={togglePlay}
        playsInline
      />

      {/* Controls overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 sm:p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <div className="mb-2 sm:mb-3">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-1 sm:h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#DCC38B]"
            style={{
              background: `linear-gradient(to right, #DCC38B 0%, #DCC38B ${(currentTime / duration) * 100}%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`,
            }}
          />
          <div className="flex justify-between text-white text-[10px] sm:text-xs mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={togglePlay} className="text-white hover:text-[#DCC38B] transition-colors p-1 sm:p-2">
              {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            <button onClick={toggleMute} className="text-white hover:text-[#DCC38B] transition-colors p-1 sm:p-2">
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-12 sm:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-[#DCC38B] hidden sm:block"
            />
          </div>

          {video.title && (
            <div className="flex-1 text-center hidden sm:block">
              <h3 className="text-white text-sm sm:text-base font-medium truncate">{video.title}</h3>
            </div>
          )}

          <button onClick={toggleFullscreen} className="text-white hover:text-[#DCC38B] transition-colors p-1 sm:p-2">
            <Maximize className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>

      {/* Play button overlay when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <button
            onClick={togglePlay}
            className="bg-[#DCC38B] hover:bg-[#c9b077] rounded-full p-4 sm:p-6 transition-all transform hover:scale-110"
          >
            <Play className="w-8 h-8 sm:w-12 sm:h-12 text-black" fill="black" />
          </button>
        </div>
      )}
    </div>
  )
}

function Home({ lang, setSearchText, searchText }) {
  const styles = {
    loader: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #DCC38B",
      borderRadius: "50%",
      width: "50px",
      height: "50px",
      animation: "spin 1s linear infinite",
      margin: "0 auto",
    },
    scrollbarHide: {
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      WebkitScrollbar: {
        display: "none",
      },
    },
    searchModal: {
      transform: "translateY(-10px)",
      opacity: 0,
      transition: "all 0.3s ease-in-out",
    },
    searchModalActive: {
      transform: "translateY(0)",
      opacity: 1,
    },
  }

  useEffect(() => {
    const styleSheet = document.createElement("style")
    styleSheet.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `
    document.head.appendChild(styleSheet)
    return () => document.head.removeChild(styleSheet)
  }, [])

  const inputRef = useRef(null)
  const [selectedBranch, setSelectedBranch] = useState(localStorage.getItem("sl_option_nav") || "Stroy Baza №1")

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search_topics, setSearchTopics] = useState(getStoredTopics())
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(25)
  const [likedProducts, setLikedProducts] = useState(() => {
    try {
      const savedLikes = localStorage.getItem("likedProducts")
      return savedLikes ? JSON.parse(savedLikes) : []
    } catch (error) {
      console.error("Could not parse likedProducts from localStorage:", error)
      return []
    }
  })

  const [searchAnimation, setSearchAnimation] = useState(false)
  const [categoryAnimation, setCategoryAnimation] = useState(false)
  const [isCategoryOpen, set_is_category_open] = useState(false)

  const [videos, setVideos] = useState([])
  const [videosLoading, setVideosLoading] = useState(true)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const videoRefs = useRef([])

  const uzs_lang = lang === "uz" ? "so'm" : lang === "en" ? "uzs" : lang === "ru" ? "сум" : "so'm"

  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
        ? 1
        : 2

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("https://backkk.stroybazan1.uz/api/api/videos/")
        const data = await response.json()
        setVideos(data)
        setVideosLoading(false)
      } catch (error) {
        console.error("[v0] Error fetching videos:", error)
        setVideosLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleVideoEnd = (index) => {
    if (index < videos.length - 1) {
      const nextIndex = index + 1
      setCurrentVideoIndex(nextIndex)

      // Scroll to next video smoothly
      setTimeout(() => {
        if (videoRefs.current[nextIndex]) {
          videoRefs.current[nextIndex].scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }, 500)
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await products_get(sl_option_id)
        const availableProducts = (response || []).filter(
          (product) =>
            product.is_available === true && product.variants?.some((variant) => variant.is_available === true),
        )
        setProducts(availableProducts)
        setFilteredProducts(availableProducts)
      } catch (error) {
        console.error("API xatosi:", error)
      } finally {
        setLoading(false)
      }
    }
    getProducts()
  }, [sl_option_id])

  useEffect(() => {
    if (searchText.trim()) {
      const filtered = products.filter((product) =>
        product[`name_${lang}`].toLowerCase().includes(searchText.toLowerCase()),
      )
      setLoading(true)
      setCurrentPage(1)
      setTimeout(() => {
        setFilteredProducts(filtered)
        setLoading(false)
      }, 1000)
    } else {
      setLoading(true)
      setCurrentPage(1)
      setTimeout(() => {
        setFilteredProducts(products)
        setLoading(false)
      }, 1000)
    }
  }, [searchText, products, lang])

  const handleSearchClick = () => {
    setIsSearchOpen((prev) => !prev)
    if (!isSearchOpen) {
      setTimeout(() => setSearchAnimation(true), 10)
    }
  }

  const handleLikeToggle = async (productId) => {
    const userId = localStorage.getItem("userId")
    const isLiked = likedProducts.some((fav) => fav.product === productId)

    let updatedLikes

    if (!userId) {
      if (isLiked) {
        updatedLikes = likedProducts.filter((fav) => fav.product !== productId)
      } else {
        updatedLikes = [...likedProducts, { product: productId }]
      }
      localStorage.setItem("likedProducts", JSON.stringify(updatedLikes))
      setLikedProducts(updatedLikes)
      return
    }

    if (isLiked) {
      updatedLikes = likedProducts.filter((fav) => fav.product !== productId)
      const favorite = likedProducts.find((fav) => fav.product === productId && fav.user.toString() === userId)
      if (favorite) {
        try {
          await delete_favorites(favorite.id)
        } catch (error) {
          console.error("DELETE xatosi:", error)
        }
      }
    } else {
      updatedLikes = [...likedProducts, { user: Number.parseInt(userId), product: productId }]
      try {
        const newFav = await create_favorites(productId, userId)
        if (!newFav || !newFav.product) {
          console.error("POST xatosi: Yangi like qo'shishda xatolik")
          return
        }
      } catch (error) {
        const errMsg = error?.response?.data?.non_field_errors?.[0]
        if (error.response?.status === 400 && errMsg === "The fields user, product must make a unique set.") {
          console.warn("Bu mahsulot allaqachon like qilingan, frontendda like sifatida saqlayapmiz.")
        } else {
          console.error("POST xatosi:", error)
          return
        }
      }
    }

    localStorage.setItem("likedProducts", JSON.stringify(updatedLikes))
    setLikedProducts(updatedLikes)
  }

  const handleBranchClick = (branchName) => {
    setSelectedBranch(branchName)
    localStorage.setItem("sl_option_nav", branchName)
    window.location.reload()
  }

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...search_topics]
    updatedTopics.splice(index, 1)
    setSearchTopics(updatedTopics)
    localStorage.setItem("searchTopics", JSON.stringify(updatedTopics))
  }

  const handleSelectTopic = (name) => {
    setSearchText(name)
    setSearchAnimation(false)
    setTimeout(() => {
      setIsSearchOpen(false)
    }, 300)
  }

  const handleClickOutside_category = () => {
    setCategoryAnimation(false)
    setTimeout(() => {
      set_is_category_open(false)
    }, 300)
  }

  const handleClickOutside_search = () => {
    setSearchAnimation(false)
    setTimeout(() => {
      setIsSearchOpen(false)
    }, 300)
  }

  const sliderProducts = filteredProducts.slice(0, 8)
  const gridStartIndex = 4
  const currentProducts = filteredProducts.slice(gridStartIndex, gridStartIndex + currentPage * itemsPerPage)
  const hasMoreProducts = gridStartIndex + currentPage * itemsPerPage < filteredProducts.length

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  const getFirstAvailableVariant = (product) => {
    return product.variants.find((variant) => variant.is_available === true) || product.variants[0]
  }

  return (
    <div>
      <div className="w-full h-[220px] sm:h-[0px]">
        <div className="w-full h-[150px] flex flex-col items-center bg-[#DCC38B] sm:hidden">
          <img
            src={sl_option_id == 0 ? logo : sl_option_id == 1 ? logo2 : logo3}
            className={sl_option_id == 2 ? "h-[71px] mt-[10px]" : "w-[77px] h-[71px] mt-[10px]"}
            alt="Logo"
          />
          <div className="w-full flex gap-[9px] justify-center px-[20px] items-center">
            <div className="w-[90%] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[10px] flex items-center mt-4">
              <Search className="cursor-pointer" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder="Search"
                className="w-full border-none pl-[15px] pr-[20px] focus:outline-none"
                ref={inputRef}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  e.key == "Enter" && handleSearchClick()
                }}
              />
              {searchText && (
                <CirclePlus
                  className="rotate-[45deg] mr-[15px] cursor-pointer"
                  strokeWidth={1.75}
                  onClick={() => setSearchText("")}
                />
              )}
            </div>

            <div className="mt-[15px]">
              <Link to="/profile/favorites">
                <img
                  className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                  src={like_icon || "/placeholder.svg"}
                  alt="likes"
                />
              </Link>
            </div>
          </div>
          {isSearchOpen && (
            <div
              className="absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]"
              onClick={handleClickOutside_search}
            >
              <div
                style={{
                  ...styles.searchModal,
                  ...(searchAnimation ? styles.searchModalActive : {}),
                }}
                className="w-[520px] h-fit ml-[160px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[5px] shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                {search_topics.length > 0 ? (
                  search_topics.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectTopic(item)}
                      className="cursor-pointer w-full h-[52px] pl-[24px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100"
                    >
                      <div className="flex gap-[15px] cursor-pointer">
                        <History strokeWidth={1.75} />
                        <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">{item}</h1>
                      </div>
                      <X
                        strokeWidth={1.75}
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteTopic(index)
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full h-[52px] pl-[24px] flex items-center">
                    <h1 className="font-inter font-[500] text-[16px] text-gray-500">
                      {lang == "uz"
                        ? "Qidiruv tarixi bo'm bo'sh"
                        : lang == "en"
                          ? "Search history is empty"
                          : lang == "ru"
                            ? "История поиска пуста"
                            : "Qidiruv tarixi bo'm bo'sh"}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="branches-home px-[22px] block sm:hidden">
          <div className="rounded-[10px] h-[50px] mt-[20px] border-[0.5px] border-[#8879798C] px-[18px] flex items-center justify-between">
            {["Stroy Baza №1", "Giaz Mebel", "Gold Klinker"].map((branch, idx) => (
              <div
                key={idx}
                onClick={() => handleBranchClick(branch)}
                className={`font-inter font-[500] text-[13px] leading-[22px] cursor-pointer ${
                  selectedBranch === branch ? "text-[#DA9700]" : "text-[#0D1218]"
                }`}
              >
                {branch}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Carusel />

      <div className="popular sm:mt-[60px] mt-[25px] w-full px-[15px] sm:px-[77px] mb-[100px]">
        <div className="videos-div sm:mt-[60px] mt-[25px] px-0 sm:px-[50px]">
          <h1 className="text-[17px] sm:text-[22px] font-semibold mb-4">
            {lang === "uz" ? "Videolar" : lang === "en" ? "Videos" : lang === "ru" ? "Видео" : "Videolar"}
          </h1>

          {videosLoading ? (
            <div className="w-full sm:h-[600px] h-[170px] bg-gray-200 rounded-lg flex justify-center items-center">
              <div style={styles.loader}></div>
            </div>
          ) : videos.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {videos.map((video, index) => (
                <div key={video.id} ref={(el) => (videoRefs.current[index] = el)} className="w-full">
                  <VideoPlayer
                    video={video}
                    onEnded={() => handleVideoEnd(index)}
                    autoplay={index === currentVideoIndex}
                  />
                  {video.title && (
                    <h3 className="text-black font-semibold text-[14px] sm:text-[18px] mt-2 sm:mt-3">{video.title}</h3>
                  )}
                  {video.description && (
                    <p className="text-gray-600 text-[12px] sm:text-[14px] mt-1">{video.description}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full sm:h-[600px] h-[170px] bg-gray-200 rounded-lg flex justify-center items-center">
              <p className="text-gray-500 text-[14px] sm:text-[18px]">
                {lang === "uz"
                  ? "Videolar topilmadi"
                  : lang === "en"
                    ? "No videos found"
                    : lang === "ru"
                      ? "Видео не найдены"
                      : "Videolar topilmadi"}
              </p>
            </div>
          )}
        </div>

        <h1 className="text-[17px] sm:text-[22px] font-semibold mt-6">
          {lang === "uz"
            ? "Ommabop tavarlar"
            : lang === "en"
              ? "Popular products"
              : lang === "ru"
                ? "Популярные товары"
                : "Ommabop tavarlar"}
        </h1>

        <div className="relative overflow-hidden mb-1 mt-[10px]">
          <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {loading ? (
              <div className="flex justify-center mx-auto items-center scale-[70%] sm:scale-[100%] w-[200%] h-[130px] sm:w-[500%] sm:h-[400px]">
                <div style={styles.loader}></div>
              </div>
            ) : sliderProducts.length > 0 ? (
              sliderProducts.map((product, index) => {
                const variant = getFirstAvailableVariant(product)
                if (!variant.is_available) return null
                return (
                  <div key={`slider-${index}`} className="flex-none w-[160px] sm:w-[245px] snap-start">
                    <Link to={`/product/${product.id}`}>
                      <div className="rounded-[10px] w-[160px] h-[160px] border-[0px] sm:w-[245px] sm:h-[245px] bg-[#F2F2F1] overflow-hidden group">
                        <img
                          src={`https://backkk.stroybazan1.uz/${variant.image || product.image}`}
                          className="object-cover w-full h-full transition-transform group-hover:scale-105"
                          alt={product[`name_${lang}`]}
                        />
                      </div>
                      <div className="flex flex-row items-end w-[160px] sm:w-[245px] justify-between mt-1.5 px-3">
                        <div className="flex flex-col sm:gap-1">
                          <h1 className="text-black truncate font-semibold text-[14px] sm:text-[16px] max-w-[120px] sm:max-w-[180px]">
                            {product[`name_${lang}`]}
                          </h1>
                          <p className="text-black text-[12px] sm:text-[14px] max-w-[120px] sm:max-w-[180px] truncate">
                            {variant.price
                              ? `${
                                  lang === "uz" ? "Narxi" : lang === "en" ? "Price" : lang === "ru" ? "Цена" : "Narxi"
                                }: ${Number.parseFloat(variant.price).toFixed(2)} ${uzs_lang}`
                              : lang === "uz"
                                ? "Narxi mavjud emas"
                                : lang === "en"
                                  ? "Price not available"
                                  : lang === "ru"
                                    ? "Цена не доступна"
                                    : "Narxi mavjud emas"}
                          </p>
                        </div>
                        <Heart
                          className="w-[19px] h-[19px] sm:w-[28px] sm:h-[28px] text-[#FF0000] cursor-pointer mb-0.5"
                          fill={likedProducts.some((fav) => fav.product === product.id) ? "#FF0000" : "none"}
                          onClick={(e) => {
                            e.preventDefault()
                            handleLikeToggle(product.id)
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                )
              })
            ) : null}
          </div>
        </div>

        <div className="bg-black h-[1px] w-full"></div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[15px] gap-y-[20px] mt-3">
          {loading ? (
            <div className="flex justify-center mx-auto items-center scale-[70%] sm:scale-[100%] w-[200%] h-[130px] sm:w-[500%] sm:h-[400px]">
              <div style={styles.loader}></div>
            </div>
          ) : currentProducts.length > 0 ? (
            currentProducts.map((product, index) => {
              const variant = getFirstAvailableVariant(product)
              if (!variant.is_available) return null
              return (
                <div key={`grid-${gridStartIndex + index}`} className="cursor-pointer">
                  <Link to={`/product/${product.id}`}>
                    <div className="rounded-[10px] w-full aspect-square bg-[#F2F2F1] overflow-hidden group">
                      <img
                        src={`https://backkk.stroybazan1.uz/${variant.image || product.image}`}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                        alt={product[`name_${lang}`]}
                      />
                    </div>
                    <div className="flex flex-row items-end w-full justify-between mt-1.5 px-1">
                      <div className="flex flex-col flex-1 min-w-0 pr-2 sm:gap-1">
                        <h1 className="text-black truncate font-semibold text-[14px] sm:text-[16px] w-full">
                          {product[`name_${lang}`]}
                        </h1>
                        <p className="text-black text-[12px] sm:text-[14px] truncate w-full">
                          {variant.price
                            ? `${
                                lang === "uz" ? "Narxi" : lang === "en" ? "Price" : lang === "ru" ? "Цена" : "Narxi"
                              }: ${Number.parseFloat(variant.price).toFixed(2)} ${uzs_lang}`
                            : lang === "uz"
                              ? "Narxi mavjud emas"
                              : lang === "en"
                                ? "Price not available"
                                : lang === "ru"
                                  ? "Цена не доступна"
                                  : "Narxi mavjud emas"}
                        </p>
                      </div>
                      <Heart
                        className="w-[19px] h-[19px] sm:w-[28px] sm:h-[28px] text-[#FF0000] cursor-pointer mb-0.5 flex-shrink-0 ml-2"
                        fill={likedProducts.some((fav) => fav.product === product.id) ? "#FF0000" : "none"}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLikeToggle(product.id)
                        }}
                      />
                    </div>
                  </Link>
                </div>
              )
            })
          ) : (
            <div className="flex justify-center mx-auto items-center scale-[70%] sm:scale-[100%] w-[200%] h-[130px] sm:w-[500%] sm:h-[400px]">
              <div style={styles.loader}></div>
            </div>
          )}
        </div>

        {!loading && hasMoreProducts && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-[#DCC38B] cursor-pointer hover:bg-[#c9b077] text-black font-semibold py-3 px-8 rounded-[10px] transition-colors duration-200"
            >
              {lang === "uz"
                ? "Yana ko'rsatish"
                : lang === "en"
                  ? "Show More"
                  : lang === "ru"
                    ? "Показать еще"
                    : "Yana ko'rsatish"}
            </button>
          </div>
        )}
      </div>

      <Download_page />
    </div>
  )
}

export default Home
