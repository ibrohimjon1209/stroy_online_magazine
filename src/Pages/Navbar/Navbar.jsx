"use client"

import { useState, useRef, useEffect } from "react"
import logo1 from "./Images/logo.svg"
import logo2 from "../Enter/Images/photo_1.png"
import logo3 from "../Enter/Images/photo_3.png"
import cube from "./Images/orders.svg"
import cube_a from "./Images/orders_a.svg"
import like from "./Images/like.svg"
import like_a from "./Images/like_a.svg"
import basket_i from "./Images/basket.svg"
import basket_a from "./Images/basket_a.svg"
import profile from "./Images/profile.svg"
import profile_a from "./Images/profile_a.svg"
import vector from "./Images/vector.png"
import { Link } from "react-router-dom"
import { useNavigate, useLocation } from "react-router-dom"
import {
  ChevronDown,
  CirclePlus,
  History,
  Home,
  Menu,
  MessageSquareText,
  Package,
  Search,
  ShoppingCart,
  User,
  X,
  Send,
  Check,
  CheckCheck,
} from "lucide-react"
import get_categories from "../../Services/category/get_categories"
import { products_get } from "../../Services/products_get"

const TELEGRAM_BOT_TOKEN = "7056109266:AAFIzj2wWkLPzbKvg6OyhpsXCZSdXqWnZU4"
const TELEGRAM_CHAT_ID = "-1002797780224"

const generateDeviceId = () => {
  const userAgent = navigator.userAgent
  const screenResolution = `${window.screen.width}x${window.screen.height}`
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const language = navigator.language
  const platform = navigator.platform

  const deviceString = `${userAgent}_${screenResolution}_${timezone}_${language}_${platform}`

  // Simple hash function (MD5 alternative for browser)
  let hash = 0
  for (let i = 0; i < deviceString.length; i++) {
    const char = deviceString.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

const getDeviceName = () => {
  const userAgent = navigator.userAgent
  let browserName = "Unknown Browser"
  let osName = "Unknown OS"

  // Detect browser
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox"
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome"
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari"
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge"
  }

  // Detect OS
  if (userAgent.indexOf("Win") > -1) osName = "Windows"
  else if (userAgent.indexOf("Mac") > -1) osName = "MacOS"
  else if (userAgent.indexOf("Linux") > -1) osName = "Linux"
  else if (userAgent.indexOf("Android") > -1) osName = "Android"
  else if (userAgent.indexOf("iOS") > -1) osName = "iOS"

  return `${osName} - ${browserName}`
}

const sendToTelegram = async (deviceId, deviceName, message) => {
  const text = `🆕 Yangi xabar!\n\n👤 Qurilma: ${deviceName}\n🔑 Device ID: ${deviceId}\n\n\n💬 Xabar: ${message}\n\n\n[ID:${deviceId}]`

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()
    return data.ok
  } catch (error) {
    console.error("Telegram yuborishda xato:", error)
    return false
  }
}

const getStoredTopics = () => {
  try {
    return JSON.parse(localStorage.getItem("searchTopics")) || []
  } catch (error) {
    return []
  }
}

