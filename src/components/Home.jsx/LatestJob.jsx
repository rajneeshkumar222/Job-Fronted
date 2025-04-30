import React, { useState } from "react";
import { LuMoveLeft, LuMoveRight } from "react-icons/lu";

const skills = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning",
  "Artificial Intelligence",
  "Cyber Engineer",
];

const LatestJob = () => {
  const [index, setIndex] = useState(0);

  // Total slides (each containing 2 skills)
  const totalSlides = Math.ceil(skills.length / 2);

  const prevSlide = () => {
    setIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1)); // Loop back to last slide
  };

  const nextSlide = () => {
    setIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0)); // Loop back to first slide
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
      <div className="text-2xl text-blue-600 font-bold">Categories</div>
      <div className="text-gray-600 mb-4">Explore our extensive job market.</div>

      <div className="relative w-full flex items-center justify-between">
        {/* Left Arrow */}
        <LuMoveLeft
          onClick={prevSlide}
          className="cursor-pointer bg-gray-300 rounded-md text-red-800 font-bold text-3xl p-2"
        />

        {/* Skills Wrapper */}
        <div className="w-[80%] overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-full flex justify-center space-x-4">
                <div className="rounded-2xl p-4 text-white bg-black w-1/2 text-center cursor-pointer">
                  {skills[i * 2]}
                </div>
                {skills[i * 2 + 1] && (
                  <div className="rounded-2xl p-4 text-white bg-black w-1/2 text-center cursor-pointer">
                    {skills[i * 2 + 1]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <LuMoveRight
          onClick={nextSlide}
          className="cursor-pointer bg-gray-300 rounded-md text-red-800 font-bold text-3xl p-2"
        />
      </div>
    </div>
  );
};

export default LatestJob;
