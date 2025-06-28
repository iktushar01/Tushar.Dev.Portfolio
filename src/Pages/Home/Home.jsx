import React from 'react';
import Headers from '../../Components/Header/Headers';
import AboutMe from '../../Components/AboutMe/AboutMe';
import ContactUs from '../../Components/ContactUs/ContactUs';
import Skills from '../../Components/Skills/Skills';

const Home = () => {
    return (
        <div>
            <Headers></Headers>
            <AboutMe></AboutMe>
            <Skills></Skills>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;