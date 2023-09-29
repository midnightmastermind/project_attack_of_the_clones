import React from "react";
import Hero from "../components/Hero";
import PageDivider from "../components/PageDivider";
import Button from "../components/Button";

// props for Hero component
const aboutInfo = {
    page: 'about',
    heading: 'About'
}

// props for Privacy Policy button
const privacyButton = {
    style: {
        color: 'white',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '50px'
    },
    text: 'Privacy Policy',
    type: 'button',
    link: '/solutions' /* test link; needs to go to privacy policy once we have one */
}

// props for Team Member button
const teamMemberButton = {
    style: {
        color: 'white',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '50px'
    },
    text: 'Learn More',
    type: 'button',
    link: '/' /* currently goes to home - prob will be for team member modal? */
}

// page content
const About = () => {
    return (
        <div>
            {/* About Hero Image & Text */}
            <Hero page={aboutInfo} />
            
            {/* Who We Are */}
            <div className="text-center p-3">
                <h2 className="text-4xl md:text-7xl">Who We <span className="text-light-blue">Are</span></h2>
                <p className="p-3 text-lg md:text-3xl">Company bio</p>
                <Button props={privacyButton} />
            </div>
            
            {/* Company Mission */}
            <div className="bg-gradient-to-b from-light-blue via-dark-blue to-light-blue text-white">
                <PageDivider shouldFlip={false} />
                <div className="text-center">
                    <h3 className="text-3xl md:text-6xl p-3">Company Mission/Vision</h3>
                    <p className="text-lg md:text-2xl p-3">Mission statement</p>
                </div>
                <PageDivider shouldFlip={true} />
            </div>
            
            {/* Team Members */}
            <div className="flex flex-col md:flex-row pt-5 px-5 pb-0">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                    <img src="/" className="p-3" alt="Team Member photo" />
                </div>
                <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
                    <h2 className="text-3xl md:text-4xl px-3 pb-3">Team Member</h2>
                    <p className="text-xl md:text-2xl px-3 pb-3">Title</p>
                    <Button props={teamMemberButton} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row pt-5 px-5 pb-0">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                    <img src="/" className="p-3" alt="Team Member photo" />
                </div>
                <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
                    <h2 className="text-3xl md:text-4xl px-3 pb-3">Team Member</h2>
                    <p className="text-xl md:text-2xl px-3 pb-3">Title</p>
                    <Button props={teamMemberButton} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row pt-5 px-5 pb-0">
                <div className="w-full md:w-[40%] flex items-center justify-center">
                    <img src="/" className="p-3" alt="Team Member photo" />
                </div>
                <div className="w-full md:w-[60%] flex flex-col items-center md:items-start">
                    <h2 className="text-3xl md:text-4xl px-3 pb-3">Team Member</h2>
                    <p className="text-xl md:text-2xl px-3 pb-3 px-3 pb-3">Title</p>
                    <Button props={teamMemberButton} />
                </div>
            </div>
        </div>
    );
}

export default About;