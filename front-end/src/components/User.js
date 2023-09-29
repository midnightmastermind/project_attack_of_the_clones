/**
 * This code is a functional component that renders a user's information.
 * It also has the ability to edit or delete the user, but this functionality is only available to users with the appropriate permissions.
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get, update, remove } from "../slices/user";
import { useParams } from "react-router-dom";
import PageAuth from "../common/PageAuth";
import SaveObjectForm from "./SaveObjectForm";
import ToolBar from "./ToolBar";

const User = (props) => {
    const initialUserState = {
        first_name: null,
        last_name: null,
        description: null
    };
    const [showAdminTools, setShowAdminTools] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentUserSelected, setCurrentUserSelected] = useState(initialUserState);
    const [toolList, setToolList] = useState(null);
    const [message, setMessage] = useState("");
    const { user_id } = useParams();
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getUser = id => {
        dispatch(get({ id }))
            .unwrap()
            .then((data) => {
                setCurrentUserSelected({
                    first_name: data.first_name,
                    last_name: data.last_name
                });
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        getUser(user_id);
        if (currentUser) {
            setShowAdminTools(PageAuth.adminAuth(currentUser) || PageAuth.globalAdminAuth(currentUser));
        }
    }, [user_id]);

    useEffect(() => {
        const toolList = [
            {
                type: "button",
                text: "Edit User",
                class: "add-new-button",
                callBackOrLink: setShowEditForm
            },
            {
                type: "button",
                class: "remove-button",
                text: "Delete User",
                callBackOrLink: removeUser
            }
        ];

        setToolList(toolList);
    }, []);

    const updateUser = (userData) => {
        dispatch(update({ id: currentUserSelected.id, data: userData }))
            .unwrap()
            .then(response => {
                setMessage("The user was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeUser = () => {
        dispatch(remove(currentUserSelected.id))
            .unwrap()
            .then(() => {
                props.history.push("/global");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="component-container">
            <h4>User</h4>
            {(showAdminTools) &&
                <ToolBar toolList={toolList} />
            }
            {!showEditForm && (<div>
                <div>{currentUserSelected.first_name} {currentUserSelected.last_name}</div>
                <div>{currentUserSelected.description}</div>
            </div>
            )}
            {showEditForm && (
                <SaveObjectForm schema={currentUser} header="" callBackFunction={updateUser} />
            )}
        </div>
    );
};

export default User;
