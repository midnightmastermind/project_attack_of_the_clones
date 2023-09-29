import React from "react";
import Hero from "../components/Hero";
import Button from "../components/Button";
// import WaveDivider from "../components/WaveDivider"


const GetStarted = () => {
    // props for Hero component
    const getStartedInfo = {
        page: 'GetStarted',
        heading: 'Get Started'
    }

    // props for Button component
    const getStartedButton = {
        style: {
            color: 'white',
            backgroundColor: 'var(--orange)',
            border: '2px solid transparent',
            borderRadius: '50px'
        },   
        text: 'Get Started',
        link: '/login'
    }

    // page content
    return (
        <div>
            <Hero page={getStartedInfo}/>
            <div>
                {/* Our Process */}
                <h2 className="text-4xl md:text-7xl py-5 text-center">Our <span className="text-light-blue">Process</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center md:pb-5">
                    <p className="text-center md:text-left px-10 md:pl-20 md:pr-10 pb-5 text-lg md:text-xl order-last md:order-first">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper susipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
                    </p>
                    <div className="flex justify-center px-10">
                        <img src="./ourProcess.jpg" className="px-10 pb-5 md:pr-0 md:pl-10" />
                    </div>
                </div>

                <div>
                    <img src="./waveDivider.png" alt="section divider" className="w-full" />
                </div>

                {/* Be Mentored */}
                <h2 className="text-4xl md:text-7xl py-5 text-center">
                    Be <span className="text-light-blue">Mentored</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="flex justify-center px-10">
                        <img src="./beMentored.jpg" className="px-10 pb-5 md:pl-0 md:pr-10" />
                    </div>
                    <div className="px-10 md:pr-20 md:pl-10">
                        <p className="text-center md:text-right pb-3 md:pb-10 text-lg md:text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper susipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
                        </p>
                        <div className="flex justify-center md:justify-end">
                            <Button props={getStartedButton} />
                        </div>
                    </div>
                </div>

                <div>
                    <img src="./waveDivider.png" alt="section divider" className="w-full rotate-180" />
                </div>

                {/* Become a Mentor */}
                <h2 className="text-4xl md:text-7xl py-5 text-center">Become a <span className="text-light-blue">Mentor</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center md:pb-5">
                    <div className="px-10 md:pl-20 md:pr-10 md:pb-5 order-last md:order-first">
                        <p className="text-center md:text-left pb-3 md:pb-10 text-lg md:text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper susipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
                        </p>
                        <div className="flex justify-center md:justify-start">
                            <Button props={getStartedButton} />
                        </div>
                    </div>
                    <div className="flex justify-center px-10">
                        <img src="./becomeMentor.jpg"  className="px-10 pb-5 md:pr-0 md:pl-10" />
                    </div>
                </div>

                <div>
                    <img src="./waveDivider.png" alt="section divider" className="w-full" />
                </div>

                {/* Become a Skills-Based Coach */}
                <h2 className="text-4xl md:text-7xl py-5 text-center">Become a <span className="text-light-blue">Skills-Based Coach</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                    <div className="flex justify-center px-10">
                        <img src="./skillsCoach.png" className="px-10 pb-5 md:pl-0 md:pr-10" />
                    </div>
                    <div className="px-10 md:pr-20 md:pl-10">
                        <p className="text-center md:text-right pb-3 md:pb-10 text-lg md:text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper susipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel
                        </p>
                        <div className="flex justify-center md:justify-end">
                            <Button props={getStartedButton} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GetStarted;