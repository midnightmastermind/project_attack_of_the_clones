import React, { useState, useEffect } from "react";
import ContentService from "../services/content.service";
import CourseList from "../components/CourseList";
import UserList from "../components/UserList";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        ContentService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div>
            <div className="container">
                <header className="jumbotron">
                    <h3>{content}</h3>
                </header>
            </div>
            <div>
                <h2>
                    Courses
                </h2>
                <CourseList />
            </div>
            <div>
                <h2>
                    Mentors
                </h2>
                <UserList mode="mentor" />
            </div>
        </div>
    );
};

export default Home;
