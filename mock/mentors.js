// mock/mentors.js
export const MENTOR_ACCOUNTS = [
  {
    id: 201,
    name: "Anil Kumar",
    email: "anil@mentor.com",
    password: "mentor123",
    menteeId: 1,
    specialization: "Leadership & Strategy",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 202,
    name: "Neha Gupta",
    email: "neha@mentor.com",
    password: "mentor456",
    menteeId: 2,
    specialization: "Project Execution & Communication",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 203,
    name: "Ravi Sharma",
    email: "ravi.mentor@mentor.com",
    password: "mentor789",
    menteeId: 3,
    specialization: "Technical Growth & Architecture",
    image: "https://randomuser.me/api/portraits/men/76.jpg"
  }
];

export const MENTEES = [
  {
    id: 101,
    name: "Ravi Sharma",
    role: "Frontend Developer",
    currentGoal: "Master React & Next.js",
    progress: 85,
    roadmap: [
      { title: "HTML/CSS Fundamentals", description: "Strong layout and styling basics", completed: true },
      { title: "JavaScript ES6+", description: "Deep dive into modern JS", completed: true },
      { title: "React Core", description: "Components, state, props", completed: true },
      { title: "Next.js & Routing", description: "App Router and API integration", completed: false },
      { title: "Deployment & Optimization", description: "Learn Vercel deployment", completed: false },
    ],
  },
];

