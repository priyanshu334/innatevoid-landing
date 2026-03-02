"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPromptForm({ prompt }: any) {
    const router = useRouter();
    const [form, setForm] = useState(prompt);

    const handleSubmit = async () => {
        const res = await fetch(
            `/api/admin/prompts/${prompt.slug}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }
        );

        if (res.ok) {
            router.push("/admin/prompts");
        }
    };

    return (
        <div className="p-10 space-y-4 max-w-xl">
            <h1 className="text-2xl font-bold">Edit Prompt</h1>

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
    );
}