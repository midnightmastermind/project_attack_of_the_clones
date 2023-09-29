/** Carousel component that takes in props for carousel items
 * Renders carousel w/ given style & props.
*/
import React, { useState } from "react";

const Carousel = ({ props }) => {
    // style could go in own css file, unsure how to apply atm
    // const carouselItemStyle = {
    //     height: '20rem',
    //     width: '25%',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     transition: '1s cubic-bezier(0.39, 0.575, 0.565, 1)'
    // };

    const carouselItems = ["1", "2", "3", "4"];

    // initially sets state of currentIndex to 0
    const [currentIndex, setCurrentIndex] = useState(0);

    // function to scroll carousel
    const carouselScroll = () => {
        // if carousel is on last item, return to beginning of carousel
        if (currentIndex === carouselItems.length-1) {
            return setCurrentIndex(0);
        };
        // otherwise, move to next item in the carousel
        return setCurrentIndex(currentIndex+1);
    };


    return (
        <div className="flex flex-nowrap overflow-hidden">
            { carouselItems.map((index) => {
                // this functionality only displays &slides 1 carousel item at a time... need to be able to display 4 but only slide 1
                return <div style={{transform: `translate(-${currentIndex * 100}%)`}} key={index}>{props.carouselItem}</div>})
            }
        </div>
    )
}

export default Carousel;