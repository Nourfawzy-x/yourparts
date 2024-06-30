"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface EditTopicFormProps {
  id: string;
  title: string;
  description: string;
}

const EditTopicForm: React.FC<EditTopicFormProps> = ({
  id,
  title,
  description,
}) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3001/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      setNewTitle(newTitle);
      setNewDescription(newDescription);

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  return (
    <form className="my-5" onSubmit={handleSubmit}>
      <div className="mt-4">
        <label
          htmlFor="topic-title"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Topic Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="topic-title"
            id="topic-title"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter topic title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="topic-description"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Topic Description
        </label>
        <div className="mt-2">
          <textarea
            id="topic-description"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter topic description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="my-3">
        <button
          type="submit"
          className="btn mx-2 bg-yellow-500 rounded-md px-6 text-center py-3 font-bold text-white shadow-sm hover:bg-white hover:outline-yellow-500 hover:text-yellow-500 hover:outline transition-transform"
        >
          Edit Topic
        </button>
      </div>
    </form>
  );
};

export default EditTopicForm;
