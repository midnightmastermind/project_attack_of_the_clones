/**
 * This code is a functional react component that renders a toolbar.
 * The toolbar consists of either buttons or a select dropdown, which are determined by the 'type' key in the props.
 * If the type is 'button', then a Link is rendered within a button.
 * If the type is 'select', then a select drop
 */
import React from 'react';
import { Link } from "react-router-dom";
import "./ToolBar.css";

const ToolBar = (props) => {
    return (
    <div className="list-tools">
        <div className="list-tools-title">Tools: </div>
        {props && props.toolList.length > 0 &&
            props.toolList.map((tool, index) => {
                if (tool.type == "button") {
                    return (
                        <div key={index}>
                            <button className={`${tool.class} badge badge-primary`}>
                                <Link
                                    className="link"
                                    to={typeof tool.callBackOrLink == "function" ? "" : tool.callBackOrLink}
                                    onClick={typeof tool.callBackOrLink == "function" ? (() => tool.callBackOrLink()) : ""}
                                >
                                    {tool.icon && (<i className={`fa-solid ${tool.icon}`}></i>)}
                                    {`${tool.text}`}
                                </Link>
                            </button>
                        </div>
                    )
                } else if (tool.type == "select") {
                    return (
                        <div key={index} className="select-container">
                            <select onChange={(e) => tool.callBackFunction(e.target.value)}>
                                <option key={'all_sites'} value="All">{tool.text}</option>
                                {
                                    tool.options.map((option, index) => (
                                        <option key={index} value={option._id}>{option[tool.textIndex]}</option>
                                    ))
                                }
                            </select>
                        </div>
                    )
                }
            })
        }
    </div>
);
    }

export default ToolBar;
