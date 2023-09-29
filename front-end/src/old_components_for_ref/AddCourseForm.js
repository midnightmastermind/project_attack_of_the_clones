import React, { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Navigate } from 'react-router-dom';
import { create } from "../slices/course";
import PageAuth from "../common/PageAuth";
import { getAllForSite as getAllCoursePermissionsForSite } from "../slices/course_permissions";

const AddCourseForm = () => {
    const initialCourseState = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const [course, setCourse] = useState(initialCourseState);
    const [submitted, setSubmitted] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    if (!PageAuth.mentorAuth(currentUser)) {
      return <Navigate to="/login" />;
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCourse({ ...course, [name]: value });
    };

    const saveCourse = () => {
        const { title, description } = course;
        dispatch(create({title, description}))
            .unwrap()
            .then(data => {
                setCourse({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    published: data.published
                });
                dispatch(getAllCoursePermissionsForSite());

                setSubmitted(true);

            })
            .catch(e => {
                console.log(e);
            });
    };

    const newCourse = () => {
        setCourse(initialCourseState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newCourse}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={course.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={course.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveCourse} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddCourseForm;
