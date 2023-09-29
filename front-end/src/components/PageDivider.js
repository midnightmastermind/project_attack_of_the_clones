/** Shape divider component renders div w/ className determined by shouldFlip prop. If shouldFlip is true, shape divider is flipped vertically. */

import React from "react";
import '../css/PageDivider.css';

const PageDivider = ({shouldFlip}) => {
    return (
        <div className={`${shouldFlip ? 'flipped' : ''} shape-divider relative block w-full overflow-hidden h-24 md:h-32`}>
            <svg dataname="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-40 md:h-80">
                <path d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z" className="shape-fill"></path>
            </svg>
        </div>
    );
}

export default PageDivider;