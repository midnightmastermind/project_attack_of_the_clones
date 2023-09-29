import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAll, searchByName, getAll, getAllByType, getAllByMentor } from "../slices/user";

import { Link } from "react-router-dom";
import PageAuth from "../common/PageAuth";

const UserList = (props) => {
    const [currentUserSelected, setCurrentUserSelected] = useState(null);
    const [showMentorTools, setShowMentorTool] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");
    const { user: currentUser } = useSelector((state) => state.auth);
    
    const users = useSelector(state => state.user.users);

    const dispatch = useDispatch();

    useEffect(() => {
        if (props.mode) {
            if(props.mode == "enrolled") {
                dispatch(getAllByMentor(currentUser));
            } else {
                dispatch(getAllByType(props.mode));

            }
        } else {
            dispatch(getAll());
        }
        if(currentUser) {
            setShowMentorTool(PageAuth.adminAuth(currentUser));
        }
    }, [dispatch]);

    const refreshData = () => {
        setCurrentUserSelected(null);
        setCurrentIndex(-1);
    };

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const setActiveUser = (user, index) => {
        setCurrentUserSelected(user);
        setCurrentIndex(index);
    };

    // const removeAllUsers = () => {
    //     dispatch(removeAll())
    //         .unwrap()
    //         .then(() => {
    //             refreshData();
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         });
    // };

    const findByName = () => {
        refreshData();
        dispatch(searchByName({ searchName }));
    };
    
    return (
        <div className="component-container">
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name"
                            value={searchName}
                            onChange={onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={findByName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                {showMentorTools &&
                    <div>
                        {showMentorTools && 
                            <Link
                                to={"/users/new"}
                                className="badge badge-warning"
                            >
                                Add New User
                            </Link>
                        }
                    </div>
                }
                <div className="col-md-6">
                    <h4>Users List</h4>
                    <ul className="list-group user-list">
                        {users &&
                            users.map((user, index) => (
                                <li
                                    className={
                                        "list-group-item " + (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => setActiveUser(user, index)}
                                    key={index}
                                >
                                    {`${user.first_name} ${user.last_name}`}
                                </li>
                            ))
                        }
                    </ul>
                    {/* { showMentorTools &&
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={removeAllUsers}
                        >
                            Remove All
                        </button>
                    } */}
                </div>
                <div className="col-md-6">
                    {currentUserSelected ? (
                        <div className="user">
                            <div>
                                <h4>User</h4>
                            </div>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>
                                {`${currentUserSelected.first_name} ${currentUserSelected.last_name}`}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>
                                {currentUserSelected.description}
                            </div>
                            <div className="user-image">
                                <img src={`${currentUserSelected.user_image}`} />
                            </div>

                            <Link
                                to={"/users/" + currentUserSelected._id}
                                className="badge badge-warning"
                            >
                                User Profile
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a User...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserList;
