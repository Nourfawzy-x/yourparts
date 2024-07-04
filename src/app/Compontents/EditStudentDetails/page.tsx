"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface EditStudentDetailsProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

const EditStudentDetails: React.FC<EditStudentDetailsProps> = ({
  _id,
  name,
  email,
  phone,
}) => {
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`http://localhost:3000/api/datas/${_id}`, {
        method: "PUT",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newName,
          newEmail,
          newPhone,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update student");
      }

      setSuccessMessage("Student updated successfully.");
      console.log(res);
      router.refresh();
      router.push("/");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="my-5" onSubmit={handleSubmit}>
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="studentName"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Student Name
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="studentName"
            id="studentName"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter student name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="studentEmail"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Student Email
        </label>
        <div className="mt-2">
          <input
            id="studentEmail"
            type="email"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter student email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 ms-2 me-3 md:mx-0">
        <label
          htmlFor="studentPhone"
          className="block text-base font-medium leading-6 text-gray-900"
        >
          Phone
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="studentPhone"
            id="studentPhone"
            className="block w-full rounded-md border-0 py-2 px-1 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            placeholder="Enter student phone"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      <div className="my-3">
        <button
          type="submit"
          className="btn mx-2 bg-yellow-500 rounded-md px-6 text-center py-3 font-bold text-white shadow-sm hover:bg-white hover:outline-yellow-500 hover:text-yellow-500 hover:outline transition-transform"
          disabled={loading}
        >
          edit student
        </button>
      </div>
    </form>
  );
};

export default EditStudentDetails;
