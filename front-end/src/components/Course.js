/**
 * This code is a functional component that renders a course detail page.
 * The course detail page includes the course title, description, and image.
 * If the user is logged in, they have the option to enroll in the course or edit the course.
 * Admin users have the additional option to delete the course.
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update, remove } from "../slices/course";
import { create } from "../slices/enrollment";
import { useParams } from "react-router-dom";
import { findCourse, isEnrolled } from "../common/Course";
import PageAuth from "../common/PageAuth";
import ToolBar from "./ToolBar";
import SaveObjectForm from "./SaveObjectForm";


const Course = (props) => {
    const initialCourseState = {
        id: null,
        title: "",
        description: "",
        course_image: "",
        published: false
    };
    const [showAdminTools, setShowAdminTools] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(initialCourseState);
    const [toolList, setToolList] = useState(null);
    const [message, setMessage] = useState("");
    const { course_id } = useParams();
    const { currentUser } = useSelector((state) => state.auth);
    const courses  = useSelector((state) => state.course.courses);
    const enrollments = useSelector((state) => state.enrollments.enrollments);
    const dispatch = useDispatch();


    useEffect(() => {
        setCurrentCourse(findCourse(courses, course_id));
        if (currentUser) {
            setShowAdminTools(PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }
    }, [course_id, courses]);


    const updateCourse = (courseData) => {
        dispatch(update({ id: currentCourse.id, data: courseData }))
            .unwrap()
            .then(response => {
                setMessage("The course was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeCourse = () => {
        dispatch(remove(currentCourse.id))
            .unwrap()
            .then(() => {
                props.history.push("/courses");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const enrollCourse = () => {
        dispatch(create({ course_id: currentCourse.id, user_id: currentUser.id }))
            .unwrap()
            .then(() => {
                //props.history.push("/courses");
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Edit Course",
                class: "add-new-button",
                callBackOrLink: setShowEditForm
            },
            {
                type: "button",
                class: "remove-button",
                text: "Delete Course",
                callBackOrLink: removeCourse
            }
        ];

        setToolList(toolList);
    }, []);

    return (
        <div className="component-container">
            <div className="edit-form">
                <h4>Course</h4>
                {(showAdminTools) &&
                    <ToolBar toolList={toolList}/>
                }   
                {!showEditForm &&
                    <div>
                        <div>{currentCourse.title}</div>
                        <div>{currentCourse.description}</div>
                        <img src={`${currentCourse.course_image}`} />
                    </div>
                }

                {showEditForm &&
                    <SaveObjectForm schema={currentCourse} header="" callBackFunction={updateCourse} />
                }
                {currentUser && isEnrolled(courses, enrollments, currentUser._id, currentCourse._id) &&
                    <div>
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => enrollCourse(true)}
                        >
                            Enroll
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Course;
