import React, { useState, useEffect } from 'react';

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        console.log("Component Mounte! Fetching data...");

        const timer = setTimeout(() => {

            const data = [
                { id: 1, name: 'Jon', major: 'History of Westeros' },
                { id: 2, name: 'Luffy', major: 'Marine Biology' },
                { id: 3, name: 'Saul', major: 'Law' }
            ];

            setStudents(data);
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <h2>Student List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {students.map(s => (
                        <li key={s.id}>
                            <strong>{s.name}</strong> - {s.major}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StudentList;