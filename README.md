# GrowwNow: Personalized Career Acceleration Platform for POWERGRID  
## Team CodeAlliance 

---

## Project Overview

GrowwNow is an intelligent, data-driven career planning and mentorship platform designed for POWERGRID employees.  
The goal is to close the gap between an employee’s current skill profile and the requirements of their target role, delivering a dynamic, AI-powered roadmap for accelerated professional growth.

---

## Core Features (Employee / Mentee Module)

The application guides employees from Diagnosis → Analysis → Action, ensuring a structured, measurable, and personalized growth experience.

### Dashboard (The Diagnostic)
- Skill Gap Analysis – Visual comparison (Radar Graph) of current vs. target skills.  
- Skill Overview – Bar Graph summarizing present competency levels.  
- Highlights – Personalized recommendations and recent achievements.

### Reports (The Progress Tracker)
- Tracks progress through:
  - Progress Report
  - Skill Improvement Report
  - Earning Hours Over Time
- Offers Skill Distribution Radar and actionable Performance Insights.

### Mentor Tab (Guided Support)
- Matches employees with experienced mentors currently in their target role.  
- Uses AI-based compatibility scoring to recommend the Top 3 mentors.  
- Enables direct communication via an in-built chatbox and profile view.

### Roadmap (The Dynamic Planner)
- The heart of GrowwNow — a step-by-step, AI-generated learning planner.  
- Dynamic Updates: Adapts automatically based on mentor reviews and employee progress.  
- Reflects real-time performance and completion feedback.

---

## Technical Stack & Architecture

GrowwNow is built on the MERN stack, integrated with AI and Machine Learning components to drive intelligent personalization.

| Component | Technology | Role |
|------------|-------------|------|
| Frontend | React.js | Builds an interactive, responsive user interface with real-time data visualization |
| Backend | Node.js (Express.js) | Handles API routing, business logic, and integration with AI microservices |
| Database | MongoDB | Stores user profiles, skills, progress data, chat logs, and generated roadmaps |
| Authentication | JWT (JSON Web Tokens) | Provides secure, stateless authentication and role-based access |
| AI & Machine Learning | Python (FastAPI), Scikit-learn, TensorFlow, PyTorch | Powers AI models for skill-gap prediction, dynamic roadmap generation, and mentor matching |
| Visualization | Chart.js | Renders Radar Graphs, Progress Charts, and Performance Analytics |

---

## Core Logic (AI-Powered Intelligence)

### Skill Gap Prediction Model
- AI-driven model trained on employee skill datasets and target role competencies.  
- Performs weighted similarity and gap analysis to identify key improvement areas.  
- Uses machine learning algorithms (Random Forest / Neural Networks) for accurate predictions.  
- Outputs a Skill Gap Score and a Personalized Learning Focus Area.

### Roadmap Generation Algorithm
- Converts skill-gap data into a prioritized, step-by-step learning plan.  
- Integrates feedback loops from mentors and performance analytics.  
- Ensures plans remain dynamic and continuously refined as progress data changes.  
- AI determines optimal sequencing of modules to maximize learning efficiency.

### Mentor Matching Engine
- Uses AI-based clustering and cosine similarity to recommend mentors best aligned with the mentee’s goals.  
- Considers skill overlap, experience, and performance metrics for ranking.  
- Enables continuous improvement as mentor feedback is looped back into the model.

---

## System Flow

### Secured Authentication
- Employee credentials are validated via JWT tokens.  
- Provides secure, role-based access for employees and mentors.

### Dashboard & Reports
- React frontend → Node.js API → MongoDB query → Data visualization using Chart.js/D3.js.  
- Displays AI-processed analytics and progress metrics.

### Mentor Tab
- Backend executes AI Matching Algorithm → fetches top mentors from MongoDB.  
- Supports real-time chat and progress feedback exchange.

### Roadmap Generation
- Triggered upon employee’s target role selection or progress update.  
- Node.js requests AI module (Flask/FastAPI) → ML model predicts best roadmap.  
- Updates dynamically based on feedback and learning completion.

---

##  Getting Started (Local Setup)

###  Prerequisites
- **Node.js (v14+)**  
- **MongoDB** instance (local or cloud-hosted)
- **Python 3.8+** (for AI service)

---

###  Installation Steps

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Gauravsaini25/GrowwNow
cd GrowwNow
```
#### Backend
```
cd backend
npm install
# Create a .env file with:
# MONGO_URI=<your-mongodb-connection-string>
# JWT_SECRET=<your-secret-key>
npm start
```
#### AI Microservice Setup
```
cd ai_service
pip install -r requirements.txt
python app.py
```
#### Frontend
```
cd ../frontend
npm install
npm start
```
The application will be available at: http://localhost:3000
