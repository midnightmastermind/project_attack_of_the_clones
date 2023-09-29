/** Card component that takes in props for photo, title, tagline, location, rating, & price (if applicable)
Renders card w/ given style & props */

import React from "react";

const Card = ({}) => {
    return (
        <div className="border-2 border-slate rounded-lg shadow-md m-2 md:m-5 flex flex-col text-center p-1 md:p-3 w-2/5 md:w-1/4">

            {/* Mentor profile pic: replace placeholder img w/ mentor img from db */}
            <div className="flex flex-col h-fit w-fit px-10 pt-5">
                <img src="/mentorPicPlaceholder.jpg" alt="mentor profile picture" className="rounded-full" />
            </div>

            {/* Mentor name & tagline: replace placeholders w/ mentor name & tagline from db (tagline created during mentor profile creation) */}
            <h2 className="text-base md:text-lg lg:text-xl font-bold p-0.5 md:p-2">Mentor Name</h2>
            <p className="text-sm md:text-base">Here's a tagline the mentor wrote to encourage you to learn from them!</p>

            {/* Mentor location: replace placeholder w/ mentor location from db */}
            <p>
                <i className="fa-solid fa-location-dot text-orange p-2 text-base leading-4" />
                <span className="text-sm">
                    Madison, WI (online, in person)
                </span>
            </p>

            {/* Mentor price & rating: replace placeholders w/ mentor price & rating from db */}
            <div className="flex flex-row place-content-center gap-x-1 lg:gap-x-10">
                <p>
                    <span className="font-bold">$Price</span>/time {/* not all mentors will have pricing */}
                </p>
                <p>  {/* Rating should not appear if no mentees have rated this mentor yet */}
                    <i className="fa-solid fa-star text-orange p-1" />
                    <span className="font-bold">4.9</span>
                </p>
            </div>

            {/* See More & Chat icons
            See More will open a modal w/ more detailed info
            Chat icon will open dm (or chat, whichever they decide) to message mentor */}
            <div className="flex flex-row justify-end">
                <i className="fa-solid fa-eye text-orange p-1 text-2xl"></i>
                <i className="fa-solid fa-comment-dots text-orange p-1 text-2xl"></i>
            </div>
        </div>
    )
}

export default Card;