import React from 'react'

// This is the Navbar component. It is a simple navigation bar that can be updated to add more functionalities like sign up, login, etc.
const Navbar = () => {
    return (
        // The outer div is a container that is fixed to the top of the page and spans the full width and height.
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
            {/* The inner div is a flex container that holds the title and greeting. It has a semi-transparent white background and rounded corners. */}
            <div className="self-start backdrop-blur-md w-full flex flex-col bg-white bg-opacity-50 p-4 rounded-lg">
                {/* The title of the navbar. It uses responsive font size for different screen sizes. */}
                <h1 className="font-black text-sm md:text-4xl">My Virtual Assistant</h1>
                {/* A greeting message to the user. */}
                <p>Hi Boss! How Are You....?</p>
            </div>
        </div>
    )
}

export default Navbar;
