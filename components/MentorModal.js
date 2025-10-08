import { X, Calendar, User, Award, Star } from "lucide-react";

export default function MentorModal({ mentor, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[450px] p-6 rounded-2xl shadow-xl relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4">
          <img
            src={mentor.image || "https://via.placeholder.com/100"}
            alt={mentor.name}
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-xl font-bold text-indigo-700">{mentor.name}</h2>
            <p className="text-gray-500 flex items-center gap-1">
              <User size={14} /> {mentor.role}
            </p>
            <p className="text-yellow-500 flex">
              {[...Array(mentor.rating || 4)].map((_, i) => (
                <Star key={i} size={16} fill="gold" />
              ))}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <p className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} /> Availability: <span className="font-medium">{mentor.available}</span>
          </p>
          <p className="flex items-center gap-2 text-gray-600">
            <Award size={16} /> Experience: {mentor.experience || "8+ years"}
          </p>
          <p className="text-gray-600">{mentor.bio || "Expert in guiding teams and building scalable solutions."}</p>
        </div>

        <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Book Session
        </button>
      </div>
    </div>
  );
}
