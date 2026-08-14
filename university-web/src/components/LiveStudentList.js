import React, { useState, useEffect} from 'react';
import axios from 'axios';

function LiveStudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                'https://universityportal-8v78.onrender.com/academic/api/students/'
                );
                console.log("==== DJANGO API DEBUG ====");
                console.log("Full Response: ", res);
                console.log("Students Data:", res.data)
                console.log("Total Students:", res.data.length);
                console.log("============================");

                setStudents(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error connecting to Django:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="max-w-2xl mx-auto">

            <h2 className="text-2xl font-bold mb-4 text-center">
                Students (Live from Django)
            </h2>
            {loading ? (
                <p className="text-center text-gray-500">Loading students...</p>
            ) : students.length === 0 ? (
                <p className="text-center text-gray-500">No students found.</p>
            ) : (
                students.map(s => (
                    <div
                        key={s.id}
                        className="bg-white border border-black p-4 my-3 rounder-xl shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-lg font-semibold">
                        {s.first_name} {s.last_name}
                        </h3>

                        <p className="text-gray-600 text-sm mt-1">
                            {s.email}
                        </p>
                    </div>
                ))
            )}
    </div>
    );
}

export default LiveStudentList;