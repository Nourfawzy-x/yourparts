"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Title and description are required");
      return;
    }
    try {
      const res = await fetch("http://localhost:3001/topics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a topic");
      }

      const data = await res.json();
      console.log(data);

      router.push("/");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <div className="mt-4">
        <label
          htmlFor="title"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Topic Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            id="title"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter topic title"
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="description"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Topic Description
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter topic description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
      </div>
      <div className="my-3">
        <button
          type="submit"
          className="btn mx-2 bg-green-600 rounded-md px-6 text-center py-3 font-bold text-white shadow-sm hover:bg-white hover:outline-green-600 hover:text-green-600 hover:outline transition-transform"
        >
          Add Topic
        </button>
      </div>
    </form>
  );
}
