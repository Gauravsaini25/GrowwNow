"use client";
import { useState } from "react";
import Header from "@/components/Header";
import MentorCard from "@/components/MentorCard";
import MentorModal from "@/components/MentorModal";
import { MENTORS } from "@/mock/data";

export default function MentorPage() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");

  const filteredMentors = MENTORS.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || m.role === roleFilter;
    const matchesRating = ratingFilter === "All" || m.rating >= parseInt(ratingFilter);
    return matchesSearch && matchesRole && matchesRating;
  });

  return (
    <div className="flex w-[78vw]">
      <div className=" space-y-6 w-[82vw]">
        <Header title="Mentor Matching" subtitle="Get guidance from experts" />

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or role..."
            className="border rounded-lg px-4 py-2 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border rounded-lg px-4 py-2"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Senior Manager">Senior Manager</option>
            <option value="Project Head">Project Head</option>
            <option value="Principal Engineer">Principal Engineer</option>
            <option value="Tech Lead">Tech Lead</option>
            <option value="HR Specialist">HR Specialist</option>
            <option value="AI Researcher">AI Researcher</option>
          </select>
          <select
            className="border rounded-lg px-4 py-2"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="All">All Ratings</option>
            <option value="3">3★ & above</option>
            <option value="4">4★ & above</option>
            <option value="5">5★ only</option>
          </select>
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.length > 0 ? (
            filteredMentors.map((m, idx) => (
              <MentorCard key={idx} mentor={m} onClick={() => setSelectedMentor(m)} />
            ))
          ) : (
            <p className="text-gray-500">No mentors match your filters.</p>
          )}
        </div>
      </div>

      {selectedMentor && (
        <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
      )}
    </div>
  );
}
