import React from 'react';
import Headers from '../../components/sections/Header/Headers';
import AboutMe from '../../components/sections/AboutMe/AboutMe';
import ContactUs from '../../components/sections/ContactUs/ContactUs';
import Skills from '../../components/sections/Skills/Skills';
import Education from '../../components/sections/Education/Education';
import Projects from '../../components/sections/Projects/Projects';

const Home = () => {
    return (
        <div>
            <Headers></Headers>
            <AboutMe></AboutMe>
            <Skills></Skills>
            <Education></Education>
            <Projects></Projects>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;