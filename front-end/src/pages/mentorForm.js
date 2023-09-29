import React, { useState, useEffect } from "react";
import logo from "../logo.png";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
// import 'rc-slider/assets/index.css';
import CustomSlider from "../components/Slider";

const CustomHandle = ({ value, dragging, index, ...restProps }) => {
    // State to track whether the value should be shown or not
    const [showValue, setShowValue] = useState(false);
  
    const handleMouseEnter = () => {
      setShowValue(true);
    };
  
    const handleMouseLeave = () => {
      setShowValue(false);
    };
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          // Customize the appearance of the handle here (e.g., style, size, etc.)
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "2px solid #39f",
          backgroundColor: dragging ? "#39f" : "#fff",
          color: "#39f",
          textAlign: "center",
          lineHeight: "24px",
          cursor: "pointer",
        }}
        {...restProps}
      >
        {showValue && <div>{value}</div>}
      </div>
    );
  };

const MentorForm = () => {
    const [page, setPage] = useState(1);
    const [selectedPreferenceIndex, setSelectedPreferenceIndex] = useState(-1);
    const [error, setError] = useState(null);
    const [zipCodeClassNames, setZipCodeClassNames] = useState('text-center rounded-md h-10 mt-3 border-2 border-light-blue');

    const minSliderRange = 0;
    const maxSliderRange = 25;
    //temporary mentor datastructure format
    const [mentor, setMentor] = useState({
        zip: null,
        locationPreference: null,
        // mentoring style props
        styles: {
            choice1: {style: 'Break down large goals into smaller ones', checked: false},
            choice2: {style: "Collaborative goal setting to align with mentee's interests and strengths", checked: false},
            choice3: {style: 'Sustainable, measurable, achievable, relevant, and timely (SMART) goal setting', checked: false},
            choice4: {style: 'Regular reassessment based on progress', checked: false},
            choice5: {style: 'Goal-setting framework such as OKRs (objectives and key results)', checked: false},
            choice6: {style: 'Prioritize goals based on urgency and impact', checked: false},
            choice7: {style: 'Visual aids such as progress charts', checked: false},
        },
        // mentor personality traits props
        personality: {
            detailOriented: false,
            adaptable: false,
            creative: false,
            analytical: false,
            proactive: false,
            independent: false,
            affable: false,
            collaborative: false
        },
        // mentor skills props
        skills: {
            entrepreneurship:  {selected:false},
            leadership: {selected:false},
            teamBuilding: {selected:false},
            careerCoaching: {selected:false},
            sales: {selected:false},
            marketing: {selected:false},
            learningToMentor: {selected:false},
            conflictResolution: {selected:false}
        },
        // mentor demographics props
        demographics: {
            gender: false,
            lgbtqia: false,
            Race: false,
            Ethnicity: false,
            none: false
        },
        contact: { email: null,
                   phone: null,
                   preferredContact: {
                        email: false,
                        phone: false,
                        text: false
                    }
}       });


    const handleCustomSliderChange = (skill, value) => {
        setMentor((prevMentor) => ({
          ...prevMentor,
          skills: {
            ...prevMentor.skills,
            [skill]: {
              ...prevMentor.skills[skill], // Keep other properties of the skill object unchanged
              value: value, // Update the value property in the skill object
            },
          },
        }));
      };
      

    const updatePersonality = (personality, value) => {
        const numberOfPersonalityTraits = Object.values(mentor.personality).filter(
            (traitValue) => traitValue === true
          ).length;
        
          // if num of selected traits is already 5, return & do not update
          if (numberOfPersonalityTraits === 5 && value === true) {
            return;
          }
        setMentor((prevMentor) => ({
            ...prevMentor,
            personality: {
                ...prevMentor.personality,
                [personality]: value
            }
        }));
    }

    const updateSkills = (skill, value) => {
        const numberOfSkills = Object.values(mentor.skills).filter((item) => item.selected === true).length;

        // const numberOfSkills= Object.values(mentor.skills).filter(
        //     (skillValue) => skillValue === true
        //   ).length;
        
          // If num of selected traits is already 5, return & do not update
          if (numberOfSkills === 5 && value === true) {
            return;
          }
        setMentor((prevMentor) => ({
            ...prevMentor,
            skills: {
                ...prevMentor.skills,
                [skill]: { ...prevMentor.styles[skill], selected: value, value: 0  }
            }
        }));
    }

    // test?
    useEffect(()=> {
        console.log(mentor);
        console.log( Object.values(mentor.skills).filter((item) => item.selected === true).length);
    },[mentor]);

    const updateDemographics = (demographic, value) => {
        if(((mentor.demographics.Race === false && mentor.demographics.gender === false && mentor.demographics.Ethnicity === false && mentor.demographics.lgbtqia === false) && demographic === 'none') || value === false) {
            setMentor((prevMentor) => ({
                ...prevMentor,
                demographics: {
                  ...prevMentor.demographics,
                  none: value,
                },
              }));
        }
        if(((mentor.demographics.Race === true || mentor.demographics.gender === true || mentor.demographics.Ethnicity === true || mentor.demographics.lgbtqia === true) && demographic === 'none') ||   mentor.demographics.none === true) {
            return;
        }
        setMentor((prevMentor) => ({
            ...prevMentor,
            demographics: {
              ...prevMentor.demographics,
              [demographic]: value,
            },
          }));
    }
    
    const updateMentoringStyle = (label, value) => {
        setMentor((prevMentor) => ({
          ...prevMentor,
          styles: {
            ...prevMentor.styles,
            [label]: { ...prevMentor.styles[label], checked: value },
          },
        }));
      };

    const updateLocationPreference = (preference, index) => {
        if (index === selectedPreferenceIndex) {
            setMentor((prevMentor) => ({
              ...prevMentor,
              locationPreference: null,
            }));
            setSelectedPreferenceIndex(null);
          } else {
            setMentor((prevMentor) => ({
              ...prevMentor,
              locationPreference: preference,
            }));
            setSelectedPreferenceIndex(index);
          }
      };

    // form functions: form completion, moving to next page, moving to previous page
    const handleNextPage = () => {
        if (page === 2 && (!mentor.zip || mentor.locationPreference === null)) {
            setError('Please enter a five-digit zip code and choose a location preference')
            // H COMMENT: instead of timeout, have error message go away once user enters zip code and access to Continue button is granted. 2 reasons: 1. timeout may be too quick for slow readers or people who don't notice the message right away, 2. error message persists on next pg of form if timeout is not complete.
            setTimeout(() => {
                setError(null);
              }, 2000);
            // setTimeout(() => {
            //     setZipCodeClassNames('text-center rounded-md h-10 mt-3 ')
            //     setError(null);
            //   }, 3500);
            // setZipCodeClassNames((prevZipCodeClassNames) => prevZipCodeClassNames + 'border-red-600 border-solid border-4');
            return; // Do not proceed to the next page
        }
        if(page === 3 && Object.values(mentor.styles).filter((item) => item.checked === true).length < 1) {
            setError('Please select at least one style of mentoring')
            setTimeout(() => {
                setError(null);
              }, 2000);
            return;
        }
        if(page === 4 && Object.values(mentor.personality).filter(
            (traitValue) => traitValue === true
          ).length < 3) {
            setError('Please choose at least 3 descriptors')
            setTimeout(() => {
                setError(null);
              }, 2000);
            return;
          }
        if(page === 5 && Object.values(mentor.skills).filter(
            (skill) => skill.selected === true
          ).length < 3) {
            setError('Please choose at least 3 skills')
            setTimeout(() => {
                setError(null);
              }, 2000);
            return;
          }
        if(page === 6 && Object.values(mentor.skills)
        .filter(skill => skill.selected && skill.value === 0)
        .length) {
            setError('Please enter the amount of experience per skill selected')
            setTimeout(() => {
                setError(null);
              }, 2000);
            return;
        }
          if(page === 7 && Object.values(mentor.demographics).filter(
            (demographicValue) => demographicValue === true
          ).length === 0) {
            setError('Please select the demographics that apply')
            setTimeout(() => {
                setError(null);
              }, 2000);
            return;
          }
          if (page === 8 && (mentor.contact.email === null || mentor.contact.phone === null ||  Object.values(mentor.contact.preferredContact).filter((item) => item === true).length <= 0)
          ) {
            setError('Please enter a valid phone nummber, email, and a preferred form of contact')
            setTimeout(() => {
                setError(null);
              }, 2000);
            return;
            return;
          }
        setPage((prevPage) => prevPage + 1);
    }

    
    const handleContactChange = (event) => {
        const { name, value } = event.target;
            setMentor(prevMentor => ({
                ...prevMentor,
                contact: {
                    ...prevMentor.contact,
                    [name]: value
                }
            }));
    };

    const handleTogglePreferredContact = (contactType) => {
    setMentor(prevMentor => {
        const updatedPreferredContact = { ...prevMentor.contact.preferredContact };
        
        // If the clicked checkbox is being checked, uncheck all other checkboxes
        if (!updatedPreferredContact[contactType]) {
            for (const key in updatedPreferredContact) {
                if (key !== contactType) {
                    updatedPreferredContact[key] = false;
                }
            }
        }

        return {
            ...prevMentor,
            contact: {
                ...prevMentor.contact,
                preferredContact: {
                    ...updatedPreferredContact,
                    [contactType]: !updatedPreferredContact[contactType]
                }
            }
        };
    });
};
    
    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
        console.log(page);
    }

    const handleZipChange = (event) => {
        setMentor((prevMentor) => ({
            ...prevMentor,
            zip: event.target.value
        }));
    }

    // general navigation button properties: style & type
    const navButtonStyle = {
        // marginBottom: '1.25rem',
        border: '0.125rem solid transparent',
        borderRadius: '3.125rem',
        backgroundColor: 'var(--orange)',
        color: 'var(--dark-blue)',
        fontWeight: 'bold'
    }
    const navButtonType = 'button';

    // general input button properties: style
    const inputButtonStyle = {
            border: '0.19rem solid var(--dark-blue)',
            borderRadius: '3.125rem', 
            backgroundColor: 'var(--dark-blue)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.125rem', // text-lg
            width: '13rem', // w-52
            paddingTop: '0.25rem', // pt-1
            paddingBottom: '0.25rem', // pb-1
            cursor: 'pointer',
            margin: '0.75rem'  // m-3
    }
    const inputButtonType = 'button';

    // checkbox label styling
    const labelStyle = {
        position: 'relative',
        // marginBottom: '1rem'
    }

    // begin Button (component) properties
    const beginButton = {
        style: navButtonStyle,
        type: navButtonType,
        action: handleNextPage,
        text: 'Begin'
    }

    const trueCount = Object.values(mentor.personality).filter(
        (personalityValue) => personalityValue === true
      ).length;
  
    const skillsTrueCount = Object.values(mentor.skills).filter((item) => item.selected === true).length;
    
    const stylesTrueCount = Object.values(mentor.styles).filter((item) => item.checked === true).length;

    const demographicTrueCount = Object.values(mentor.demographics).filter(
        (demographicValue) => demographicValue === true
      ).length;
    


    // check if any of the selected values are true and if so they are all not a value of 0

    // check conditions for page === 2 or page === 4
    const isPage2Valid = page === 2 && (!mentor.zip || mentor.locationPreference === null);
    const isPage3Valid = page === 3 && stylesTrueCount === 0;
    const isPage4Valid = page === 4 && trueCount < 3;
    const isPage5Valid = page === 5 && skillsTrueCount < 3;
    const isPage6Valid = page === 6 && Object.values(mentor.skills)
    .filter(skill => skill.selected && skill.value === 0)
    .length;
    const isPage7Valid = page === 7 && demographicTrueCount === 0;
    const isPage8Valid = page === 8 && mentor.contact.email === null || mentor.contact.phone === null || Object.values(mentor.contact.preferredContact).filter((item) => item === true).length <= 0;

    // continue Button (component) properties
    const continueButton = {
        style: isPage2Valid || isPage3Valid || isPage4Valid || isPage5Valid || isPage6Valid ||  isPage7Valid 
        ? { ...navButtonStyle, backgroundColor: 'var(--unclicked-gray)', cursor: 'default' }
        : navButtonStyle, 
        type: navButtonType,
        action: handleNextPage,
        text: 'Continue',
    }

    // finish Button (component) properties
    const finishButton = {
        style: isPage8Valid
        ? { ...navButtonStyle, backgroundColor: 'var(--unclicked-gray)', cursor: 'default' }
        : navButtonStyle, 
        type: navButtonType,
        action: handleNextPage, // this would submit the whole form, once that function is written
        text: 'Finish'
    }

    const trueValuesCount = Object.values(mentor.styles).filter((item) => item.checked).length;

    return (
        <div className="bg-light-blue bg-opacity-25 min-h-screen flex flex-col items-center p-3 md:p-5">
            <div className="border-2 border-slate shadow-md rounded-lg m-1 md:m-3 bg-slate-100 flex flex-col items-center content-center justify-center">
                {/* Form Intro Page */}
                {page === 1 &&
                    <div className="flex flex-col items-center align-center py-10 text-center">
                        <h1 className="text-xl md:text-4xl py-5">Become a Mentor With</h1>
                        <img className="px-3 md:px-8"src={logo} />
                        <p className="text-lg md:text-2xl my-5 md:my-10 px-3 md:px-5">
                            Tell us about yourself, your mentoring style, and your skills! 
                            <br />
                            This information will be used to match potential mentees to you.
                        </p>
                        <Button props={beginButton} />
                    </div>
                }
                {/* Location & Availability Page */}
                {page === 2 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 mt-3" src={logo} />
                    <form className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-1 pt-3">
                            First, please tell us about your location and availability preferences.
                        </h1>
                        <div className="flex flex-col text-lg md:text-xl pt-1 md:p-3">
                            <label>
                                What is your zip code?
                            </label>
                            <input onChange={handleZipChange} className={zipCodeClassNames} type="text" placeholder="12345" value={mentor.zip} />
                        </div>
                        <label className="text-lg md:text-xl px-3 md:px-5 pt-5">
                            Are you more interested in meeting remotely, or in person?
                        </label>
                        <div className="flex flex-col md:flex-row justify-evenly mb-10 md:mb-16 items-center">
                            <input style={{...inputButtonStyle,backgroundColor: selectedPreferenceIndex === 0 ? "var(--clicked-mentor-blue)" : "var(--dark-blue)", border: "solid 3px var(--dark-blue)", color: selectedPreferenceIndex === 0 ? "var(--dark-blue)" : "white"
                                }} onClick={()=> updateLocationPreference("Remote", 0)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Remote" />
                            <input style={{...inputButtonStyle,backgroundColor: selectedPreferenceIndex === 1 ? "var(--clicked-mentor-blue)" : "var(--dark-blue)", border: "solid 3px var(--dark-blue)", color: selectedPreferenceIndex === 1 ? "var(--dark-blue)" : "white"
                                }} onClick={()=> updateLocationPreference("In Person", 1)}  className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="In Person" />
                            <input style={{...inputButtonStyle,backgroundColor: selectedPreferenceIndex === 2 ? "var(--clicked-mentor-blue)" : "var(--dark-blue)", border: "solid 3px var(--dark-blue)", color: selectedPreferenceIndex === 2 ? "var(--dark-blue)" : "white"
                                }} onClick={()=> updateLocationPreference("No Preference", 2)}  className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="No Preference" />
                        </div>
                        <Button props={continueButton} />
                        <div className="text-center">
                            {error &&
                                <p className="text-red-600 mt-5">{error}</p> 
                            } 
                        </div>
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>
                }
                {/* Mentoring Style: Page 1 */}
                {page === 3 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 mt-3" src={logo} />
                    <form className="flex flex-col items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-1 pt-3">
                                    Next, we're going to get a better idea of your mentoring style.
                            </h1>
                            <p className="text-lg md:text-xl pt-1 pb-5 px-3">
                                How would you, as a mentor, set realistic and attainable goals for your mentees? 
                                <br/>
                                Choose no more than 5.
                            </p>
                        </div>
                        <div className="flex flex-col justify-items-start px-3 md:px-5 mb-5 text-lg md:text-xl">
                            {Object.values(mentor.styles).map((style, index) => (
                                <Checkbox
                                    key={index}
                                    checked={style.checked}
                                    disableCheckbox={trueValuesCount >= 5}
                                    onClick={() => updateMentoringStyle(`choice${index + 1}`, !style.checked)}
                                    labelStyle={labelStyle}
                                    label={style.style}
                                />
                            ))}
                        </div>

                        <Button props={continueButton} />
                        <div className="text-center">
                            {error &&
                                <p className="text-red-600 mt-5">{error}</p> 
                            } 
                        </div>                
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>
                }
                {/* Mentoring Style: Page 2 */}
                {page === 4 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 pt-3 md:ml-8 md:pt-8"src={logo} />
                    <form className="flex flex-col items-center justify-center text-center">
                        <div className="p-5">
                            <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-1 pt-3">
                                How would you describe yourself in terms of personality and work style?
                            </h1>
                            <label className="text-lg md:text-xl pt-1 pb-5 px-3">
                                Choose a minimum of 3 descriptors, and a maximum of 5.
                            </label>
                        </div>
                        <div className="flex flex-col md:grid md:grid-cols-2 justify-evenly px-5 mb-5 items-center">
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.detailOriented ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.detailOriented ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.detailOriented ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("detailOriented", !mentor.personality.detailOriented)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Detail-Oriented" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.adaptable ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.adaptable? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.adaptable ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("adaptable", !mentor.personality.adaptable)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType}  value="Adaptable" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.creative ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.creative ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.creative ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("creative", !mentor.personality.creative)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType}  value="Creative" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.analytical? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.analytical ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.analytical ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("analytical", !mentor.personality.analytical)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType}  value="Analytical" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.proactive ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.proactive ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.proactive ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("proactive", !mentor.personality.proactive)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType}  value="Proactive" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.independent ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.independent ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.independent ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("independent", !mentor.personality.independent)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Independent" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.affable ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.affable ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.affable ? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("affable", !mentor.personality.affable)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType}  value="Affable" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.personality.collaborative ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.personality.collaborative ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.personality.collaborative? "var(--dark-blue)" : "white"}} onClick={()=> updatePersonality("collaborative", !mentor.personality.collaborative)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Collaborative" />
                        </div>
                        <div className="text-center">
                            <Button props={continueButton} />
                            {error &&
                            <p className="text-red-600 mt-5">{error}</p> 
                            } 
                        </div>            
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>    
                }
                {/* Skills */}
                {page === 5 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 pt-3 md:ml-8 md:pt-8" src={logo} />
                    <form className="flex flex-col items-center justify-center text-center">
                        <div className="p-5">
                            <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-1 pt-3">
                                Now we would like to know more about the skills you are interested in mentoring.
                            </h1>
                            <label className="text-lg md:text-xl pt-1 pb-5 px-3">
                                Choose a minimum of 3 skills, and a maximum of 5.
                            </label>
                        </div>
                        <div className="flex flex-col md:grid md:grid-cols-2 justify-evenly px-5 mb-5 items-center">
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.entrepreneurship.selected  ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.entrepreneurship.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.entrepreneurship.selected  ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("entrepreneurship", !mentor.skills.entrepreneurship.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType}  value="Entrepreneurship" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.leadership.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.leadership.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.leadership.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("leadership", !mentor.skills.leadership.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Leadership" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.teamBuilding.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.teamBuilding.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.teamBuilding.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("teamBuilding", !mentor.skills.teamBuilding.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Team Building" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.careerCoaching.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.careerCoaching.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.careerCoaching.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("careerCoaching", !mentor.skills.careerCoaching.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Career Coaching" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.sales.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.sales.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.sales.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("sales", !mentor.skills.sales.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Sales" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.marketing.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.marketing.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.marketing.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("marketing", !mentor.skills.marketing.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Marketing" />
                            <input  style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.learningToMentor.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.learningToMentor.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.learningToMentor.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("learningToMentor", !mentor.skills.learningToMentor.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Learning to Mentor" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.skills.conflictResolution.selected ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.skills.conflictResolution.selected ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.skills.conflictResolution.selected ? "var(--dark-blue)" : "white"}} onClick={()=> updateSkills("conflictResolution", !mentor.skills.conflictResolution.selected)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Conflict Resolution" />
                        </div>
                        <Button props={continueButton} />
                        <div className="text-center">
                        {error &&
                        <p className="text-red-600 mt-5">{error}</p> 
                        } 
                        </div> 
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>   
                }
                {/* Experience */}
                {page === 6 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 pt-3 md:ml-8 md:pt-8" src={logo} />
                    <form className="flex flex-col items-center justify-center text-center">
                        <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-1 pt-3">
                            Please select the number of years of experience you have in each specialty.
                        </h1>
                        <div className="p-1 mb-10 md:mb-16 flex flex-col items-center text-center text-base md:text-2xl">
                        {/* pull answers from previous page to populate lefthand column; # of rows dependent on # of responses on previous page */}
                            <div className="grid grid-cols-1 gap-1">
                                {Object.keys(mentor.skills).map((skill) => {
                                    if (mentor.skills[skill].selected) {
                                        return (
                                        <React.Fragment key={skill}>
                                            <CustomSlider max={maxSliderRange} min={minSliderRange} skill={skill} sliderValue={mentor.skills[skill].value}
                                                onSliderChange={(value) => handleCustomSliderChange(skill, value)} />
                                        </React.Fragment >
                                        )
                                }
                                })}
                            </div>
                        </div>
                        <Button props={continueButton} />
                        <div className="text-center">
                        {error &&
                        <p className="text-red-600 mt-5">{error}</p> 
                        } 
                        </div> 
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>
                }
                {/* Demographics */}
                {page === 7 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 pt-3 md:ml-8 md:pt-8" src={logo} />
                    <form className="flex flex-col items-center justify-center text-center">
                        <div className="p-5">
                            <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-1 pt-3">
                                Please select the demographic-related topics you are comfortable addressing in your mentorship process.
                            </h1>
                            <label className="text-lg md:text-xl pt-1 pb-5 px-3">
                                Select all which apply
                            </label>
                        </div>
                        <div className="flex flex-col grid grid-cols-1 md:grid-cols-2 justify-evenly px-5 items-center">
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.demographics.gender ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.demographics.gender ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.demographics.gender ? "var(--dark-blue)" : "white"}} onClick={()=> updateDemographics("gender", !mentor.demographics.gender)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Gender" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.demographics.lgbtqia ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.demographics.lgbtqia ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.demographics.lgbtqia ? "var(--dark-blue)" : "white"}} onClick={()=> updateDemographics("lgbtqia", !mentor.demographics.lgbtqia)} className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="LGBTQIA+" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.demographics.Race ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.demographics.Race ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.demographics.Race ? "var(--dark-blue)" : "white"}} onClick={()=> updateDemographics("Race", !mentor.demographics.Race)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Race" />
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.demographics.Ethnicity ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.demographics.Ethnicity ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.demographics.Ethnicity ? "var(--dark-blue)" : "white"}} onClick={()=> updateDemographics("Ethnicity", !mentor.demographics.Ethnicity)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="Ethnicity" />
                        </div>
                        <div className="flex flex-col items-center justify-center px-5 mb-5">
                            <input style={{...inputButtonStyle,
                                backgroundColor: mentor.demographics.none ? "var(--clicked-mentor-blue)" : "var(--dark-blue)",
                                border: mentor.demographics.none ? "solid 3px var(--dark-blue)" : "3px solid transparent",
                                color: mentor.demographics.none ? "var(--dark-blue)" : "white"}} onClick={()=> updateDemographics("none", !mentor.demographics.none)}className="lg:text-xl md:w-64 md:py-2 md:m-5" type={inputButtonType} value="None of These" />
                        </div>
                        <Button props={continueButton} />
                        <div className="text-center">
                            {error &&
                            <p className="text-red-600 mt-5">{error}</p> 
                            } 
                        </div> 
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>    
                }
                {/* Contact */}
                {page === 8 &&
                <div>
                    <img className="w-28 md:w-40 ml-3 pt-3 md:ml-8 md:pt-8" src={logo} />
                    <h1 className="text-xl md:text-2xl px-3 md:px-8 pb-5 pt-3">
                            Finally, please provide your contact information and select your preferred form of contact.
                    </h1>
                    <form className="flex flex-col items-center justify-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 px-5">
                            <label className="text-lg md:text-xl pt-1 pb-5 px-3">
                                Email
                            </label>
                            <input onChange={handleContactChange} className="text-center rounded-md h-8 border-2 border-light-blue text-lg md:text-xl w-52 md:w-64 mb-5" type="text" name="email" placeholder="email@domain.com" value={mentor.contact.email} />
                            <label className="text-lg md:text-xl pt-1 pb-5 px-3">
                                Phone Number
                            </label>
                            <input className="text-center rounded-md h-8 border-2 border-light-blue text-lg md:text-xl w-52 md:w-64 mb-5" type="text" placeholder="(555)555-5555" name="phone" onChange={handleContactChange} value={mentor.contact.phone}/>
                        </div>
                        <p className="text-lg md:text-xl pt-1 pb-5 px-3">
                            Preferred form of contact
                        </p>
                        <div className="flex flex-col justify-items-start px-5 mb-5 text-lg md:text-xl">
                            <Checkbox labelStyle={labelStyle} name="email" checked={mentor.contact.preferredContact.email} onClick={()=> handleTogglePreferredContact('email')} type="checkbox" label="Email" />
                            <Checkbox labelStyle={labelStyle} name="phone" checked={mentor.contact.preferredContact.phone} onClick={()=> handleTogglePreferredContact('phone')} type="checkbox" label="Phone call" />
                            <Checkbox labelStyle={labelStyle} name="text" checked={mentor.contact.preferredContact.text}   onClick={()=> handleTogglePreferredContact('text')} type="checkbox" label="Text" />
                        </div>
                        <Button props={finishButton} />
                        <div className="text-center">
                            {error &&
                                <p className="text-red-600 mt-5">{error}</p> 
                            } 
                        </div>
                    </form>
                    <div className="flex flex-row justify-center md:justify-start content-end items-end text-dark-blue text-xl md:text-2xl pb-5 md:pl-8 mt-5">
                        <i className="fa-solid fa-arrow-left relative -top-1 md:-top-0.5 -left-2" />
                        <h4 className="underline cursor-pointer" onClick={handlePreviousPage}>Back</h4>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default MentorForm;