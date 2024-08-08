import { Link } from "react-router-dom"

export function About() {
    return (
        <div className="w-1/3">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2 text-primary">About Us</h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">Welcome to our blog website! Here you'll find a collection of articles, stories, and insights on various topics.</p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">Our platform provides a space for users to share their thoughts, experiences, and expertise through blog posts.</p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">If you're interested in contributing, feel free to create a new blog by visiting our <Link to="/createBlog">Create Blog</Link> page.</p>
            <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-wrap text-center">Explore our content and join our community of writers and readers!</p>
        </div>
    )
}