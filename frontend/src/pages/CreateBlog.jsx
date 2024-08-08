import { useState, useRef } from "react"
import { createPost } from "../api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CreateBlog() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [content, setContent] = useState("")
    const [file, setFile] = useState()

    const MAX_FILE_SIZE =  15000000

    const inputFile = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault()
        let submitObject = {
            title: title,
            description: description,
            content: content,
            author: null,
            dateCreated: new Date(),
            file: file
        }

        await createPost(submitObject)
    }

    function handleFileUpload(e) {
        const file = e.target.files[0]
        const fileExtension = file.name.substring(file.name.lastIndexOf("."))
        if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png") {
            alert("Files must be jpg or png")
            inputFile.current.value = ""
            inputFile.current.type = "file"
            return
        }
        if (file.size > MAX_FILE_SIZE) {
            alert("File size exceeds the limit (15 Mb)")
            inputFile.current.value = ""
            inputFile.current.type = "file"
            return
        }

        setFile(file)
    }

    return (
        <form onSubmit={handleSubmit} className="w-1/3">
            <Label className="flex left-0 p-2">Blog Post Title: </Label>
            <Input onChange={(e) => setTitle(e.target.value)} maxLength={100} required name="title"/>
            <Label className="flex left-0 p-2">Blog Description: </Label>
            <Input onChange={(e) => setDescription(e.target.value)} maxLength={200} required name="description"/>
            <Label className="flex left-0 p-2">Blog Content: </Label>
            <Textarea onChange={(e) => setContent(e.target.value)} maxLength={5000} required name="content"/>
            <Label className="flex left-0 p-2">Insert Header Image: </Label>
            <Input type="file" onChange={handleFileUpload} ref={inputFile} className="cursor-pointer hover:bg-accent" required/>
            <Button type="submit" className="mt-4">Submit</Button>
        </form>
    )
}