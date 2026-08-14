import { Link } from 'react-router-dom';

function CourseList() {
    const courses = [
        { id: 1, title: 'History Of Westeros', credits: '3' },
        { id: 2, title: 'Marine Biology', credits: '4' },
        { id: 3, title: 'Law', credits: '4' }
    ];

    return (
        <ul>
            {courses.map(course => (
                <li key={course.id}>
                    <Link to={`/courses/${course.id}`}>
                        <b>{course.title}</b>
                    </Link> - {course.credits} Credits
                </li>
            ))}
        </ul>
    );
}

export default CourseList;