import React from 'react';
import Headers from '../../Components/Header/Headers';
import AboutMe from '../../Components/AboutMe/AboutMe';
import ContactUs from '../../Components/ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Headers></Headers>
            <AboutMe></AboutMe>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;