const Navbar = ({ lang, setSearchText, searchText }) => {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const categoryCloseTimeout = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [is_category_open, set_is_category_open] = useState(false)
  const [is_search_open, set_is_search_open] = useState(false)
  const [is_likes_hovered, set_is_likes_hovered] = useState(false)
  const [is_orders_hovered, set_is_orders_hovered] = useState(false)
  const [is_basket_hovered, set_is_basket_hovered] = useState(false)
  const [is_profile_hovered, set_is_profile_hovered] = useState(false)
  const location = useLocation().pathname.split("/")[1]
  const [categoryAnimation, setCategoryAnimation] = useState(false)
  const [searchAnimation, setSearchAnimation] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [search_topics, setSearchTopics] = useState(getStoredTopics())
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [basket, set_basket] = useState([])

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [deviceId, setDeviceId] = useState("")
  const [deviceName, setDeviceName] = useState("")
  const [lastUpdateId, setLastUpdateId] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const chatEndRef = useRef(null)
  const pollingIntervalRef = useRef(null)
  const wasAtBottomRef = useRef(true)
  const chatContainerRef = useRef(null)
  const [showScrollDown, setShowScrollDown] = useState(false)

  const sl_option_id =
    localStorage.getItem("sl_option_nav") == "Stroy Baza №1"
      ? 0
      : localStorage.getItem("sl_option_nav") == "Giaz Mebel"
        ? 1
        : 2

  const initializeBot = async () => {
    try {
      // First, try to remove any existing webhook
      const webhookResponse = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook?drop_pending_updates=true`
      );
      const webhookData = await webhookResponse.json();
      console.log("Webhook cleanup:", webhookData);

      // Reset getUpdates offset to get fresh updates
      localStorage.setItem(`chat_last_update_id_${deviceId}`, "0");
    } catch (error) {
      console.error("Webhook cleanup error:", error);
    }
  };

  useEffect(() => {
    let storedDeviceId = localStorage.getItem("chat_device_id");
    if (!storedDeviceId) {
      storedDeviceId = generateDeviceId();
      localStorage.setItem("chat_device_id", storedDeviceId);
    }
    setDeviceId(storedDeviceId);
    setDeviceName(getDeviceName());

    // Initialize bot (remove webhook)
    initializeBot();

    // Load chat history after initialization
    const storedMessages = localStorage.getItem(`chat_messages_${storedDeviceId}`);
    if (storedMessages) {
      const messages = JSON.parse(storedMessages);
      setChatMessages(messages);
      setUnreadCount(messages.filter(msg => msg.sender === "admin" && !msg.read).length);
    } else {
      const welcomeMsg = {
        id: Date.now(),
        text: "Stroy baza online magazin hush kelibsiz, assalmu alaykum deb savol bo'lsa yozing",
        sender: "bot",
        timestamp: new Date().toISOString(),
        status: "delivered",
        read: true,
      };
      setChatMessages([welcomeMsg]);
      localStorage.setItem(`chat_messages_${storedDeviceId}`, JSON.stringify([welcomeMsg]));
    }
  }, []);

  useEffect(() => {
    if (isChatOpen && deviceId) {
      // Get last update ID from localStorage for this device
      let storedUpdateId = parseInt(localStorage.getItem(`chat_last_update_id_${deviceId}`)) || 0;
      setLastUpdateId(storedUpdateId);

      pollingIntervalRef.current = setInterval(async () => {
        try {
          const offset = lastUpdateId + 1;
          console.log(`Polling with offset: ${offset}`); // Debug log

          const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates?offset=${offset}&timeout=30&limit=10`
          );

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data = await response.json();

          if (data.ok && data.result.length > 0) {
            let maxUpdateId = lastUpdateId;

            data.result.forEach((update) => {
              if (update.update_id > maxUpdateId) {
                maxUpdateId = update.update_id;
              }

              // Check for admin replies to our messages
              if (update.message &&
                update.message.reply_to_message &&
                String(update.message.chat.id) === TELEGRAM_CHAT_ID) {

                const originalMessage = update.message.reply_to_message.text;
                console.log("Found reply_to_message:", originalMessage); // Debug

                const deviceIdMatch = originalMessage.match(/\[ID:([a-f0-9]+)\]/);
                console.log("Device ID match:", deviceIdMatch); // Debug

                if (deviceIdMatch && deviceIdMatch[1] === deviceId) {
                  const adminReplyText = update.message.text;
                  console.log("Matched admin reply for device:", deviceId, adminReplyText); // Debug

                  const adminMsg = {
                    id: `admin_${update.update_id}`, // Unique ID for admin messages
                    text: adminReplyText,
                    sender: "admin",
                    timestamp: new Date(update.message.date * 1000).toISOString(),
                    status: "delivered",
                    read: false,
                  };

                  setChatMessages((prev) => {
                    // Check if message already exists
                    const exists = prev.some((msg) => msg.id === adminMsg.id);
                    if (exists) return prev;

                    const newMessages = [...prev, adminMsg];
                    localStorage.setItem(`chat_messages_${deviceId}`, JSON.stringify(newMessages));
                    setUnreadCount((count) => count + 1);
                    return newMessages;
                  });
                }
              }
            });

            // Update lastUpdateId and save to localStorage
            if (maxUpdateId > lastUpdateId) {
              setLastUpdateId(maxUpdateId);
              localStorage.setItem(`chat_last_update_id_${deviceId}`, maxUpdateId.toString());
            }
          }
        } catch (error) {
          console.error("Polling error:", error);
          if (error.message.includes("409")) {
            console.log("409 Conflict - webhook might still be active. Cleaning up...");
            initializeBot(); // Try to clean up webhook again
          }
        }
      }, 3000); // 3 seconds interval to avoid rate limits

      return () => {
        if (pollingIntervalRef.current) {
          clearInterval(pollingIntervalRef.current);
        }
      };
    }
  }, [isChatOpen, deviceId, lastUpdateId]);

  useEffect(() => {
    if (chatEndRef.current) {
      if (wasAtBottomRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [chatMessages]);

  useEffect(() => {
    if (isChatOpen) {
      setChatMessages((prev) => {
        const updated = prev.map((msg) =>
          msg.sender === "admin" && !msg.read ? { ...msg, read: true } : msg
        );
        localStorage.setItem(`chat_messages_${deviceId}`, JSON.stringify(updated));
        setUnreadCount(0);
        return updated;
      });

      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: "smooth" });
          wasAtBottomRef.current = true;
        }
      }, 100);
    }
  }, [isChatOpen, deviceId]);

  const handleChatScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10; // Threshold
      setShowScrollDown(!atBottom);
      wasAtBottomRef.current = atBottom;
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShowScrollDown(false);
      wasAtBottomRef.current = true;
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    const userMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
      status: "sending", // 1 tick
      read: true,
    }

    setChatMessages((prev) => {
      const newMessages = [...prev, userMsg]
      localStorage.setItem(`chat_messages_${deviceId}`, JSON.stringify(newMessages))
      return newMessages
    })
    setNewMessage("")

    // Send to Telegram
    const success = await sendToTelegram(deviceId, deviceName, newMessage)

    // Update message status
    setTimeout(() => {
      setChatMessages((prev) => {
        const updatedMessages = prev.map((msg) =>
          msg.id === userMsg.id
            ? { ...msg, status: success ? "sent" : "failed" } // 2 ticks or failed
            : msg,
        )
        localStorage.setItem(`chat_messages_${deviceId}`, JSON.stringify(updatedMessages))
        return updatedMessages
      })
    }, 2000)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [categoriesResponse, productsResponse] = await Promise.all([get_categories(), products_get(sl_option_id)])
        if (!categoriesResponse || !productsResponse) {
          throw new Error("Failed to fetch data")
        }
        setCategories(
          categoriesResponse.filter((item) => {
            return item.branch == sl_option_id
          }),
        )
        setProducts(productsResponse)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [sl_option_id])

  useEffect(() => {
    set_basket(JSON.parse(localStorage.getItem("basket")))
  }, [localStorage.getItem("basket")])

  const handleDeleteTopic = (index) => {
    const updatedTopics = [...search_topics]
    updatedTopics.splice(index, 1)
    setSearchTopics(updatedTopics)
    localStorage.setItem("searchTopics", JSON.stringify(updatedTopics))
  }

  const handleCategoryClick = () => {
    if (is_category_open) {
      if (categoryCloseTimeout.current) {
        clearTimeout(categoryCloseTimeout.current)
      }
      setCategoryAnimation(false)
      setTimeout(() => {
        set_is_category_open(false)
      }, 300)
    } else {
      if (categoryCloseTimeout.current) {
        clearTimeout(categoryCloseTimeout.current)
      }
      set_is_category_open(true)
      setTimeout(() => {
        setCategoryAnimation(true)
      }, 100)
      set_is_search_open(false)
      setSearchAnimation(false)
    }
  }

  const handleMouseEnterCategory = () => {
    if (categoryCloseTimeout.current) {
      clearTimeout(categoryCloseTimeout.current)
    }
    if (!is_category_open) {
      set_is_category_open(true)
      setTimeout(() => {
        setCategoryAnimation(true)
      }, 100)
      set_is_search_open(false)
      setSearchAnimation(false)
    }
  }

  const handleMouseLeaveCategory = () => {
    categoryCloseTimeout.current = setTimeout(() => {
      setCategoryAnimation(false)
      setTimeout(() => {
        set_is_category_open(false)
      }, 300)
    }, 500)
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
      set_is_category_open(false)
      setCategoryAnimation(false)
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const points = [
    { name: "Stroy Baza №1", id: 0 },
    { name: "Giaz Mebel", id: 1 },
    { name: "Gold Klinker", id: 2 },
  ]

  const sl_option = localStorage.getItem("sl_option_nav")
  const [selectedOption, setSelectedOption] = useState({ name: sl_option } || points[0])

  const handleOptionClick = (option, id) => {
    setSelectedOption(option)
    localStorage.setItem("sl_option_nav", option.name)
    setIsOpen(false)
    window.location.href = "/"
  }

  const handleClickOutside_search = () => {
    setSearchAnimation(false)
    setTimeout(() => {
      set_is_search_open(false)
    }, 300)
  }

  const to_home = () => (window.location.href = "/")

  const handleCategoryItemClick = (categoryId) => {
    navigate(`/category/${categoryId}`)
    setCategoryAnimation(false)
    setTimeout(() => {
      set_is_category_open(false)
    }, 300)
  }

  const get_basket_len = () => {
    const valid_basket = basket?.filter((item) => item.branch_id == sl_option_id)

    const totalQuantity = valid_basket?.reduce((sum, item) => {
      if (item.selected) {
        return sum + item.quantity
      }
      return sum
    }, 0)

    return totalQuantity || 0
  }

  return (
    <>
      <div className="hidden sm:block pt-[5px]">
        <div className="w-full h-auto md:h-[80px] flex flex-col md:flex-row justify-between gap-[20px] z-50 items-center px-[4.2%] sticky rounded-[15px] bg-[#DCC38B] py-4 md:py-0">
          <style jsx="true">{`
            .dropdown-enter {
              opacity: 0;
              transform: translateY(-10px);
              max-height: 0;
              overflow: hidden;
            }

            .dropdown-enter-active {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
              transition: opacity 300ms ease-in-out, transform 300ms ease-in-out, max-height 300ms ease-in-out;
            }

            .dropdown-exit {
              opacity: 1;
              transform: translateY(0);
              max-height: 500px;
            }

            .dropdown-exit-active {
              opacity: 0;
              transform: translateY(-10px);
              max-height: 0;
              transition: opacity 300ms ease-in-out, transform 300ms ease-in-out, max-height 300ms ease-in-out;
              overflow: hidden;
            }
          `}</style>

          <div className="flex items-center justify-between w-full md:hidden">
            <div className="flex items-center gap-[5px]">
              <img
                src={sl_option == "Stroy Baza №1" ? logo1 : sl_option == "Giaz Mebel" ? logo2 : logo3}
                alt="Logo"
                className="cursor-pointer w-7 h-7"
                onClick={to_home}
              />
              <h1
                className="font-inter font-[600] text-[16px] cursor-pointer leading-[22px] text-black"
                onClick={to_home}
              >
                {sl_option}
              </h1>
            </div>
            <button onClick={toggleMobileMenu} className="p-2 text-white md:hidden">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="w-full md:w-[247px] h-full hidden md:flex items-center gap-[5px]">
            <img
              src={sl_option == "Stroy Baza №1" ? logo1 : sl_option == "Giaz Mebel" ? logo2 : logo3}
              alt="Logo"
              className="cursor-pointer"
              onClick={to_home}
            />
            {(sl_option === "Stroy Baza №1" || sl_option === "Giaz Mebel") && (
              <h1
                className="font-inter font-[600] text-[20px] cursor-pointer leading-[22px] text-black"
                onClick={to_home}
              >
                {sl_option}
              </h1>
            )}
          </div>

          <div className={`${isMobileMenuOpen ? "flex" : "hidden"} md:hidden flex-col w-full gap-4 mt-4`}>
            <div className="flex items-center justify-between gap-2">
              <div
                onClick={handleCategoryClick}
                className="border-[3px] border-white drop-shadow-xl hover:opacity-75 cursor-pointer w-[100px] h-[40px] bg-transparent flex justify-center items-center rounded-[5px] gap-[5px]"
              >
                <Menu strokeWidth={1.5} color="white" />
                <h1 className="font-inter font-[500] text-[13px] text-white uppercase">Katolog</h1>
              </div>

              <div className="relative w-[calc(100%-120px)]">
                <div
                  className={`w-full h-[40px] bg-white ${isOpen ? "rounded-t-[5px]" : "rounded-[5px]"
                    } flex items-center justify-between pl-2 pr-2 cursor-pointer`}
                  onClick={toggleDropdown}
                >
                  <span className="truncate">
                    {selectedOption.name} ({points.length})
                  </span>
                  <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </div>
                {isOpen && (
                  <div className="absolute top-[100%] left-0 w-full bg-white rounded-b-[5px] shadow-lg transition-all duration-500 z-50">
                    {points.map((option, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => handleOptionClick(option, option.id)}
                      >
                        {option.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[5px] flex items-center">
              <Search className="cursor-pointer" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder={lang == "uz" ? "Qidiruv" : lang == "en" ? "Search" : lang == "ru" ? "Поиск" : "Qidiruv"}
                className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none focus:ring-0 font-inter font-[500] text-[15px]"
                ref={inputRef}
                value={searchText}
                onClick={handleSearchClick}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <CirclePlus
                  className="rotate-[45deg] mr-[15px] cursor-pointer"
                  strokeWidth={1.75}
                  onClick={clearInput}
                />
              )}
            </div>
          </div>

          <div className="w-full md:w-[653px] hidden md:flex gap-[20px]">
            <div className="relative inline-block">
              <div
                onMouseEnter={handleMouseEnterCategory}
                onMouseLeave={handleMouseLeaveCategory}
                onClick={handleCategoryClick}
                className="border-[3px] border-white drop-shadow-xl hover:opacity-75 cursor-pointer w-[100px] h-[40px] bg-transparent flex justify-center items-center rounded-[5px] gap-[5px]"
              >
                <Menu strokeWidth={1.5} color="white" />
                <h1 className="font-inter font-[500] text-[13px] text-white uppercase">
                  {lang == "uz" ? "Katalog" : lang == "en" ? "Category" : lang == "ru" ? "Каталог" : "Katalog"}
                </h1>
              </div>

              {is_category_open && (
                <div
                  className="absolute left-0 z-50 mt-2 top-[100%]"
                  onMouseEnter={handleMouseEnterCategory}
                  onMouseLeave={handleMouseLeaveCategory}
                >
                  <div
                    className={`search_modal w-[600px] h-[450px] bg-white border-[1px] overflow-auto border-[#6D5C5CA6] rounded-[5px] shadow-xl transition-all duration-300 ${categoryAnimation ? "dropdown-enter-active" : "dropdown-enter"
                      }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isLoading ? (
                      <div className="w-full h-[100px] flex justify-center items-center">
                        <div className="w-8 h-8 border-4 border-t-4 border-t-[#DCC38B] border-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : categories.length > 0 ? (
                      categories.map((category) => {
                        const productCount = products.filter(
                          (product) => product.category == category.id && product.is_available === true,
                        ).length

                        return (
                          <div
                            key={category.id}
                            onClick={() => handleCategoryItemClick(category.id)}
                            className="w-full h-[52px] pl-[34px] pr-[43px] flex justify-between items-center bg-transparent hover:bg-gray-100 cursor-pointer"
                          >
                            <h1 className="font-inter font-[500] text-[20px] leading-[22px] text-[#0000008C]">
                              {category[`name_${lang}`]} ({productCount})
                            </h1>

                            <img src={vector || "/placeholder.svg"} className="rotate-[270deg]" alt="arrow" />
                          </div>
                        )
                      })
                    ) : (
                      <div className="w-full h-[100px] flex justify-center items-center">
                        <h1 className="font-inter font-[500] text-[16px] text-gray-500">Kategoriyalar mavjud emas</h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[427px] h-[40px] pl-[23.5px] bg-[#FFFFFF] rounded-[5px] flex items-center">
              <Search className="cursor-pointer" onClick={handleSearchClick} />
              <input
                type="text"
                placeholder={lang == "uz" ? "Qidiruv" : lang == "en" ? "Search" : lang == "ru" ? "Поиск" : "Qidiruv"}
                className="w-full placeholder:font-inter placeholder:font-[500] placeholder:text-[15px] placeholder:text-[#737373] border-none pl-[15px] pr-[20px] focus:outline-none focus:ring-0 font-inter font-[500] text-[15px]"
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
                <CirclePlus
                  className="rotate-[45deg] mr-[15px] cursor-pointer"
                  strokeWidth={1.75}
                  onClick={clearInput}
                />
              )}
            </div>
            {is_search_open && (
              <div
                className="absolute top-[100%] left-0 h-[91vh] w-full flex justify-center pr-[50px] pt-[10px]"
                onClick={handleClickOutside_search}
              >
                <div
                  className={`search_modal w-[520px] h-fit ml-[160px] bg-white border-[1px] overflow-hidden border-[#6D5C5CA6] rounded-[5px] shadow-xl transition-all duration-300 ${searchAnimation ? "dropdown-enter-active" : "dropdown-enter"
                    }`}
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
            <div className="relative w-[206px]">
              <div
                className={`w-full h-[40px] bg-white ${isOpen ? "rounded-t-[5px]" : "rounded-[5px]"
                  } flex items-center justify-between pl-2 pr-2 cursor-pointer`}
                onClick={toggleDropdown}
              >
                <span>{selectedOption.name}</span>
                <ChevronDown className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </div>
              {isOpen && (
                <div className="absolute top-[100%] left-0 w-full bg-white rounded-b-[5px] shadow-lg transition-all duration-500 z-50">
                  {points.map((option, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="icons w-full md:w-[242px] h-[40px] hidden md:flex items-center justify-start gap-[48px]">
            <Link to="/likes">
              <img
                className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                src={location == "likes" || is_likes_hovered ? like_a : like}
                onMouseEnter={() => set_is_likes_hovered(true)}
                onMouseLeave={() => set_is_likes_hovered(false)}
                alt="likes"
              />
            </Link>
            <Link to="/orders">
              <div className="relative">
                <img
                  className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                  src={location == "orders" || is_orders_hovered ? cube_a : cube}
                  onMouseEnter={() => set_is_orders_hovered(true)}
                  onMouseLeave={() => set_is_orders_hovered(false)}
                  alt="orders"
                />
                {localStorage.getItem("order_created") == "true" && (
                  <span className="absolute flex items-center justify-center w-4.5 h-4.5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                    1
                  </span>
                )}
              </div>
            </Link>
            <Link to="/basket">
              <div className="relative">
                <img
                  className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                  src={location == "basket" || is_basket_hovered ? basket_a : basket_i}
                  onMouseEnter={() => set_is_basket_hovered(true)}
                  onMouseLeave={() => set_is_basket_hovered(false)}
                  alt="basket"
                />
                {get_basket_len() > 0 && (
                  <span className="absolute flex items-center justify-center w-4.5 h-4.5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                    {get_basket_len() > 99 ? "99+" : get_basket_len()}
                  </span>
                )}
              </div>
            </Link>

            <Link to="/profile/orders">
              <img
                className="object-contain transition-shadow duration-100 hover:drop-shadow-md hover:shadow-xl"
                src={location == "profile" || is_profile_hovered ? profile_a : profile}
                onMouseEnter={() => set_is_profile_hovered(true)}
                onMouseLeave={() => set_is_profile_hovered(false)}
                alt="profile"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed -bottom-[calc(2vh-10px)] left-0 right-0 bg-[#BEA086] flex justify-around items-center h-[85px] z-50 rounded-t-[15px]">
        <Link to="/" className="flex flex-col items-center justify-center">
          <Home size={28} strokeWidth={2} color={location === "" ? "#ffffff" : "#DFCFC2"} />
        </Link>
        <Link to="/search" className="flex flex-col items-center justify-center">
          <Search size={28} strokeWidth={2} color={location === "search" ? "#ffffff" : "#DFCFC2"} />
        </Link>
        <Link to="/orders" className="flex flex-col items-center justify-center">
          <div className="relative">
            <Package size={28} strokeWidth={2} color={location === "orders" ? "#ffffff" : "#DFCFC2"} />
            {localStorage.getItem("order_created") == "true" && (
              <span className="absolute flex items-center justify-center w-4.5 h-4.5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                1
              </span>
            )}
          </div>
        </Link>
        <Link to="/basket" className="flex flex-col items-center justify-center">
          <div className="relative">
            <ShoppingCart size={28} strokeWidth={2} color={location === "basket" ? "#ffffff" : "#DFCFC2"} />
            {get_basket_len() > 0 && (
              <span className="absolute flex items-center justify-center w-4.5 h-4.5 text-xs font-bold text-white bg-red-500 rounded-full -top-2 -right-2">
                {get_basket_len() > 99 ? "99+" : get_basket_len()}
              </span>
            )}
          </div>
        </Link>
        <Link to="/profile" className="flex flex-col items-center justify-center">
          <User size={28} strokeWidth={2} color={location === "profile" ? "#ffffff" : "#DFCFC2"} />
        </Link>
      </div>
      <div className="md:hidden h-[0px]"></div>

      <div
        onClick={() => setIsChatOpen(true)}
        className="group fixed hover:scale-[125%] bottom-30 right-5  duration-300 sm:bottom-[-100px] sm:right-[250px] w-[70px] h-[70px] rounded-full flex justify-center items-center bg-[#DCC38B] z-50 overflow-visible before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-[#DCC38B] before:animate-[ripple_1.6s_ease-in-out_infinite] before:opacity-60 cursor-pointer hover:opacity-90 transition-all"
      >
        <MessageSquareText className="text-white font-[600]" size={38} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] text-xs font-bold text-white bg-red-500 rounded-full shadow-lg">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>

      {isChatOpen && (
        <div
          className="fixed bottom-20 right-0 sm:bottom-[-120px] sm:right-[230px] sm:w-[380px] sm:h-[500px] h-[400px] bg-white rounded-lg shadow-[0_30px_80px_rgba(0,0,0,0.4)] z-50 flex flex-col animate-[slideIn_0.3s_ease-out]"
          style={{
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div className="flex items-center justify-between p-4 bg-[#DCC38B] rounded-t-lg">
            <h3 className="text-white font-semibold text-lg">Chat</h3>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 relative"
            onScroll={handleChatScroll}
          >
            <div className="w-full  flex flex-col items-center">

              <h1 className="font-inter font-[400] text-gray-700 mb-[5px] ">Powered by <a href="https://t.me/nsd_corporation" className="font-[600] font-inter">NSD Corporation</a> </h1>
              <div className="w-full bg-gray-600 h-[0.5px]"></div>
            </div>
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${msg.sender === "user"
                    ? "bg-[#DCC38B] text-white"
                    : msg.sender === "bot"
                      ? "bg-blue-100 text-gray-800"
                      : "bg-gray-200 text-gray-800"
                    }`}
                >
                  <p className="text-sm break-words">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">
                      {new Date(msg.timestamp).toLocaleTimeString("uz-UZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {msg.sender === "user" && (
                      <>
                        {msg.status === "sending" && <Check size={14} className="opacity-70" />}
                        {msg.status === "sent" && <CheckCheck size={14} className="opacity-70" />}
                        {msg.status === "failed" && (
                          <span className="text-xs text-red-500">Yuborilmadi, qayta urining</span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
            {showScrollDown && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-[-30px] right-[400px] bg-[#DCC38B] text-white p-2 rounded-full shadow-lg hover:opacity-90 transition-opacity"
              >
                <ChevronDown size={20} />
              </button>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                placeholder="Xabar yozing..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DCC38B] placeholder:font-[600] placeholder:text-gray-700 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-[#DCC38B] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.6);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`}
      </style>
    </>
  )
}

export default Navbar