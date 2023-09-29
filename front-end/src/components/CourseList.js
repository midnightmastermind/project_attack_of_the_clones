/**
 * This code is a react component that renders a list of courses.
 * The courses are fetched from the redux store.
 * The component has several helper functions to filter the courses based on different criteria.
 */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/CourseList.css';

import { create as createEnrollment } from "../slices/enrollment";
import { create as createSiteCourseAvailability, remove as removeSiteCourseAvailability } from "../slices/site_course_availability";

import { Link } from "react-router-dom";
import PageAuth from "../common/PageAuth";
import { belongsToSite } from "../common/Site";
import LoadingBar from "./LoadingBar";
import { filterCourses } from "../common/Course";
import Hero from './Hero';
import SearchBar from "./SearchBar";
import LazyImage from "./LazyImage";
import Pagination from "./Pagination";
import ToolBar from "./ToolBar";

const searchFields = ["title", "description"];

const CourseList = (props) => {
    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const [showMentorTools, setShowMentorTools] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [showSiteAdminTools, setShowSiteAdminTools] = useState(false);
    const [showGlobalAdminTools, setShowGlobalAdminTools] = useState(false);
    const [toolList, setToolList] = useState(null);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    const { courses } = useSelector(state => state.course);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { enrollments } = useSelector((state) => state.enrollment);
    const { course_permissions } = useSelector((state) => state.course_permissions);
    const { sites, current_site: site } = useSelector((state) => state.site);
    const { site_course_availability } = useSelector((state) => state.site_course_availability);
    const { fetched: fetchedCourses } = useSelector((state) => state.course);

    const dispatch = useDispatch();

    let PageSize = 9;

    const heroPageInfo = {
        page: 'courses',
        heading: 'Browse Courses',
        search: false
    }


    useEffect(() => {
        if (filteredCourses !== null && fetchedCourses) {
            setShowLoadingBar(false);
        }
    }, [filteredCourses, fetchedCourses]);

    useEffect(() => {
        if (currentUser) {
            setShowMentorTools(PageAuth.mentorAuth(currentUser));
            setShowSiteAdminTools(PageAuth.adminAuth(currentUser));
            setShowGlobalAdminTools(PageAuth.globalAdminAuth(currentUser));
        }

        if (courses) {
            let filtered = [];
            if (props.mode == "enrolled") {
                //filter to only enrolled
                filtered = filterCourses(courses, enrollments, currentUser.id, 'user_id');
                setFilteredCourses(filtered);
                setSearchData(filtered);
            } else if (props.mode == "owned") {
                filtered = filterCourses(courses, course_permissions, currentUser.id, 'user_id');
                setFilteredCourses(filtered);
                setSearchData(filtered);
            } else if (props.mode == "admin") {
                setFilteredCourses(courses);
                setSearchData(courses);
            } else if (props.mode == "global_admin") {
                setFilteredCourses(courses);
                setSearchData(courses);
            } else {
                setFilteredCourses(courses);
                setSearchData(courses);
            }
        }
    }, [dispatch, courses, course_permissions, enrollments]);

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Create New Course",
                icon: "fa-plus",
                class: "add-new-button",
                callBackOrLink: "/courses/new"
            }];

        if (!props.site_id) {
            toolList.push({
                type: "select",
                text: "All Sites",
                callBackFunction: onChangeSite,
                options: sites,
                textIndex: "title"
            });
        }

        setToolList(toolList);
    }, [sites]);


    const findByTitle = (courses) => {
        //refreshData();
        setFilteredCourses(courses);
        setCurrentPage(1);
        //dispatch(searchByTitle({ searchTitle }));
    };

    const addToSite = (course_id) => {
        dispatch(createSiteCourseAvailability({ course_id: course_id, site_id: currentSite }))
            .unwrap()
            .then(() => {
                //props.history.push("/courses");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeFromSite = (course_id) => {
        dispatch(removeSiteCourseAvailability({ course_id: course_id, site_id: currentSite }))
            .unwrap()
            .then(() => {
                //props.history.push("/courses");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const currentCourseList = useMemo(() => {
        if (filteredCourses !== null) {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return filteredCourses.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage, filteredCourses]);


    const onChangeSite = (site) => {
        console.log(site);
        if (site !== "All") {
            setCurrentSite(site);
            let filtered = filterCourses(courses, site_course_availability, site, 'site_id');
            setFilteredCourses(filtered);
            setSearchData(filtered);
        } else {
            setCurrentSite(null);
            setFilteredCourses(courses);
            setSearchData(courses);
        }
    }

    console.log(currentCourseList);
    return (
        <div>
            {(props.mode !== "global_admin" && props.mode !== "admin") &&
                <>
                    <Hero page={heroPageInfo} />
                    <div className="flex text-center flex-wrap">
                        <div className="w-full flex-col">
                            <h2 className="text-6xl">Expand your <span style={{ color: '#0093CB' }}>Skills  </span></h2>
                            <p></p>
                        </div>
                    </div>
                </>
            }

            <SearchBar callBackFunction={findByTitle} fields={searchFields} data={searchData} />
            {(showMentorTools || showSiteAdminTools || showGlobalAdminTools) && props.mode != "enrolled" &&
                <ToolBar toolList={toolList} />
            }
            <div className="course-list-container">
                {showLoadingBar ? (<LoadingBar />) :
                    (
                        currentCourseList &&
                        <>
                            <ul className="course-list">
                                {
                                    currentCourseList.length > 0 ? (
                                        currentCourseList.map((course, index) => (
                                            <li
                                                className={
                                                    "card "
                                                }
                                                key={index}
                                            >
                                                <LazyImage image={{ class: "course-img-card", src: course.course_image, alt: "course photo" }} />
                                                <h4 class="course-header-card">{`${course.title}`}</h4>
                                                <div class="profile-description-card">{course.description}</div>
                                                <button class="profile-link-card">
                                                    <Link
                                                        className="link"
                                                        to={`/course/${course._id}`}
                                                    >
                                                        View
                                                    </Link>
                                                </button>
                                                
                                                {props.mode == "global_admin" && props.site_id && belongsToSite(course._id, props.site_id, site_course_availability, 'course_id') && (<button onClick={() => removeFromSite(course._id)} class="remove-from-site-card">Remove from Site</button>)}
                                                {props.mode == "global_admin" && props.site_id && !belongsToSite(course._id, props.site_id, site_course_availability, 'course_id') && (<button onClick={() => addToSite(course._id)} class="add-to-site-card">Add To Site</button>)}
                                            </li>
                                        ))
                                    ) : (<div class="no-results">No Courses Found</div>)
                                }
                            </ul>
                            <div className="flex justify-center items-center w-full">
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={filteredCourses.length}
                                    pageSize={PageSize}
                                    onPageChange={page => setCurrentPage(page)}
                                />
                            </div>
                        </>
                    )
                }
            </div>
        </div>

    );
}

export default CourseList;
