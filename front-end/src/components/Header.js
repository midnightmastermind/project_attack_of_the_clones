/**
 * This code is the header for a website.
 * It includes the logo, a navbar with links to different pages on the website, and a dropdown menu.
 */
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/Header.css';

import PageAuth from "../common/PageAuth";
import "../App.css";
import logo from "../logo.png";
import { Link } from "react-router-dom";

import EventBus from "../common/EventBus";
import { logout } from "../slices/auth";
import Dropdown from "./Dropdown";
import { MenuItems } from "./MenuItems";


const Header = (props) => {
    const [showMentorBoard, setShowMentorBoard] = useState(false);
    const [showSiteAdminBoard, setShowSiteAdminBoard] = useState(false);
    const [showGlobalAdminBoard, setShowGlobalAdminBoard] = useState(false);
    const [showUserBoard, setShowUserBoard] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const [hamburgerClicked, setHamburger] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const { user: currentUser } = useSelector((state) => state.auth);
    const { current_site: currentSite } = useSelector((state) => state.site);

    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    const setUserMenu = () => {
        if (!(PageAuth.adminAuth(currentUser) && PageAuth.mentorAuth(currentUser) && PageAuth.globalAdminAuth(currentUser))) {
            setShowUserBoard(true);
        }
    }

    const setMentorMenu = () => {
        if (PageAuth.mentorAuth(currentUser)) {
            setShowMentorBoard(true);
            setShowUserBoard(true);
        }
    }

    const setSiteAdminMenu = () => {
        if (PageAuth.adminAuth(currentUser)) {
            setShowSiteAdminBoard(true)
            setShowMentorBoard(true);
            setShowUserBoard(true);
        }
    }

    const setGlobalAdminMenu = () => {
        if (PageAuth.globalAdminAuth(currentUser)) {
            setShowGlobalAdminBoard(true);
        }
    }


    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        handleResize();

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const clickHamburger = () => {
        setHamburger(!hamburgerClicked);
    }

    useEffect(() => {
        const handleResize = () => {
            setMobileView(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        // Listen for window resize events
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    useEffect(() => {
        if (currentUser) {
            setUserMenu(currentUser);
            setMentorMenu(currentUser);
            setSiteAdminMenu(currentUser);
            setGlobalAdminMenu(currentUser);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (
        <div className="header-container">
            <nav className="navbar flex justify-between p-4 bg-white w-screen flex-nowrap">
                <Link to={"/"} className="navbar-brand">
                    <img className="mentorx-logo-styling" src={logo} alt="logo"></img>
                    <div className="site-title">{currentSite.title}</div>
                </Link>
                {!mobileView ? (
                    <div className="flex items-center justify-end  p-4">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home 
                            </Link>
                        </li>
                        <li className="dropdown" onMouseEnter={()=> setActiveDropdown("directoryDropdown")} onMouseLeave={()=> setActiveDropdown(null)}>
                            {MenuItems["directory"].title}  
                            <i className="fa-solid fa-caret-down mr-2"></i>
                            {activeDropdown === "directoryDropdown" && <Dropdown size={"w-36"} list={MenuItems["directory"].list} />}
                        </li>
                        <Link to={"solutions"} className="nav-link">
                        <li className="dropdown" onMouseEnter={()=> setActiveDropdown("solutionsDropdown")} onMouseLeave={()=> setActiveDropdown(null)}>
                            {MenuItems["solutions"].title} 
                            <i className="fa-solid fa-caret-down mr-2"></i>
                            {activeDropdown === "solutionsDropdown"  && <Dropdown size={"w-36"} list={MenuItems["solutions"].list} />}
                        </li>
                        </Link>
                        <Link to={"GetStarted"} classname="nav-link dropdown">
                        <li className="dropdown" onMouseEnter={()=> setActiveDropdown("getStartedDropdown")} onMouseLeave={()=> setActiveDropdown(null)}>  
                            {MenuItems["get_started"].title}
                            <i className="fa-solid fa-caret-down mr-2"></i>
                            {activeDropdown === "getStartedDropdown" && <Dropdown size={"w-52"} list={MenuItems["get_started"].list} />}
                        </li>
                        </Link>
                        {/* <li className="nav-item">
                                <Link to={"/courses"} className="nav-link">
                                    All Courses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/mentors"} className="nav-link">
                                    All Mentors
                                </Link>
                            </li> */}
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/blog"} className="nav-link">
                                Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/contact"} className="nav-link">
                                Contact Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/Calendartest"} className="nav-link">
                                Calendar Testings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/form_builder"} className="nav-link">
                                Form Builder
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link to={"/coursestest"} className="nav-link">
                                CoursesTest
                            </Link>
                        </li> */}

                        {showGlobalAdminBoard && (
                            <li className="nav-item dropdown whitespace-nowrap " onMouseEnter={()=> setActiveDropdown('adminDropdown')} onMouseLeave={()=> setActiveDropdown(null)}>
                                {MenuItems["admin"].title}
                                <i className="fa fa-caret-down"></i>
                               {activeDropdown === 'adminDropdown' && <Dropdown size={"w-80"} list={MenuItems["admin"].list} />}
                            </li>
                        )}

                        {showSiteAdminBoard && !showGlobalAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Site Admin Board
                                </Link>
                            </li>
                        )}

                        {showMentorBoard && !showGlobalAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/mentor"} className="nav-link">
                                    Mentor Board
                                </Link>
                            </li>
                        )}

                        {showUserBoard && !showGlobalAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    My Courses
                                </Link>
                            </li>
                        )}

                        {currentUser ? (
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link text-nowrap">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )
                        }
                    </div>
                ) : (
                    <div className="flex items-center justify-end p-4">
                        <li className="navbar-button" onClick={clickHamburger}>
                            <i className={`fa-solid fa-bars hamburger-navbar`}></i>
                        </li>
                    </div>
                )}
                {mobileView && hamburgerClicked && (
                    <div className="nav-mobile-menu">
                        <li className="navbar-button" onClick={clickHamburger}>
                            <i className={`fa-solid fa-x`}></i>
                        </li>
                        <li className="nav-item">
                            <Link to={"/courses"} className="nav-link" onClick={clickHamburger}>
                                All Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/mentors"} className="nav-link" onClick={clickHamburger}>
                                All Mentors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link" onClick={clickHamburger}>
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link" onClick={clickHamburger}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/blog"} className="nav-link" onClick={clickHamburger}>
                                Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/contact"} className="nav-link" onClick={clickHamburger}>
                                Contact Us
                            </Link>
                        </li>

                        {showGlobalAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/global"} className="nav-link" >
                                    Global Dashboard
                                </Link>
                            </li>
                        )}

                        {(showSiteAdminBoard || showGlobalAdminBoard) && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link" >
                                    Admin Dashboard
                                </Link>
                            </li>
                        )}

                        {(showMentorBoard || showGlobalAdminBoard) && (
                            <li className="nav-item">
                                <Link to={"/mentor"} className="nav-link">
                                    Mentor Dashboard
                                </Link>
                            </li>
                        )}

                        {(showUserBoard || showGlobalAdminBoard) && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User
                                </Link>
                            </li>
                        )}

                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link text-nowrap">
                                        Sign Up
                                    </Link>
                                </li>
                            </div>
                        )}
                    </div>
                )
                }
            </nav>
        </div>
    )
};

export default Header;
