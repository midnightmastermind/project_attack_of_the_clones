import React from "react";
import Hero from "../components/Hero";
import "../App.css";
import PageDivider from "../components/PageDivider";
import Footer from "../components/Footer";

// props for Hero component
const solutionsInfo = {
    page: 'solutions',
    heading: 'Solutions'
}

// page content
const Solutions = () => {
    return (
        <div>
            {/* Solutions Hero Image & text */}
            <Hero page={solutionsInfo} />

            {/* Our Model */}
            <div>
                <h2 className="text-4xl md:text-7xl py-5 text-center">
                    Our <span className="text-light-blue">Model</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center md:pb-5">
                    <p className="text-center md:text-left px-10 md:pl-20 md:pr-10 pb-5 text-lg md:text-xl order-last md:order-first">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim dictum quam volutpat faucibus. In tincidunt faucibus luctus. Curabitur lacus nibh, posuere id consectetur eget, sollicitudin ac lacus. In lorem risus, vestibulum non enim at, commodo vestibulum libero. Phasellus quis quam sapien. Aliquam purus enim, ultrices at laoreet at, lobortis a felis. Sed convallis justo eget felis rutrum, eu laoreet dolor euismod. Fusce nulla mi, luctus vitae orci vel, molestie scelerisque enim. Nullam mi metus, interdum et felis ut, fringilla hendrerit mauris. Cras ultricies quam nec turpis finibus dignissim. Donec sed sem cursus est dapibus dignissim.
                    </p>
                    <div className="flex justify-center px-10">
                        <img src="./ourProcess.jpg" className="px-10 pb-5 md:pr-0 md:pl-10" alt="mentor teaching mentee" />
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div className="bg-gradient-to-b from-light-blue via-dark-blue to-light-blue text-white">
                    <PageDivider shouldFlip={false} />
                    <div className="flex-col items-center w-full text-center">
                            <h3 className="text-4xl md:text-6xl pb-5">
                                How it Works
                            </h3>
                    <div className="w-full flex flex-col md:flex-row items-center justify-evenly pb-5">
                        <div>
                            <i class="fa-solid fa-star text-xl md:text-2xl text-orange pt-7" />
                            <h3 className="text-2xl md:text-4xl md:pt-3">Step One</h3>
                            <h4 className="pt-1 text-base md:text-2xl">Supporting Text</h4>
                        </div>
                        <div>
                            <i class="fa-solid fa-star text-xl md:text-2xl text-orange pt-7" />
                            <h3 className="text-2xl md:text-4xl md:pt-3">Step Two</h3>
                            <h4 className="pt-1 text-base md:text-2xl">Supporting Text</h4>
                        </div>
                        <div>
                            <i class="fa-solid fa-star text-xl md:text-2xl text-orange pt-7" />
                            <h3 className="text-2xl md:text-4xl md:pt-3">Step Three</h3>
                            <h4 className="pt-1 text-base md:text-2xl">Supporting Text</h4>
                        </div>
                    </div>
                </div>
                <PageDivider shouldFlip={true} />
             </div>

             {/* Partnership */}
            <h2 className="text-4xl md:text-7xl py-5 text-center">
                Partnership
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="flex justify-center px-10">
                    <img src="./partnership.jpg" className="px-10 pb-5 md:pl-0 md:pr-10" />
                </div>
                <div className="px-10 md:pr-20 md:pl-10">
                    <p className="text-center md:text-right pb-3 md:pb-10 text-lg md:text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dignissim dictum quam volutpat faucibus. In tincidunt faucibus luctus. Curabitur lacus nibh, posuere id consectetur eget, sollicitudin ac lacus. In lorem risus, vestibulum non enim at, commodo vestibulum libero. Phasellus quis quam sapien. Aliquam purus enim, ultrices at laoreet at, lobortis a felis. Sed convallis justo eget felis rutrum, eu laoreet dolor euismod. Fusce nulla mi, luctus vitae orci vel, molestie scelerisque enim. Nullam mi metus, interdum et felis ut, fringilla hendrerit mauris. Cras ultricies quam nec turpis finibus dignissim. Donec sed sem cursus est dapibus dignissim.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Solutions;