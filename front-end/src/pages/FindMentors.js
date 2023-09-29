import React from "react";
import Hero from "../components/Hero";
import Button from "../components/Button";
import "../App.css";

const findMentorsInfo = {
    page: 'find-mentors',
    heading: 'Browse Mentors'
}

const mentorButtons = {
    text: 'Learn More'
}

const FindMentors = () => {
    return (
        <div>
            {/* Find a Mentor Hero Image & text */}
            <Hero page={findMentorsInfo} />

            {/* Expand Your Skills */}
            <div>
                <div className="text-center">
                    <h2 className="p-3 text-4xl md:text-7xl">Expand your <span className="text-light-blue">Skills</span></h2>
                    <p>Our mentors hold a variety of knowledge they wish to share with you. Come meet them!</p>
                </div>
            </div>

            {/* Mentor Previews */}
            <div className="row row-cols-3 px-5 text-center">
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <Button props={mentorButtons} />
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
                <div className="col p-5">
                    <img src="/" alt="mentor photo"></img>
                    <h4>Name</h4>
                    <p>Skills Preview</p>
                    <button>Learn More</button>
                </div>
            </div>
        </div>
    )
}

export default FindMentors;