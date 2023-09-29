/**
 * This is a BoardMentor functional component that renders a list of courses and a list of users.
 * It uses the useState and useEffect hooks.
 * When the component mounts, it calls the ContentService to get data and stores it in the content state variable.
 * If there is an error getting the data, it sets
 */
import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import ContentService from "../services/content.service";
import EventBus from "../common/EventBus";
import UserList from "./UserList";

const BoardMentor = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        ContentService.getMentorBoard().then(
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

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
            <CourseList mode={"owned"} />\
            <UserList mode={"student"} />
        </div>
    );
};

export default BoardMentor;
