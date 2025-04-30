import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { LuMapPin, LuBriefcase, LuBuilding, LuDollarSign, LuClock } from "react-icons/lu";
import toast, { Toaster } from 'react-hot-toast';

const ViewJobDetailed = () => {
    const { jobid } = useParams();
    const [job, setJob] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetailed = async () => {
            try {
                if (!jobid) {
                    console.log("Job ID is undefined!");
                    return;
                }
                console.log("Fetching Job ID:", jobid);
                const response = await axios.get(`https://job-backend-omega.vercel.app/api/v1/getjob/${jobid}`);
                console.log("Job Details:", response.data);
                setJob(response.data.job);
            } catch (e) {
                console.log("Error while fetching job details:", e);
            }
        };
        fetchJobDetailed();
    }, [jobid]);

    const handleApply = () => {
        toast.success("Job Applied Successfully");
        setTimeout(() => {
            navigate('/jobs');
        }, 2000); // one-time redirect after 2s
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
            {job ? (
                <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">

                    {/* Job Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
                        <h1 className="text-3xl font-bold">{job.title}</h1>
                        <p className="text-md mt-2">{job.desc.substring(0, 120)}...</p>
                    </div>

                    {/* Job Details */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Position */}
                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                                <LuBriefcase className="text-blue-600 text-2xl" />
                                <div>
                                    <h3 className="font-semibold text-gray-700">Position</h3>
                                    <p className="text-gray-600">{job.position}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                                <LuMapPin className="text-green-600 text-2xl" />
                                <div>
                                    <h3 className="font-semibold text-gray-700">Location</h3>
                                    <p className="text-gray-600">{job.country}</p>
                                </div>
                            </div>

                            {/* Salary */}
                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                                <LuDollarSign className="text-yellow-600 text-2xl" />
                                <div>
                                    <h3 className="font-semibold text-gray-700">Salary</h3>
                                    <p className="text-gray-600">{job.salary} / year</p>
                                </div>
                            </div>

                            {/* Experience Level */}
                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                                <LuClock className="text-purple-600 text-2xl" />
                                <div>
                                    <h3 className="font-semibold text-gray-700">Experience Level</h3>
                                    <p className="text-gray-600">{job.experienceLevel}</p>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-lg">
                                <LuBuilding className="text-red-600 text-2xl" />
                                <div>
                                    <h3 className="font-semibold text-gray-700">Company</h3>
                                    <p className="text-gray-600">{job.company}</p>
                                </div>
                            </div>

                        </div>

                        {/* Skills */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700">Required Skills</h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {job.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm font-medium"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Apply Button */}
                        <div className="mt-6 flex justify-center">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-md transition-all"
                                onClick={handleApply}
                            >
                                Apply Now
                            </button>
                        </div>
                        <Toaster />
                    </div>
                </div>
            ) : (
                <div className='w-full h-[100%] flex items-center justify-center'>
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default ViewJobDetailed;
