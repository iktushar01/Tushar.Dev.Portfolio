import React from 'react';
import Headers from '../../Components/Header/Headers';
import AboutMe from '../../Components/AboutMe/AboutMe';
import ContactUs from '../../Components/ContactUs/ContactUs';
import Skills from '../../Components/Skills/Skills';
import Education from '../../Components/Education/Education';
import Projects from '../../Components/Projects/Projects';

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