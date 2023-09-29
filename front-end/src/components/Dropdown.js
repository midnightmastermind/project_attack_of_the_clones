/**
 * This code is a dropdown menu.
 */
import React, {useState} from "react";
import { Link } from "react-router-dom";
import '../css/Dropdown.css';

const Dropdown = (props)=> {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <>
            <ul className={click ? 'test clicked' : `test ${props.size} `} onClick={handleClick}>
               {props.list.map((item, index) => {
                return (
                    <li key={index}>
                        <Link className={item.cName} to={item.path}>
                            {item.title}
                        </Link>
                    </li>
                )
               })}     
            </ul>
        </>
    )
}

export default Dropdown;