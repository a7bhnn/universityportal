function UserGreeting(props) {

    const isLoggedIn=props.isLoggedIn;
    return (
        <div>
            <h1>
                {isLoggedIn ? "Welcome back User!" : "Please Sign In."}
            </h1>

            {isLoggedIn && <button>Log Out</button>}
            {!isLoggedIn && <button>Register Now</button>}
        </div>
    );
}

export default UserGreeting;