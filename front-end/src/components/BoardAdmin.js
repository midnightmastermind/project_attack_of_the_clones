/**
 * This code is the BoardAdmin page.
 * It contains a header and two lists, one for courses and one for users.
 * The header contains content that is fetched from the ContentService.
 * The lists are fetched from the CourseList and UserList components.
 */
import React, { useState, useEffect } from "react";
import CourseList from "../components/CourseList";
import UserList from "./UserList";
import ContentService from "../services/content.service";
import EventBus from "../common/EventBus";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    ContentService.getAdminBoard().then(
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
      <CourseList mode={'admin'}/>
      <UserList mode={'admin'}/>
    </div>
  );
};

export default BoardAdmin;
