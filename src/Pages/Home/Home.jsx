import React from 'react';
import AboutMe from '../../Components/sections/AboutMe/AboutMe';
import ContactUs from '../../Components/sections/ContactUs/ContactUs';
import Education from '../../Components/sections/Education/Education';
import Projects from '../../Components/sections/Projects/Projects';
import Certificates from '../../Components/sections/Certificates/Certificates';
import Skills from '../../Components/sections/Skills/Skills';
import Headers from '../../Components/sections/Header/Headers';

const Home = () => {
    return (
        <div>
            <Headers></Headers>
            <AboutMe></AboutMe>
            <Skills></Skills>
            <Education></Education>
            <Projects></Projects>
            <Certificates></Certificates>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;