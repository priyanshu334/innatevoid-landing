"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export default function EditRoadmapForm(roadmap: any) {
    const router = useRouter()
    const [form, setForm] = useState(roadmap)
    const handleSubmit = async () => {
        const res = await fetch(`/api/admin/roadmaps/${roadmap.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })
        const json = await res.json()
        if (json.error) {
            toast.error(json.error)
        } else {
            toast.success("Roadmap updated successfully")
            router.push("/admin/roadmaps")
        }


    }

    return (
        <div className="p-10 space-y-4">
            <h1 className="text-2xl font-bold">Edit Roadmap</h1>
            {Object.keys(form).map((key) => (
                <input
                    key={key}
                    placeholder={key}
                    className="border p-2 w-full"
                    value={(form as any)[key]}
                    onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                    }
                />
            ))}
            <button
                onClick={handleSubmit}
                className="bg-black text-white px-4 py-2 rounded"
            >
                Update
            </button>
        </div>
    )
}