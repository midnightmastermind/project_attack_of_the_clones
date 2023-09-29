/**
 * This code is the Site component for the Global Admin page.
 * It renders a form for editing site information, a list of courses, and a list of users.
 **/
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../slices/site";
import { useParams } from "react-router-dom";
import PageAuth from "../common/PageAuth";
import SaveObjectForm from "./SaveObjectForm";
import CourseList from "./CourseList";
import UserList from "./UserList";
import ToolBar from "./ToolBar";

const Site = () => {
    const initialSiteState = {
        title: null,
        domain: null
    };

    const contentSchema = {
        site_image: "",
        primary_color: "",
        secondary_color: "",
        front_page_image: "",
        description: ""
    }
    const [showAdminTools, setShowAdminTools] = useState(false);
    const [showSiteEditForm, setShowSiteEditForm] = useState(false);
    const [showContentEditForm, setShowContentEditForm] = useState(false);
    const [contentToolList, setContentToolList] = useState([]);
    const [siteToolList, setSiteToolList] = useState([]);
    const [selectedOption, setSelectedOption] = useState("site");
    const [selectedSecondaryOption, setSelectedSecondaryOption] = useState("users");
    const [currentSite, setCurrentSite] = useState(initialSiteState);
    const [message, setMessage] = useState("");
    const { user: currentUser } = useSelector((state) => state.auth);
    const sites = useSelector(state => state.site.sites);

    const { site_id } = useParams();

    const dispatch = useDispatch();

    const handleTypeSelect = e => {
        console.log(e);
        setSelectedOption(e.target.value);
    };

    const handleSecondaryTypeSelect = e => {
        console.log(e);
        setSelectedSecondaryOption(e.target.value);
    };

    const updateSite = (siteData) => {
        dispatch(update({ id: currentSite.id, data: siteData }))
            .unwrap()
            .then(response => {
                setShowSiteEditForm(false);
            })
            .catch(e => {
                setShowSiteEditForm(false);
                console.log(e);
            });
    };

    const toggleSiteEditForm = () => {
        setShowSiteEditForm(!showSiteEditForm)
    }

    const toggleContentEditForm = () => {
        setShowContentEditForm(!showContentEditForm)
    }

    const updateContent = () => {
        console.log("test");
        setShowContentEditForm(false);
    }

    useEffect(() => {
        if (currentUser) {
            setShowAdminTools(PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }
        console.log(sites);
        if (site_id && sites) {
            sites.forEach((site, index) => {
                if (site._id == site_id) {
                    setCurrentSite(site);
                    console.log(site);
                }
            });
        }
    }, [sites, site_id]);

    useEffect(() => {
        const siteToolList = [
        ];

        if (!showSiteEditForm) {
            siteToolList.push({
                type: "button",
                text: "Edit Site",
                class: "add-new-button",
                callBackOrLink: toggleSiteEditForm
            })
        }
        setSiteToolList(siteToolList);

        const contentToolList = [
        ];
        if (!showContentEditForm) {
            contentToolList.push({
                type: "button",
                text: "Edit Content",
                class: "add-new-button",
                callBackOrLink: toggleContentEditForm
            })
        }
        setContentToolList(contentToolList);
    }, [sites, showContentEditForm,  showSiteEditForm]);

    return (
        <div className="component-container">
            <h4>Site</h4>
            {(showAdminTools) &&
                <div className="admin-select-container">
                    <label htmlFor="admin_select"></label>
                    <select id="admin_select" value={selectedOption} onChange={handleTypeSelect}>
                        <option key="site" value="site">Site Info</option>
                        <option key="content" value="content">Content</option>
                        <option key="availabilities" value="availabilities">Availabilities & Permissions</option>
                    </select>
                </div>
            }
            {selectedOption == "site" && (
                <div>
                    <h3>Site Information</h3>
                    {(showAdminTools && !showSiteEditForm) &&
                        <ToolBar toolList={siteToolList} />
                    }
                    {!showSiteEditForm && currentSite && (
                        <div className="site-detail-container">
                            <div>Name: {currentSite.title}</div>
                            <div>Domain: {currentSite.domain}</div>
                        </div>
                    )}
                    {showSiteEditForm && currentSite && (
                        <SaveObjectForm schema={{ title: currentSite.title, domain: currentSite.domain }} header={null} callBackFunction={updateSite} />
                    )}
                </div>
            )}
            {selectedOption == "content" && (
                <div>
                    <h3>Content</h3>
                    {(showAdminTools && !showContentEditForm) &&
                        <ToolBar toolList={contentToolList} />
                    }
                    {!showContentEditForm && currentSite && (
                        <div className="site-detail-container">
                            <div>Description: {contentSchema.description}</div>
                            <div>Site Image: {contentSchema.site_image}</div>
                            <div>Primary Color: {contentSchema.primary_color}</div>
                            <div>Secondary Color: {contentSchema.secondary_color}</div>
                            <div>Front Page Image: {contentSchema.front_page_image}</div>
                        </div>
                    )}
                    {showContentEditForm && (<SaveObjectForm schema={contentSchema} header={null} callBackFunction={updateContent} />)}
                </div>
            )}
            {selectedOption == "availabilities" && (
                <div>
                    <h3>Availabilities</h3>
                    {(showAdminTools) && (
                        <div className="admin-select-container">
                            <label htmlFor="availability_select"></label>
                            <select id="availability_select" value={selectedSecondaryOption} onChange={handleSecondaryTypeSelect}>
                                <option key="courses" value="courses">Courses</option>
                                <option key="users" value="users">Users</option>
                            </select>
                        </div>
                    )}
                    {selectedSecondaryOption == "courses" && (<CourseList site_id={site_id} mode="global_admin" />)}
                    {selectedSecondaryOption == "users" && (<UserList site_id={site_id} mode="global_admin" />)}
                </div>
            )}
        </div>
    );
};

export default Site;
