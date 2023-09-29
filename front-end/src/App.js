import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LinkedInCallback } from 'react-linkedin-login-oauth2';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import FindMentors from "./pages/FindMentors";
import BoardUser from "./components/BoardUser";
import BoardMentor from "./components/BoardMentor";
import BoardAdmin from "./components/BoardAdmin";
import BoardGlobalAdmin from "./components/BoardGlobalAdmin";
import Course from "./components/Course";
import CourseList from "./components/CourseList";
import SaveObjectForm from "./components/SaveObjectForm"
import UserList from "./components/UserList";
import User from "./components/User";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import LoadingBar from "./components/LoadingBar";
import PageAuth from "./common/PageAuth";
import GetStarted from "./pages/GetStarted";
import Site from "./components/Site";
import Calendar from "./components/Calendar";
import Calendartest from "./pages/Calendartest";
import FormBuilder from "./components/FormBuilder";
import MentorForm from "./pages/mentorForm";

import { login } from "./slices/auth";
import { getByName } from "./slices/site";
import { getAllForUser as getAllEnrollmentsForUser, getAllForSite as getAllEnrollmentsForSite, getAll as getAllEnrollments } from "./slices/enrollment";
import { getAllForSite as getAllCoursePermissionsForSite, getAll as getAllCoursePermissions } from "./slices/course_permissions";
import { getAllForSite as getAllCoursesForSite, getAll as getAllCourses } from "./slices/course";
import { getAll as getAllSiteCourseAvailabilities } from "./slices/site_course_availability";
import { getAll as getAllSites } from "./slices/site";
import { getAll as getAllUsers, getAllForSite as getAllUsersForSite, getMentors } from "./slices/user";
import { getAll as getAllUserSiteAvailabilities } from "./slices/user_site_availability";
import { getAll as getAllSitePermissions } from "./slices/site_permissions";
import { getAll as getAllSessions } from "./slices/session";

import { create as createCourse } from "./slices/course";
import { create as createUser } from "./slices/user";
import { create as createSite } from "./slices/site";


