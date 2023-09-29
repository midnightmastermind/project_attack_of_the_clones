    import React, { useState } from "react";
    import Slider from 'rc-slider';
    import 'rc-slider/assets/index.css';   

    // const marks = {
    //     0: '0',
    //     25: '25',
    //     50: '50'
    // };

    const sliderWidth = 300;

    const CustomSlider = ({ skill, sliderValue, onSliderChange, min, max }) => {

        const handleInputChange = (e) => {
            const inputValue = parseInt(e.target.value);
            
            // Update the slider value using onSliderChange
            onSliderChange(inputValue);
        }        

    return (
        <form>
            <div className="grid grid-cols-3 gap-3 items-center mt-4">
                <p>{skill}</p>
                <Slider
                    min={min}
                    max={max}
                    value={sliderValue}
                    onChange={onSliderChange}
                    // railStyle={{backgroundColor:"#39f"}}
                    trackStyle={{backgroundColor: "clicked-blue", height:10   }}
                    railStyle={{
                        width: sliderWidth,
                        height: 10 // Set the width of the slider rail
                    }}
                    style={{
                        width: sliderWidth,
                        height: 10 // Set the overall width of the slider
                    }}
                    handleStyle={{
                        width: 20,
                        height: 20,
                    }}
                    // marks={marks}
                    handleRender={renderProps => {
                        return (
                            <div {...renderProps.props}>
                                <p className="text-sm mt-4">
                                    {sliderValue > 25 ? 25 : sliderValue}
                                </p>
                            </div>
                        );
                    }}

                />
                <input onChange={handleInputChange} className='w-10 text-center ml-5 mt-2 rounded-md items-center border-2 border-light-blue' value={sliderValue} />
            </div>
        </form>
    );
    };

    //test
    export default CustomSlider;
