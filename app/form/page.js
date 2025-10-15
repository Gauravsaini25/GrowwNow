"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13/14 App Router

// --- MODAL COMPONENT FOR SOFT SKILLS TEST ---
const SoftSkillsTestModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black/50 bg-opacity-70 z-50 flex justify-center items-center">
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Soft Skills Assessment Test</h2>
        <p className="text-gray-600 mb-6">
          This test assesses core **soft skills** like communication, leadership potential, emotional intelligence, and conflict resolution. It consists of 20 scenario-based multiple-choice questions and takes approximately 15 minutes.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              console.log("--- Soft Skills Test Started! (Prototype Action) ---");
              // The onClose function should handle setting the softSkillsTestDone state
              onClose(true); // Passing 'true' to indicate test completion
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition shadow-md"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};


const EmployeeProfileForm = () => {
  const router = useRouter(); // ⬅️ HOOK MUST BE CALLED HERE INSIDE THE COMPONENT!

  // 1. STATE MANAGEMENT
  const [employeeInfo, setEmployeeInfo] = useState({
    name: '',
    employeeId: '',
    department: '',
    currentRole: '',
    yearsExperience: '',
    desiredPromotion: '',
  });

  // Set initial state to false so the user has to "take the test"
  const [softSkillsTestDone, setSoftSkillsTestDone] = useState(false); 
  const [technicalSkills, setTechnicalSkills] = useState(['JavaScript', 'React', 'Cloud Services']);
  const [profileGoals, setProfileGoals] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Generic handler for all simple text inputs
  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    } else {
      setResumeFile(null);
      alert("Please select a valid PDF file.");
    }
  };

  // Function to handle the test completion, now accepts a status
  const handleTestCompletion = (completed = false) => {
    setIsModalOpen(false);
    if (completed) {
      setSoftSkillsTestDone(true);
      alert("Test simulated. Results would be automatically populated in a real app!");
    }
  };

  // Combine all state into one object for submission
  const formData = {
    employeeInfo,
    technicalSkills,
    profileGoals,
    softSkillsTestStatus: softSkillsTestDone ? 'Completed' : 'Pending',
    resumeFile: resumeFile, // File object for backend processing
  };
  
  // 2. FORM SUBMISSION HANDLER (Now integrated into the component)
  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Log the data
    console.log('--- Form Data Submitted ---');
    console.log(JSON.stringify(formData, (key, value) => {
      if (value instanceof File) {
        return `File: ${value.name} (${value.size} bytes)`;
      }
      return value;
    }, 2));
    console.log('---------------------------');

    // ➡️ NAVIGATION: Use the router object here
    // Note: I removed the alert() before the push, as it can interfere with routing.
    router.push('/protected/dashboard');
  };

  // Helper component for adding repeatable technical skills
  const SkillEntry = ({ title, skills, setSkills }) => {
    const [newSkill, setNewSkill] = useState('');
  
    const addSkill = () => {
      if (newSkill.trim() !== '' && !skills.includes(newSkill.trim())) {
        setSkills([...skills, newSkill.trim()]);
        setNewSkill('');
      }
    };
  
    const removeSkill = (index) => {
      setSkills(skills.filter((_, i) => i !== index));
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addSkill();
      }
    };
  
    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">{title}:</label>
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`Enter a new ${title.toLowerCase().split(' ')[0]} skill and press enter...`}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <button
            type="button"
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-150 shadow-md"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <span key={index} className="flex items-center bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-2 text-indigo-500 hover:text-indigo-700 transition duration-150 focus:outline-none"
                aria-label={`Remove ${skill}`}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white shadow-2xl rounded-xl border border-gray-100">
      <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-2">
        GrowwNow
      </h1>
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
        Employee Profiling for AI Roadmap 📈
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Input details and skills. Soft skills will be assessed via a simulated test.
      </p>

      {/* 3. Form now uses the internal handleFormSubmit */}
      <form onSubmit={handleFormSubmit} className="space-y-8">
        
        {/* --- SECTION 1: BASIC INFORMATION --- */}
        <fieldset className="p-6 border border-gray-200 rounded-xl shadow-inner bg-gray-50">
          <legend className="px-3 text-xl font-bold text-indigo-600">
            Personal & Role Information
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-2">Full Name:</label>
              <input type="text" name="name" value={employeeInfo.name} onChange={handleInfoChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-2">Employee ID:</label>
              <input type="text" name="employeeId" value={employeeInfo.employeeId} onChange={handleInfoChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-2">Department:</label>
              <input type="text" name="department" value={employeeInfo.department} onChange={handleInfoChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="col-span-1">
              <label className="block text-gray-700 font-semibold mb-2">Current Role/Title:</label>
              <input type="text" name="currentRole" value={employeeInfo.currentRole} onChange={handleInfoChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="col-span-2">
              <label className="block text-gray-700 font-semibold mb-2">Years of Experience:</label>
              <input type="number" name="yearsExperience" value={employeeInfo.yearsExperience} onChange={handleInfoChange} min="0" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>
        </fieldset>

        {/* --- SECTION 2: SKILLS --- */}
        <fieldset className="p-6 border border-gray-200 rounded-xl shadow-inner bg-gray-50">
          <legend className="px-3 text-xl font-bold text-indigo-600">
            Skills Assessment
          </legend>
          
          <SkillEntry
            title="Technical Skills"
            skills={technicalSkills}
            setSkills={setTechnicalSkills}
          />

          {/* SOFT SKILLS TEST BUTTON */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Soft Skills Assessment:</label>
            <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white">
              <span className="text-gray-600">
                Status: 
                <span className={`font-bold ml-2 ${softSkillsTestDone ? 'text-green-600' : 'text-yellow-600'}`}>
                  {softSkillsTestDone ? 'Completed' : 'Pending Test'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-150 shadow-md disabled:opacity-50"
                disabled={softSkillsTestDone}
              >
                {softSkillsTestDone ? 'Test Completed' : 'Take a Test'}
              </button>
            </div>
            {softSkillsTestDone && (
                <p className="text-sm text-green-600 mt-2">Simulated results populated for AI profiling.</p>
            )}
          </div>
          
        </fieldset>
        
        {/* --- SECTION 3: RESUME UPLOAD --- */}
        <fieldset className="p-6 border border-gray-200 rounded-xl shadow-inner bg-gray-50">
          <legend className="px-3 text-xl font-bold text-indigo-600">
            Resume / Document Analysis
          </legend>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Upload Latest Resume (PDF Only):</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 p-3 border border-gray-300 rounded-lg bg-white cursor-pointer"
            />
            {resumeFile && (
                <p className="text-sm text-green-600 mt-2">File Selected: **{resumeFile.name}** ({Math.round(resumeFile.size / 1024)} KB)</p>
            )}
            {!resumeFile && (
                <p className="text-sm text-red-500 mt-2">A resume is required for accurate AI analysis.</p>
            )}
          </div>
          
        </fieldset>


        {/* --- SECTION 4: PROMOTION GOALS --- */}
        <fieldset className="p-6 border border-gray-200 rounded-xl shadow-inner bg-gray-50">
          <legend className="px-3 text-xl font-bold text-indigo-600">
            Career & Promotion Goals
          </legend>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Desired Promotion/Next Role:</label>
            <input
              type="text"
              name="desiredPromotion"
              value={employeeInfo.desiredPromotion}
              onChange={handleInfoChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">What are your main goals for this profile? (Max 3 sentences)</label>
            <textarea
              name="profileGoals"
              value={profileGoals}
              onChange={(e) => setProfileGoals(e.target.value)}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="e.g., I want to identify the gaps between my current skills and a Senior Developer role, focusing on architecture and leadership. I hope to achieve this in the next 12 months."
            ></textarea>
          </div>

        </fieldset>

        <button 
          type="submit" // ⬅️ IMPORTANT: Use type="submit" so the form's onSubmit handler is triggered
          className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition duration-300 text-lg font-bold shadow-lg shadow-green-200/50 transform hover:scale-[1.01]"
        >
          Submit
        </button>
      </form>

      <SoftSkillsTestModal isOpen={isModalOpen} onClose={handleTestCompletion} />
    </div>
  );
};

export default EmployeeProfileForm;