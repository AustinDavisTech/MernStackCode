import { verifyUser } from "../api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await verifyUser(user)
        if (response) {
            sessionStorage.setItem("User", response)
            console.log(`Bearer ${response}`)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response}`
            navigate("/home")
        } else {
            alert("Login failed")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <Input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40} className="mb-2"/>
            <Input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20} className="mb-2"/>
            <Button type="submit" className="mb-4">Login</Button>
        </form>
    )
}