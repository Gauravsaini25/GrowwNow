"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const storedEmployee = JSON.parse(localStorage.getItem("employee") || "null");

                const defaultEmployee = {
                    id: 0,
                    name: "John Doe",
                    email: "john.doe@example.com",
                    phone: "+91 0000000000",
                    role: "Unknown Role",
                    experienceYears: 0,
                    skills: { Leadership: 0, Strategy: 0, Communication: 0, Technical: 0 },
                    progress: { gapsClosed: 0, activitiesDone: 0, nextMilestone: "Not assigned" },
                    image: "https://via.placeholder.com/150",
                };

                setEmployee(storedEmployee || defaultEmployee);
            } catch (err) {
                console.error(err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4  border-gray-200"></div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="p-6 bg-red-100 text-red-700 rounded-lg shadow">
                    ⚠️ {error}
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 p-6 space-y-6 w-[78vw]">
            <Header title="My Profile" subtitle="View and manage your personal information" />

            {/* Profile Info */}
            <Card className="flex flex-col sm:flex-row items-center gap-6 p-6">
                <img
                    src={employee?.image || "https://via.placeholder.com/150"}
                    alt={employee?.name || "Profile"}
                    className="w-32 h-32 rounded-full border-2 border-indigo-600"
                />
                <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">{employee?.name || "John Doe"}</h2>
                    <p className="text-gray-600">{employee?.role || "Unknown Role"}</p>
                    <p className="text-gray-500">{employee?.email || "email@example.com"}</p>
                    <p className="text-gray-500">{employee?.phone || "+91 0000000000"}</p>
                </div>
            </Card>

            {/* Skills Overview */}
            <Card >
                <CardHeader>
                    <CardTitle>Skills Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                {Object.entries(employee?.skills || {}).map(([skill, value], idx) => (
                    <div key={idx} className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{skill}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-3 relative">
                            <div
                                className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                                style={{ width: `${value}%` }}
                                ></div>
                        </div>
                        <span className="text-gray-600 ml-2">{value}/100</span>
                    </div>
                ))}
                </CardContent>
            </Card>
            

            {/* Progress Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Progress Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <p><b>Gaps Closed:</b> {employee?.progress?.gapsClosed ?? 0}%</p>
                    <p><b>Activities Completed:</b> {employee?.progress?.activitiesDone ?? 0}</p>
                    <p><b>Next Milestone:</b> {employee?.progress?.nextMilestone ?? "Not assigned"}</p>
                </CardContent>
            </Card>

                {/* Settings / Actions */}

            <CardContent className="flex flex-wrap gap-4">
                <button className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition">
                    Edit Profile
                </button>
                
            </CardContent>
        </div>
    );
}
