import { Star, User, Calendar } from "lucide-react";

export default function MentorCard({ mentor, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-2xl shadow hover:shadow-xl transition cursor-pointer border border-gray-100"
    >
      <div className="flex items-center space-x-4">
        <img
          src={mentor.image || "https://via.placeholder.com/80"}
          alt={mentor.name}
          className="w-16 h-16 rounded-full object-cover border"
        />
        <div>
          <h3 className="text-lg font-semibold text-indigo-700">{mentor.name}</h3>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <User size={14} /> {mentor.role}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
        <Calendar size={14} /> {mentor.available}
      </div>
      <div className="mt-3 flex items-center text-yellow-500">
        {[...Array(mentor.rating || 4)].map((_, i) => (
          <Star key={i} size={16} fill="gold" />
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-500 line-clamp-2">{mentor.bio}</p>
    </div>
  );
}
