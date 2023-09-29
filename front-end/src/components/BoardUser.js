/**
 * This code imports the React, useState, and useEffect hooks, as well as the CourseList, ContentService, and EventBus components.
 * It creates a BoardUser functional component that renders a list of courses that the user is enrolled in.
 */
import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import ContentService from "../services/content.service";
import EventBus from "../common/EventBus";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    ContentService.getUserBoard().then(
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
      <CourseList mode={"enrolled"} />
    </div>
  );
};

export default BoardUser;
