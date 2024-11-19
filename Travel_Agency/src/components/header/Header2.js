"use client";
import Link from "next/link";
import navData from "../../data/nav.json";
import { useEffect, useMemo, useReducer, useRef } from "react";
import LoginModal from "../common/LoginModal";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Icon from "@/uitils/Icon";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const initialState = {
  activeMenu: "",
  activeSubMenu: "",
  isSidebarOpen: false,
  isLeftSidebarOpen: false,
  isRightSidebar: false,
  isLang: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_MENU":
      return {
        ...state,

        activeMenu: state.activeMenu === action.menu ? "" : action.menu,
        activeSubMenu:
          state.activeMenu === action.menu ? state.activeSubMenu : "",
      };
    case "TOGGLE_SUB_MENU":
      return {
        ...state,
        activeSubMenu:
          state.activeSubMenu === action.subMenu ? "" : action.subMenu,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    case "TOGGLE_LEFT_SIDEBAR":
      return {
        ...state,
        isLeftSidebarOpen: !state.isLeftSidebarOpen,
      };
    case "TOGGLE_LANG":
      return {
        ...state,
        isLang: !state.isLang,
      };
    case "TOGGLE_RIGHTSIDEBAR":
      return {
        ...state,
        isRightSidebar: !state.isRightSidebar,
      };
    default:
      return state;
  }
}
const Header2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);
  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMenu = (menu) => {
    dispatch({ type: "TOGGLE_MENU", menu });
  };

  const toggleRightSidebar = () => {
    dispatch({ type: "TOGGLE_RIGHTSIDEBAR" });
  };
  const toggleSubMenu = (subMenu) => {
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu });
  };
  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_MENU", menu: "" });
    dispatch({ type: "TOGGLE_SUB_MENU", subMenu: "" });
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 1500,
      spaceBetween: 25,
      loop: true,
      autoplay: {
        delay: 2500, // Autoplay duration in milliseconds
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".destination-sidebar-next",
        prevEl: ".destination-sidebar-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 2,
        },
      },
    };
  });

  return (
    <>
      <LoginModal />
      <header
        ref={headerRef}
        className={`header-area style-2 ${state.scrollY > 10 ? "sticky" : ""}`}
      >
        <div className="header-logo">
          <Link href="/">
            <img
              alt="image"
              className="img-fluid"
              src="/assets/img/logo2.svg"
            />
          </Link>
          <span
            className="app-name"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#2a2a2a",
              marginLeft: "10px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            We GO
          </span>
        </div>
        <div className={`main-menu ${state.isSidebarOpen ? "show-menu" : ""}`}>
          <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
            <div className="mobile-logo-wrap">
              <Link href="">
                <img alt="image" src="/assets/img/logo2.svg" />
              </Link>
            </div>
            <div className="menu-close-btn" onClick={toggleSidebar}>
              <i className="bi bi-x" />
            </div>
          </div>
          <ul className="menu-list">
            {navData.map((data) => {
              const { id, label, link, icon, subMenu } = data;
              return (
                <li
                  key={id}
                  className={`${icon === true ? "menu-item-has-children" : ""}`}
                >
                  <Link href={link} className="drop-down">
                    {label}
                  </Link>
                  {icon && (
                    <i
                      onClick={() => toggleMenu(label)}
                      className={`bi bi-${
                        state.activeMenu === label ? "dash" : "plus"
                      } dropdown-icon`}
                    />
                  )}

                  {subMenu && (
                    <ul
                      className={`sub-menu ${
                        state.activeMenu === label ? "d-block" : ""
                      }`}
                    >
                      {subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link legacyBehavior href={subItem.link}>
                            <a>{subItem.label}</a>
                          </Link>
                          {subItem.icon && subItem.icon ? (
                            <>
                              <i className="d-lg-flex d-none bi bi-chevron-right dropdown-icon" />
                              <i
                                onClick={() => toggleSubMenu(subItem.label)}
                                className={`d-lg-none d-flex bi bi-${
                                  state.activeSubMenu === subItem.label
                                    ? "dash"
                                    : "plus"
                                } dropdown-icon `}
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {subItem.subMenu && (
                            <ul
                              className={`sub-menu ${
                                state.activeSubMenu === subItem.label
                                  ? "d-block"
                                  : ""
                              }`}
                            >
                              {subItem.subMenu.map((subItem, subIndex) => (
                                <li key={subItem.id}>
                                  <Link legacyBehavior href={subItem.link}>
                                    <a>{subItem.label}</a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="topbar-right d-lg-none d-block">
            <button
              type="button"
              className="modal-btn header-cart-btn"
              data-bs-toggle="modal"
              data-bs-target="#user-login"
            >
              REGISTER/ LOGIN
            </button>
          </div>
         
        </div>
        <div className="nav-right d-flex jsutify-content-end align-items-center">
          <ul className="icon-list">
            <li className="d-lg-flex d-none">
              <a href="#" data-bs-toggle="modal" data-bs-target="#user-login">
                <Icon name="profile" width={27} height={27} viewBox="0 0 27 27">

                </Icon>
              </a>
            </li>
            <li className="right-sidebar-button" onClick={toggleRightSidebar}>
            <Icon name="sideBarToggle" width={27} height={27} viewBox="0 0 27 27">

           </Icon>
            </li>
          </ul>
          <Link href="/package-grid" className="primary-btn3 d-xl-flex d-none">
            Book A Trip
          </Link>
          <div
            className="sidebar-button mobile-menu-btn"
            onClick={toggleSidebar}
          >
           <Icon name="mobilMenu" width={25} height={25} viewBox="0 0 25 25"></Icon>
          </div>
        </div>
      </header>
      <div
        className={`right-sidebar-menu ${
          state.isRightSidebar ? "show-right-menu" : ""
        }`}
      >
        <div className="sidebar-logo-area d-flex justify-content-between align-items-center">
          <div className="sidebar-logo-wrap">
            <Link href="/">
              <img alt="image" src="/assets/img/logo2.svg" />
            </Link>
            <span
            className="app-name"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "1rem",
              fontWeight: "600",
              color: "#2a2a2a",
              marginLeft: "10px",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            We GO
          </span>
          </div>
          <div className="right-sidebar-close-btn" onClick={toggleRightSidebar}>
            <i className="bi bi-x" />
          </div>
        </div>
        <div className="sidebar-content-wrap">
          <div className="category-wrapper">
            <h4>Tour Type</h4>
            <ul className="category-list">
              <li>
                <Link
                  href="/activities/activities-details"
                  className="single-category"
                >
                  <div className="icon">
                  <Icon name="adventure" width={45} height={45} viewBox="0 0 45 45"></Icon>
                  </div>
                  <h6>Adventure</h6>
                </Link>
              </li>
              <li>
                <Link
                  href="/activities/activities-details"
                  className="single-category"
                >
                  <div className="icon">
                  <Icon name="historical" width={45} height={45} viewBox="0 0 45 45"></Icon>
                  </div>
                  <h6>Historical</h6>
                </Link>
              </li>
              <li>
                <Link
                  href="/activities/activities-details"
                  className="single-category"
                >
                  <div className="icon">
                  <Icon name="cultural" width={45} height={45} viewBox="0 0 45 45"></Icon>
                  </div>
                  <h6>Cultural Tours</h6>
                </Link>
              </li>
              <li>
                <Link
                  href="/activities/activities-details"
                  className="single-category"
                >
                  <div className="icon">
                  <Icon name="wildlife" width={45} height={45} viewBox="0 0 45 45"></Icon>
                  </div>
                  <h6>Wildlife Tour</h6>
                </Link>
              </li>
              <li>
                <Link
                  href="/activities/activities-details"
                  className="single-category"
                >
                  <div className="icon">
                  <Icon name="city" width={45} height={45} viewBox="0 0 45 45"></Icon>
                  </div>
                  <h6>City Tour</h6>
                </Link>
              </li>
             
            </ul>
          </div>
          <div className="destination-wrapper">
            <h4>Our Destinations</h4>
            <div className="row">
              <div className="col-lg-12">
                <Swiper
                  {...settings}
                  className="swiper destination-sidebar-slider mb-35"
                >
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <div className="destination-card2">
                        <Link
                          href="/destination/destination-details"
                          className="destination-card-img"
                        >
                          <img
                            src="/assets/img/home2/destination-card-sidebar-img1.png"
                            alt=""
                          />
                        </Link>
                        <div className="batch">
                          <span>5 Tour</span>
                        </div>
                        <div className="destination-card2-content">
                          <span>Travel To</span>
                          <h4>
                            <Link href="/destination/destination-details">
                              New York
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="destination-card2">
                        <Link
                          href="/destination/destination-details"
                          className="destination-card-img"
                        >
                          <img
                            src="/assets/img/home2/destination-card-sidebar-img2.png"
                            alt=""
                          />
                        </Link>
                        <div className="batch">
                          <span>8 Tour</span>
                        </div>
                        <div className="destination-card2-content">
                          <span>Travel To</span>
                          <h4>
                            <Link href="/destination/destination-details">
                              Switzerland
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="destination-card2">
                        <Link
                          href="/destination/destination-details"
                          className="destination-card-img"
                        >
                          <img
                            src="/assets/img/home2/destination-card-sidebar-img3.png"
                            alt=""
                          />
                        </Link>
                        <div className="batch">
                          <span>4 Tour</span>
                        </div>
                        <div className="destination-card2-content">
                          <span>Travel To</span>
                          <h4>
                            <Link href="/destination/destination-details">
                              Saudi Arab
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <div className="destination-card2">
                        <Link
                          href="/destination/destination-details"
                          className="destination-card-img"
                        >
                          <img
                            src="/assets/img/home2/destination-card-sidebar-img4.png"
                            alt=""
                          />
                        </Link>
                        <div className="batch">
                          <span>6 Tour</span>
                        </div>
                        <div className="destination-card2-content">
                          <span>Travel To</span>
                          <h4>
                            <Link href="/destination/destination-details">
                              Indonesia
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </SwiperSlide>
                  </div>
                </Swiper>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header2;
