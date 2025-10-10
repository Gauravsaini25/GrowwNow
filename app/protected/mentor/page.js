"use client";
import { useState } from "react";
import Header from "@/components/Header";
import MentorCard from "@/components/MentorCard";
import { MENTORS } from "@/mock/data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageSquare, User } from "lucide-react";

export default function MentorPage() {
  const [showSlider, setShowSlider] = useState(false);
  const [modalType, setModalType] = useState(null); // "message" | "profile"
  const [activeMentor, setActiveMentor] = useState(MENTORS[0]); // currently selected mentor

  const currentMentor = activeMentor; // can be employee.assignedMentor in real app
  const otherMentors = MENTORS.filter((m) => m.id !== currentMentor.id);

  const openModal = (mentor, type) => {
    setActiveMentor(mentor);
    setModalType(type);
  };

  const closeModal = () => setModalType(null);

  return (
    <div className="flex w-[78vw] relative">
      <div className="flex flex-col min-h-screen bg-gray-50 w-[82vw]">
        <Header title="Mentorship Hub" subtitle="Connect, Learn & Grow with your Mentor" />

        <main className="p-8 flex flex-col lg:flex-row gap-8">
          {/* Current Mentor Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">
                Your Mentor
              </h2>
              <div className="flex items-center gap-6">
                <img
                  src={currentMentor.image}
                  alt={currentMentor.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200"
                />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {currentMentor.name}
                  </h3>
                  <p className="text-sm text-gray-600">{currentMentor.role}</p>
                  <p className="mt-2 text-gray-700">
                    {currentMentor.bio ||
                      "Guiding you on your career growth journey with tailored strategies and mentorship."}
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => openModal(currentMentor, "message")}
                className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
              >
                <MessageSquare className="w-4 h-4" /> Message Mentor
              </button>
              <button
                onClick={() => openModal(currentMentor, "profile")}
                className="flex items-center gap-2 border border-indigo-400 text-indigo-600 px-5 py-2 rounded-xl hover:bg-indigo-50 transition"
              >
                <User className="w-4 h-4" /> View Profile
              </button>
            </div>
          </motion.div>

          {/* Toggle Slider Button */}
          <div className="relative">
            <button
              onClick={() => setShowSlider(!showSlider)}
              className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition shadow-md"
            >
              {showSlider ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            </button>
          </div>
        </main>
      </div>

      {/* Slider Sidebar */}
      <AnimatePresence>
        {showSlider && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed right-0 top-0 h-full w-[28vw] bg-white shadow-2xl border-l z-50 p-6 overflow-y-auto"
          >
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              Explore Other Mentors
            </h3>
            <div className="grid grid-cols-1 gap-5">
              {otherMentors.map((m, idx) => (
                <MentorCard
                  key={idx}
                  mentor={m}
                  onClick={() => openModal(m, "profile")} // open modal for clicked mentor
                />
              ))}
            </div>
            <button
              onClick={() => setShowSlider(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✖
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌟 Modals */}
      <AnimatePresence>
        {modalType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 bg-opacity-20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                ✖
              </button>

              {modalType === "message" && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-indigo-700 mb-2">
                    Message {currentMentor.name}
                  </h3>
                  <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                    <p className="bg-gray-100 rounded-lg p-2 self-start">
                      Hello! How can I improve my leadership skills?
                    </p>
                    <p className="bg-indigo-50 rounded-lg p-2 self-end text-indigo-700">
                      Focus on strategic decision-making and practical exercises.
                    </p>
                  </div>
                  <textarea
                    placeholder="Type your message..."
                    className="border rounded-lg p-2 w-full"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition self-end">
                    Send
                  </button>
                </div>
              )}

              {modalType === "profile" && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-indigo-700 mb-2">
                    {currentMentor.name} - Profile
                  </h3>
                  <p className="text-gray-700">
                    <strong>Role:</strong> {currentMentor.role}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {currentMentor.email || "mentor@growwnow.com"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Bio:</strong>{" "}
                    {currentMentor.bio ||
                      "An experienced mentor guiding employees to reach their career goals."}
                  </p>
                  <p className="text-gray-700">
                    <strong>Rating:</strong> {currentMentor.rating || 4.5} ★
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
