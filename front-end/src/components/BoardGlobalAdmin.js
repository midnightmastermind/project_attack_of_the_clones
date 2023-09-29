/**
 * This code is a functional component that renders a list of either sites, courses, or users depending on what the user has selected.
 * The selected option is stored in state and when it changes, a different list is rendered.
 */
import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import UserList from "./UserList";
import ContentService from "../services/content.service";
import EventBus from "../common/EventBus";
import SiteList from "../components/SiteList";

const BoardGlobalAdmin = () => {
    const [content, setContent] = useState("");
    const [selectedOption, setSelectedOption] = useState("sites");

    useEffect(() => {
        ContentService.getGlobalAdminBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, []);

    const handleTypeSelect = e => {
        console.log(e);
        setSelectedOption(e.target.value);
    };
    
    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
            <div className="admin-select-container">
                <label htmlFor="admin_select"></label>
                <select id="admin_select" value={selectedOption} onChange={handleTypeSelect}>
                    <option key="sites" value="sites">Sites</option>
                    <option key="courses" value="courses">Courses</option>
                    <option key="users" value="users">Users</option>
                </select>
            </div>
            {selectedOption == "sites" && (<SiteList />)}
            {selectedOption == "courses" && (<CourseList mode="global_admin" />)}
            {selectedOption == "users" && (<UserList mode="global_admin" />)}
        </div>
    );
};

export default BoardGlobalAdmin;
