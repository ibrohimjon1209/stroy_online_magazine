import { useState, useRef, useEffect } from "react"
import { Search, CirclePlus, History, X, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import get_categories from "../../Services/category/get_categories"

const getStoredTopics = () => {
  try {
    return JSON.parse(localStorage.getItem("searchTopics")) || []
  } catch (error) {
    return []
  }
}

const Category_mobile = () => {
  const inputRef = useRef(null)
  const [is_search_open, set_is_search_open] = useState(false)
  const [searchAnimation, setSearchAnimation] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [search_topics, setSearchTopics] = useState(getStoredTopics())
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const lang = window.localStorage.getItem("lang") || "uz"
  const sl_option_id =
    localStorage.getItem("sl_option_nav") === "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") === "Giaz Mebel"
      ? 1
      : 2;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const categoriesData = await get_categories()
        const filtered = categoriesData.filter((item) => {
          return item.branch == sl_option_id;
        });
        setCategories(filtered || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const getPlaceholderText = () => {
    return lang === "uz" ? "Kategoriya" : lang === "en" ? "Category" : lang === "ru" ? "Категория" : "Kategoriya"
  }

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...search_topics]
    updatedTopics.splice(index, 1)
    setSearchTopics(updatedTopics)
    localStorage.setItem("searchTopics", JSON.stringify(updatedTopics))
  }

  const handleSearchClick = () => {
    const includes = search_topics.includes(searchText)

    if (is_search_open) {
      setSearchAnimation(false)
      setTimeout(() => {
        set_is_search_open(false)
      }, 300)
    } else {
      if (searchText && !includes) {
        const updatedTopics = [...search_topics, searchText]
        setSearchTopics(updatedTopics)
        localStorage.setItem("searchTopics", JSON.stringify(updatedTopics))
      }
      set_is_search_open(true)
      setTimeout(() => {
        setSearchAnimation(true)
      }, 10)
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const clearInput = () => {
    setSearchText("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleSelectTopic = (name) => {
    setSearchText(name)
    setSearchAnimation(false)
    setTimeout(() => {
      set_is_search_open(false)
    }, 300)
  }

  const handleClickOutside_search = () => {
    setSearchAnimation(false)
    setTimeout(() => {
      set_is_search_open(false)
    }, 300)
  }

  const filteredCategories = categories.filter((item) =>
    item[`name_${lang}`]?.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div className="w-full">
      <div>
        <style jsx="true">
          {`
            .dropdown-enter {
              opacity: 0;
              transform: translateY(-20px);
              max-height: 0;
              overflow: hidden;
            }

            .dropdown-enter-active {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
              transition: opacity 300ms, transform 300ms, max-height 300ms;
            }

            .dropdown-exit {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
            }

            .dropdown-exit-active {
              opacity: 0;
              transform: translateY(-20px);
              max-height: 0;
              transition: opacity 300ms, transform 300ms, max-height 300ms;
              overflow: hidden;
            }

            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #DCC38B;
              border-radius: 50%;
              width: 30px;
              height: 30px;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>

        <div className="w-full h-[80px] flex flex-col items-center justify-center bg-[#DCC38B]">
          {/* Search input for mobile */}
          <div className="w-[90%] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[10px] flex items-center">
            <Search className="cursor-pointer" onClick={handleSearchClick} />
            <input
              type="text"
              placeholder={getPlaceholderText()}
              className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none focus:ring-0 font-inter font-[400] text-[16px]"
              ref={inputRef}
              value={searchText}
              onClick={handleSearchClick}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchClick()
                }
              }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <CirclePlus className="rotate-[45deg] mr-[15px] cursor-pointer" strokeWidth={1.75} onClick={clearInput} />
            )}
          </div>
        </div>

        {/* Search dropdown */}
        {is_search_open && (
          <div
            className="absolute top-[80px] left-0 h-[91vh] w-full flex justify-center pt-[10px] z-50"
            onClick={handleClickOutside_search}
          >
            <div
              className={`search_modal w-[90%] h-fit mx-auto bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[10px] shadow-xl transition-all duration-300 ${
                searchAnimation ? "dropdown-enter-active" : "dropdown-enter"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {search_topics.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectTopic(item)}
                  className="cursor-pointer w-full h-[52px] px-4 flex justify-between items-center bg-transparent hover:bg-gray-100"
                >
                  <div className="flex gap-[10px] cursor-pointer">
                    <History strokeWidth={1.5} />
                    <h1 className="font-inter font-[400] text-[19px] leading-[22px] text-black">{item}</h1>
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
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="category-topics pt-[15px]">
        {loading ? (
          <div className="flex justify-center items-center w-full h-[100px]">
            <div className="loader"></div>
          </div>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <Link to={`/category/${category.id}`} key={index}>
              <div className="flex justify-between items-center pl-[22px] pr-[31px] w-full h-[52px] hover:bg-gray-50 transition-colors">
                <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">
                  {category[`name_${lang}`] || category.name}
                </h1>
                <ChevronRight className="text-[#737373]" />
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-[100px]">
            <p className="text-center text-gray-500 font-inter">
              {lang === "uz"
                ? "Kategoriya topilmadi"
                : lang === "en"
                  ? "No categories found"
                  : lang === "ru"
                    ? "Категории не найдены"
                    : "Kategoriya topilmadi"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Category_mobile
