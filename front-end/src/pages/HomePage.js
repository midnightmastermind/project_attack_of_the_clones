import React from "react";
import PageDivider from "../components/PageDivider";
import Button from "../components/Button";
import Hero from "../components/Hero";
import TextOverImage from "../components/TextOverImage";
import { Link } from "react-router-dom";
import Card from "../components/Card"

// props for Hero component
const homeInfo = {
    page: 'home',
    heading: 'MentorX'
}

// props for image button links in "What's Right for You"
const imgBtnLinks = {
    browseCourses: '/courses',
    findMentor: '/mentors',
    becomeMentor: '/GetStarted',
    beMentored: '/GetStarted',
    skillsCoaching: '/GetStarted'
}

// props for content of TextOverImage components in "What's Right For You"
const browseCourseContent = {
    src: '/browseCoursesThumbnailHomepage.jpg',
    title: 'Browse Courses'
}

const findMentorContent = {
    src: '/findMentorThumbnailHomepage.jpg',
    title: 'Find a Mentor'
}

const becomeMentorContent = {
    src: '/becomeMentorThumbnailHomepage.jpg',
    title: 'Become a Mentor'
}

const beMentoredContent = {
    src: '/beMentoredThumbnailHomepage.jpg',
    title: 'Be Mentored'
}

const skillsCoachingContent = {
    src: '/skillsCoachingThumbnailHomepage.jpg',
    title: 'View Skills-Based Coaching'

}

// props for Learn More Button component in "How We Help"
const learnMoreButton = {
    style: {
        color: 'white',
        backgroundColor: 'var(--orange)',
        border: '2px solid transparent',
        borderRadius: '50px'
    },
    text: 'Learn More',
    type: 'button',
    link: '/solutions'
}

// page content
const HomePage = () => {
    return (
        <div>
            {/* Home Page Hero Image & Text */}
            <Hero page={homeInfo} />

            {/* What's Right for You Header */}
            <div className="text-center pt-5">
                <h2 className="text-4xl md:text-7xl">
                    What's Right for <span className="text-blue">You</span>
                </h2>
                <h4 className="text-xl md:text-3xl pt-4">
                    Browse our features tailored for you.
                </h4>
            </div>

            {/* What's Right For You Content */}
            <div className="flex flex-wrap justify-center p-5">
                <Link to={imgBtnLinks.browseCourses}>
                    <TextOverImage page={browseCourseContent} />
                </Link>
                <Link to={imgBtnLinks.findMentor}>
                    <TextOverImage page={findMentorContent} />
                </Link>
                <Link to={imgBtnLinks.becomeMentor}>
                    <TextOverImage page={becomeMentorContent} />
                </Link>
                <Link to={imgBtnLinks.beMentored}>
                    <TextOverImage page={beMentoredContent} />
                </Link>
                <Link to={imgBtnLinks.skillsCoaching}>
                    <TextOverImage page={skillsCoachingContent} />
                </Link>
            </div>

            {/* How We Help */}
            <div className="bg-gradient-to-b from-light-blue via-dark-blue to-light-blue text-white w-full">

                <PageDivider shouldFlip={false} />

                <div className="px-5 flex flex-col items-center w-full md:w-auto">
                    <h3 className="text-4xl md:text-6xl pb-5 text-center">How We Help</h3>

                    {/* Image, List, 'Learn More' Button */}
                    <div className="w-full flex flex-row items-center justify-evenly pb-10">
                        <img className="w-[50%] h-[50%] md:px-20" src="/help.jpg" alt="help" />

                        {/* Bullet Point List */}
                        <ul className="w-full pr-5 list-none">
                            <li className="pb-2 md:pb-5">
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason One</span>
                            </li>
                            <li className="pb-2 md:pb-5">
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason Two</span>
                            </li>
                            <li>
                                <i className="fa-solid fa-star text-xl md:text-2xl text-orange p-2" />
                                <span className="text-lg md:text-2xl">Reason Three</span>
                            </li>
                        </ul>

                    </div>
                    <Button props={learnMoreButton} />
                </div>

                    <PageDivider shouldFlip={true} />
            </div>

            {/* Top Mentors */}
            <div>
                <h3 className="text-4xl md:text-6xl pb-2 pt-5 text-center">Top <span className="text-light-blue">Mentors</span></h3>
                <h4 className="text-l md:text-3xl pt-4 text-center">
                    Browse some of our best mentors.
                </h4>
                <div className="flex md:flex-row flex-wrap place-content-evenly md:flex-nowrap">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default HomePage;