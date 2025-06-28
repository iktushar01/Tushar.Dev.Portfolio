import React from "react";
import { FaCode, FaPaintBrush, FaBook, FaFutbol } from "react-icons/fa";

const AboutMe = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-red-500">
          <span className="border-b-2 border-red-600 pb-2">About Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <FaCode className="text-red-500 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">My Coding Journey</h3>
                <p className="text-gray-300">
                  My programming adventure began at 15 when I built my first
                  website. Since then, I've fallen in love with the
                  problem-solving aspect of development. Currently specializing
                  in the MERN stack, I enjoy creating full-stack applications
                  that solve real-world problems. What excites me most is
                  learning new technologies and pushing the boundaries of what I
                  can build.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaPaintBrush className="text-red-500 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Creative Problem Solver
                </h3>
                <p className="text-gray-300">
                  I thrive on projects that require both technical skills and
                  creative thinking. Whether it's designing intuitive user
                  interfaces or architecting efficient backend systems, I
                  approach each challenge with enthusiasm. My happy place? That
                  moment when all the components come together to create
                  something greater than the sum of its parts.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaBook className="text-red-500 text-2xl mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Beyond the Keyboard</h3>
                <p className="text-gray-300">
                  When I'm not coding, you'll find me reading sci-fi novels,
                  experimenting with digital art, or playing football. I believe
                  diverse interests fuel creativity in programming. I'm also
                  passionate about tech education and regularly mentor aspiring
                  developers in my community.
                </p>
              </div>
            </div>
          </div>

          {/* Skills visualization */}
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h3 className="text-2xl font-bold mb-6 text-center text-red-500">
              My Approach
            </h3>
            <ul className="space-y-4">
              {[
                { skill: "Clean Code", level: 90 },
                { skill: "Problem Solving", level: 95 },
                { skill: "UI/UX Design", level: 80 },
                { skill: "Team Collaboration", level: 85 },
                { skill: "Continuous Learning", level: 100 },
              ].map((item, index) => (
                <li key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{item.skill}</span>
                    <span className="text-red-500">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${item.level}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex gap-4 text-gray-400">
                <FaFutbol
                  className="text-xl hover:text-red-500 transition-colors cursor-pointer"
                  title="Football"
                />
                <FaPaintBrush
                  className="text-xl hover:text-red-500 transition-colors cursor-pointer"
                  title="Digital Art"
                />
                <FaBook
                  className="text-xl hover:text-red-500 transition-colors cursor-pointer"
                  title="Reading"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-600"></div>
    </section>
  );
};

export default AboutMe;
