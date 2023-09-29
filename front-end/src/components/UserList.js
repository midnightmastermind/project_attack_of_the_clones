/**
 * This code is a react component that renders a list of users.
 * The list can be filtered by mode, which can be either student, mentor, admin, or global_admin.
 * The code also includes a search bar that allows the user to search for a specific user by first name, last name, or description
 */
import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../css/UserList.css';

import { create as createSitePermissions, update as updateSitePermissions, remove as removeSitePermissions } from "../slices/user_site_availability";
import { create as createUserSiteAvailability, remove as removeUserSiteAvailability } from "../slices/user_site_availability";
import { Link } from "react-router-dom";
import PageAuth from "../common/PageAuth";
import { filterUsers, filterStudents, filterUsersBySite } from "../common/User";
import { belongsToSite } from "../common/Site";
import LoadingBar from "./LoadingBar";
import Hero from "./Hero"
import SearchBar from "./SearchBar";
import "../App.css";
import Pagination from "./Pagination";
import ToolBar from "./ToolBar";

const PageSize = 9;

const heroPageInfo = {
    page: 'contact',
    heading: 'Browse Mentors',
    search: false
};

const searchFields = ["first_name", "last_name", "description"];
const UserList = (props) => {
    const [showLoadingBar, setShowLoadingBar] = useState(true);
    const [filteredUsers, setFilteredUsers] = useState(null);
    const [searchData, setSearchData] = useState([]);
    const [showSiteAdminTools, setShowSiteAdminTools] = useState(false);
    const [showGlobalAdminTools, setShowGlobalAdminTools] = useState(false);
    const [showMentorTools, setShowMentorTools] = useState(false);
    const [toolList, setToolList] = useState(null);

    const [currentSite, setCurrentSite] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    const { users } = useSelector(state => state.user);
    const { user: currentUser } = useSelector((state) => state.auth);
    const { enrollments } = useSelector((state) => state.enrollment);
    const { course_permissions } = useSelector((state) => state.course_permissions);
    const { fetched: fetchedUsers } = useSelector((state) => state.user);

    const { sites, current_site: site } = useSelector((state) => state.site);
    const { user_site_availability } = useSelector((state) => state.user_site_availability);
    const site_permissions = useSelector((state) => state.site_permissions.site_permissions);
    const dispatch = useDispatch();


    useEffect(() => {
        if (currentUser) {
            setShowMentorTools(PageAuth.mentorAuth(currentUser));
            setShowSiteAdminTools(PageAuth.adminAuth(currentUser));
            setShowGlobalAdminTools(PageAuth.globalAdminAuth(currentUser));
        }

        if (users) {
            let filtered = [];
            if (props.mode == "student") {
                
                //filter to only enrolled
                filtered = filterStudents(users, enrollments, course_permissions, currentUser);
                setFilteredUsers(filtered);
                setSearchData(filtered);
            } else if (props.mode == "mentor") {
                
                if (currentUser && (PageAuth.mentorAuth(currentUser) || PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser))) {
                    filtered = filterUsers(users, course_permissions);
                    setFilteredUsers(filtered);
                    setSearchData(filtered);
                } else {
                    setFilteredUsers(users);
                    setSearchData(users);
                }
            } else if (props.mode == "admin") {
                
                setFilteredUsers(users);
                setSearchData(users);
            } else if (props.mode == "global_admin") {
                
                setFilteredUsers(users);
                setSearchData(users);
            } else {
                setFilteredUsers(users);
                setSearchData(users);
            }
        }

    }, [dispatch, users, enrollments, course_permissions, sites, site_permissions]);

    useEffect(() => {
        if (filteredUsers !== null && fetchedUsers) {
            setShowLoadingBar(false);
        }
    }, [filteredUsers, fetchedUsers]);

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Create New User",
                icon: "fa-plus",
                class: "add-new-button",
                callBackOrLink: "/user/new"
            }
        ];
        console.log(props);
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


    const findByName = (users) => {
        setFilteredUsers(users);
        setCurrentPage(1);
    };

    const addSitePermission = (e, site_id, user_id) => {
        dispatch(createSitePermissions({ user_id: user_id, site_id: site_id, role: e.target.value }))
            .unwrap()
            .then(() => {
                //props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateSitePermission = (e, site_permission_id) => {
        dispatch(updateSitePermissions(site_permission_id, { role: e.target.value }))
            .unwrap()
            .then(() => {
                //props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };


    const addToSite = (user_id, site_id) => {
        if (!site_id) {
            site_id = currentSite
        }
        dispatch(createUserSiteAvailability({ user_id: user_id, site_id: site_id }))
            .unwrap()
            .then(() => {
                //props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeFromSite = (user_id, site_id, site_permission_id) => {
        if (!site_id) {
            site_id = currentSite;
        }
        dispatch(removeUserSiteAvailability({ user_id: user_id, site_id: site_id })
            .unwrap()
            .then(() => {
                dispatch(removeSitePermissions(site_permission_id)
                    .unwrap()
                    .then(() => {
                        //props.history.push("/users");
                    })
                    .catch(e => {
                        console.log(e);
                    }))
            })
            .catch(e => {
                console.log(e);
            })
        )
    };

    const currentUserList = useMemo(() => {
        if (filteredUsers != null) {
            const firstPageIndex = (currentPage - 1) * PageSize;
            const lastPageIndex = firstPageIndex + PageSize;
            return filteredUsers.slice(firstPageIndex, lastPageIndex);
        }
    }, [currentPage, filteredUsers]);

    const onChangeSite = (site) => {
        console.log(site);
        if (site !== "All") {
            setCurrentSite(site);
            let filtered = filterUsersBySite(users, user_site_availability, site);
            setFilteredUsers(filtered);
            setSearchData(filtered);
        } else {
            setCurrentSite(null);
            setFilteredUsers(users);
            setSearchData(users);
        }
    }

    return (
        <div>
            {/* Find a Mentor Hero Image & text */}
            {(props.mode && (props.mode != "global_admin" && props.mode != "admin")) && (<Hero page={heroPageInfo} />)}
            {/* Expand Your Skills */}
            {props.mode == "mentor" && (
                <div className="w-full text-center flex">
                    <div className="flex flex-col w-full">
                        <h2 className="text-6xl">Expand your <span style={{ color: '#0093CB' }}>Skills</span></h2>
                        <p>Our mentors hold a variety of knowledge they wish to share with you.</p>
                    </div>
                </div>
            )}
            <SearchBar callBackFunction={findByName} fields={searchFields} data={searchData} />
            {(showMentorTools || showSiteAdminTools || showGlobalAdminTools) &&
                <ToolBar toolList={toolList} />
            }
            <div className="user-list-container">
                {showLoadingBar ? (<LoadingBar />) :
                    (
                        currentUserList &&
                        <>
                            <ul className="user-list">
                                {
                                    currentUserList.length > 0 ? (
                                        currentUserList.map((user, index) => (
                                            <li
                                                className={
                                                    "card "
                                                }

                                                key={index}
                                            >
                                                <img class="profile-img-card" src={`${user.profile_image}`} alt="mentor photo"></img>
                                                <h4 class="profile-header-card">{`${user.first_name} ${user.last_name}`}</h4>
                                                <div class="profile-description-card">{user.description}</div>
                                                <button class="profile-link-card">
                                                    <Link
                                                        className="link"
                                                        to={`/user/${user._id}`}
                                                    >
                                                        View
                                                    </Link>
                                                </button>

                                                {props.mode == "global_admin" && site_permissions &&
                                                    site_permissions.map(site_permission => {
                                                        if (site_permission.user_id == user._id && site_permission.site_id == props.site_id) {
                                                            if (!belongsToSite(user._id, props.site_id, user_site_availability, 'user_id')) {
                                                                return (
                                                                    <div>
                                                                        <button onClick={() => addToSite(user._id, props.site_id)} class="add-to-site-card">Add To Site</button>
                                                                        <select id="permission_select" value="" onChange={(e) => addSitePermission(e, props.site_id, user._id)}>
                                                                            <option value="">---Select Permission--</option>
                                                                            <option value="user">User</option>
                                                                            <option value="mentor">Mentor</option>
                                                                            <option value="site_admin">Site Admin</option>
                                                                        </select>
                                                                    </div>
                                                                )
                                                            } else {
                                                                return (
                                                                    <div>
                                                                        <button onClick={() => removeFromSite(user._id, props.site_id, site_permission._id)} class="remove-from-site-card">Remove from Site</button>
                                                                        <select id="permission_select" value={site_permission.roles.name} onChange={(e) => updateSitePermission(e, site_permission._id)}>
                                                                            <option value="user">User</option>
                                                                            <option value="mentor">Mentor</option>
                                                                            <option value="site_admin">Site Admin</option>
                                                                        </select>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                    })
                                                }
                                            </li>
                                        ))
                                    ) : (<div class="no-results">No Users Found</div>)
                                }
                            </ul>
                            <div className="d-flex justify-content-center align-items-center w-100">
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={currentPage}
                                    totalCount={filteredUsers.length}
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

export default UserList;