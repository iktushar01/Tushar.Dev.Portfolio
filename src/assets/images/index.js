// Centralized image imports for better organization and performance
import photo from '../photo.png';
import logo from '../logo.png';
import rcpscLogo from '../rcpscLogo.png';
import uttaraUniversityLogo from '../UttaraUniversityLogo.jpg';

// Project images - organized by project
import projectOneOne from '../ProjectOne/one.png';
import projectOneTwo from '../ProjectOne/two.png';
import projectOneThree from '../ProjectOne/three.png';
import projectOneFour from '../ProjectOne/four.png';
import projectOneFive from '../ProjectOne/five.png';

import projectTwoOne from '../ProjectTwo/one.png';
import projectTwoTwo from '../ProjectTwo/two.png';
import projectTwoThree from '../ProjectTwo/three.png';
import projectTwoFour from '../ProjectTwo/four.png';
import projectTwoFive from '../ProjectTwo/five.png';

import projectThreeOne from '../ProjectThree/one.png';
import projectThreeTwo from '../ProjectThree/two.png';
import projectThreeThree from '../ProjectThree/three.png';
import projectThreeFour from '../ProjectThree/four.png';
import projectThreeFive from '../ProjectThree/five.png';

const projectImages = {
  projectOne: {
    one: projectOneOne,
    two: projectOneTwo,
    three: projectOneThree,
    four: projectOneFour,
    five: projectOneFive,
  },
  projectTwo: {
    one: projectTwoOne,
    two: projectTwoTwo,
    three: projectTwoThree,
    four: projectTwoFour,
    five: projectTwoFive,
  },
  projectThree: {
    one: projectThreeOne,
    two: projectThreeTwo,
    three: projectThreeThree,
    four: projectThreeFour,
    five: projectThreeFive,
  },
};

// Export all images
export {
  photo,
  logo,
  rcpscLogo,
  uttaraUniversityLogo,
  projectImages,
};

// Helper function to get project images as array
export const getProjectImages = (projectName) => {
  const project = projectImages[projectName];
  if (!project) return [];
  
  return [
    project.one,
    project.two,
    project.three,
    project.four,
    project.five,
  ];
};
