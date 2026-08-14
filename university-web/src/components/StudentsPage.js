import Header from './Header';
//import StudentList from './StudentList';
//import StudentCard from './StudentCard';
import DigitalClock from './DigitalClock'
import TitleUpdater from './TitleUpdater';
import Counter from './Counter';
import UserGreeting from './UserGreeting';
import LiveStudentList from './LiveStudentList';

function StudentsPage() {
    return (
        <div>
            <Header />
            <UserGreeting isLoggedIn={true} />
            {/* <UserGreeting isLoggedIn={false} /> */}


            <h2>Current Students</h2>
            {/*<StudentCard
              name="Jon Snow"
              studentId="S001"
              major="History of Westeros"
            />

            <StudentCard
              name="Monkey D Luffy"
              studentId="S002"
              major="Marine Biology"
            />

            <StudentCard
              name="Saul Goodman"
              studentId="S003"
              major="Law"
            />
            <h2>Student Data(API Simulation)</h2>
            <StudentList />*/}

            <LiveStudentList />

            <h2>Attendance Counter</h2>
            <Counter />

            <h2>Click Tracker (Updates Tab Title)</h2>
            <TitleUpdater />

            <DigitalClock />
          </div>
    );
}

export default StudentsPage;