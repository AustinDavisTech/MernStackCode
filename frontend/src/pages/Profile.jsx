import { BlogCard } from "../components/BlogCard"
import { useState, useEffect } from "react"
import { getPosts } from "../api"
import * as jwt_decode from 'jwt-decode';

export function Profile() {

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        async function loadUserData() {
            const token = sessionStorage.getItem("User")
            const decodedUser = jwt_decode.jwtDecode(token)
            const allPosts = await getPosts()
            const filteredPosts = allPosts.filter((post) => post.author == decodedUser._id)
            setPosts(filteredPosts)
            setUser(decodedUser)
        }
        loadUserData()
    }, [])

    return (
        <div className="w-1/3">
            <label className="flex left-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">Name:</label>
            <h2 className="flex left-0 mb-4">{user.name}</h2>
            <label className="flex left-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">Email:</label>
            <h2 className="flex left-0 mb-4">{user.email}</h2>
            <label className="flex left-0 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-2">Join Date:</label>
            <h2 className="flex left-0 mb-4">{user.joinDate}</h2>
            {posts.map((post) => {
                return (
                 <BlogCard post={post}/>   
                )
            })}
        </div>
    )
}