import React from "react";
import Hero from "../components/Hero";

// props for Hero component
const contactInfo = {
    page: 'contact',
    heading: 'Contact Us'
}
    
// page content
const Contact = () => {
    return (
        <div>
            <Hero page={contactInfo} />
            <h2 className="text-4xl md:text-7xl py-5 text-center">Let's get in <span className="text-light-blue">Touch</span></h2>
        
            <div className="grid grid-cols-1 md:grid-cols-3 px-10">
                <p className="p-5 flex flex-col justify-center text-xl">
                    <span className="font-bold">Address:</span>
                    Company Headquarters<br />
                    StartingBlock Madison<br />
                    821 E Washington Ave<br />
                    Second Floor<br />
                    Madison, WI 53703<br />
                </p>
                <p className="p-5 flex flex-col justify-center text-xl">
                    <span className="font-bold">Phone:</span>
                    (855) 258-8727<br />
                    <br />
                    <span className="font-bold">Hours:</span>
                    9 a.m. to 5 p.m. Central<br />
                    SATURDAY-SUNDAY: CLOSED
                </p>
                <div className="p-5">
                    form here
                </div>
            </div>
        </div>
    )
}

export default Contact;