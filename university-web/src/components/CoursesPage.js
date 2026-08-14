import CourseCard from './CourseCard';
import SearchBar from './SearchBar';
import CourseList from './CourseList';
import RegistrationForm from './RegistrationForm';

function CoursesPage() {
    return(
        <div>
                <h2>Available Courses</h2>

                <CourseCard
                title="History of Westeros"
                code="HIS101"
                credits={3}
                />

                <CourseCard
                title="Marine Biology"
                code="BIO201"
                credits={4}
                />
                
                <CourseCard
                title="Law"
                code="LAW301"
                credits={5}
                />

                <h2>Student Registration</h2>
                <RegistrationForm />

                <h2>All Courses (Dynamic List)</h2>
                <CourseList />

                <h2>Search Courses</h2>
                <SearchBar />
            </div>
    );
}

export default CoursesPage;