const App = () => {


    const { current_site: currentSite } = useSelector((state) => state.site);
    const { fetching: fetchingSite } = useSelector((state) => state.site);
    const { fetched: fetchedSite } = useSelector((state) => state.site);
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const isMentorFormRoute = window.location.pathname === "/mentorform";



    const getUserData = () => {
        if (!(PageAuth.adminAuth(currentUser) && PageAuth.mentorAuth(currentUser) && PageAuth.globalAdminAuth(currentUser))) {
            dispatch(getAllCoursesForSite());
            dispatch(getAllEnrollmentsForUser());
            dispatch(getMentors());
            dispatch(getAllSessions());

        }
    }

    const getMentorData = () => {
        if (PageAuth.mentorAuth(currentUser)) {
            dispatch(getAllCourses());
            dispatch(getAllCoursePermissions());
            dispatch(getAllEnrollments());
            dispatch(getAllUsers());
            dispatch(getAllSites());
            dispatch(getAllSessions());

            //needs all users
            //needs all courses
            //needs all enrollments
            //needs all course permissions
            //needs all sites
        }
    }

    const getSiteAdminData = () => {
        if (PageAuth.adminAuth(currentUser)) {
            dispatch(getAllCourses());
            dispatch(getAllSiteCourseAvailabilities());
            dispatch(getAllUserSiteAvailabilities())
            dispatch(getAllEnrollmentsForSite());
            dispatch(getAllCoursePermissionsForSite());
            dispatch(getAllUsers());
            dispatch(getAllSites());
            dispatch(getAllSitePermissions());
            dispatch(getAllSessions());

            //needs all users
            //needs all courses
            //needs all enrollments for site
            //needs all course permissions for site
            //needs all site course availabilities
            //needs all user site availabilities
            //needs all site permissions
        }
    }

    const getGlobalAdminData = () => {
        if (PageAuth.globalAdminAuth(currentUser)) {
            dispatch(getAllCourses());
            dispatch(getAllSiteCourseAvailabilities());
            dispatch(getAllSites());
            dispatch(getAllEnrollments());
            dispatch(getAllCoursePermissions());
            dispatch(getAllUserSiteAvailabilities());
            dispatch(getAllUsers());
            dispatch(getAllSitePermissions());
            dispatch(getAllSessions());
            //needs all users
            //needs all courses
            //needs all sites
            //needs all enrollments
            //needs all course permissions
            //needs all site course availabilities
            //needs all user site availabilities
            //needs all site permissions
        }
    }
    useEffect(() => {
        const user = localStorage.getItem("user");
    
        if (user && !user.includes("undefined")) {
            login(JSON.parse(user));
        }
      }, []);

    useEffect(() => {
        let subdomain = window.location.host.split(".")[0];
        console.log(subdomain);
        if (subdomain.includes("localhost") || subdomain.includes("altus-mentorship-app")) {
            subdomain = "mentorxapp";
        }
        dispatch(getByName({ name: subdomain }));
        console.log(currentUser);
        if (currentUser) {
            console.log(currentUser);
            getUserData();
            getMentorData();
            getSiteAdminData();
            getGlobalAdminData();
        } else {
            dispatch(getAllCoursesForSite());
            dispatch(getMentors());
        } 

    }, [currentUser]);

    const saveCourse = (course) => {
        dispatch(createCourse(course))
            .unwrap()
            .then(data => {
                dispatch(getAllCourses());
            })
            .catch(e => {
                console.log(e);
            });
    };

    const saveUser = (user) => {
        dispatch(createUser(user))
            .unwrap()
            .then(data => {
                dispatch(getAllUsers());

            })
            .catch(e => {
                console.log(e);
            });
    };

    const saveSite = (site) => {
        dispatch(createSite(site))
            .unwrap()
            .then(data => {
                // setCourse({
                //     id: data.id,
                //     title: data.title,
                //     description: data.description,
                //     published: data.published
                // });
                dispatch(getAllSites());

            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <Router>
            {currentSite && 
                <div className="container-fluid">
                    {!isMentorFormRoute && <Header />}
                    <div className={ !isMentorFormRoute ? "app-pages mt-3" : ''}>
                        <Routes>
                            <Route path="/" element={<HomePage/>} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/solutions" element={<Solutions />} />
                            <Route path="/findmentors" element={<FindMentors />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/user" element={<BoardUser />} />
                            <Route path="/mentor" element={<BoardMentor />} />
                            <Route path="/admin" element={<BoardAdmin />} />
                            <Route path="/courses/new" element={<SaveObjectForm schema={{title: "", description: "", published: false}} header="Course" callBackFunction={saveCourse} />} />
                            <Route path="/courses/:course_id" element={<Course />} />
                            <Route path="/courses/" element={<CourseList />} />
                            <Route path="/mentors/" element={<UserList mode="mentor" />} />
                            <Route path="/users/:user_id" element={<User />} />
                            <Route path="/users/new" element={<SaveObjectForm schema={{username: "", email: "", password: "password"}} header="User" callBackFunction={saveUser} />} />
                            <Route path="/sites/new" element={<SaveObjectForm schema={{title: "", domain: "", description: ""}} header="Site" callBackFunction={saveSite} />} />
                            <Route path="/global" element={<BoardGlobalAdmin />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/getStarted" element={<GetStarted />} />
                            <Route path="/site/:site_id" element={<Site />} />
                            <Route path="/calendar/" element={<Calendar />} />
                            <Route path="/Calendartest/" element={<Calendartest />} />
                            <Route path="/form_builder/" element={<FormBuilder />} />
                            <Route path="/mentorform" element={<MentorForm />} />
                            <Route exact path="/linkedin" element={<LinkedInCallback />} />
                            {/* <Route path="/homepage" element={<HomePage />} /> */}
                        </Routes>
                    </div>
                    {!isMentorFormRoute &&
                    <Footer />
                    }   
                </div>
            }
            {(!currentSite && !fetchingSite && fetchedSite) &&
                <div className="container-fluid">
                    <header className="jumbotron">
                        <h3>This is not a valid site</h3>
                    </header>
                </div>
            }
            {(!currentSite && fetchingSite && !fetchedSite) &&
                <LoadingBar />
            }
        </Router>
    );
};

export default App;