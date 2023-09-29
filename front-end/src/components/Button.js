/** Button component that takes in props for style, link, type, & text.
Renders button w/ given style & props. 

Style that is included in this component:
text size (responsive)
padding (responsive)
box shadow

Any other styling elements that you wish to add to this component must be added via the props.style of the page on which this component is placed.*/

import React from "react";
import { Link } from "react-router-dom";

const Button = ({ props }) => {

    return (
        <div className="font-semibold">
            {props.link ? (
                <Link to={props.link}>
                    <button style={props.style} className="text-lg lg:text-xl px-4 py-1 md:px-12 md:py-2 shadow-md" type={props.type}>{props.text}</button>
                </Link>
                ) : (
                    <button style={props.style} className="text-lg md:text-xl px-4 py-1 md:px-12 md:py-2 shadow-md" type={props.type} onClick={props.action}>{props.text}</button>
                )
            }
        </div>
    )
}

export default Button;