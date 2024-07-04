"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Starting API call...");
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
        console.error("API call failed with error:", errorData);
        throw new Error(errorData.message || "Failed to update student");
      }

      console.log("API call succeeded");
      toast.success("Student updated successfully.");

      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error((error as Error).message, { autoClose: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
        <div className="my-3">
          <button
            type="submit"
            className="btn mx-2 bg-yellow-500 rounded-md px-6 text-center py-3 font-bold text-white shadow-sm hover:bg-white hover:outline-yellow-500 hover:text-yellow-500 hover:outline transition-transform"
            disabled={loading}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "Edit Student"
            )}
          </button>
        </div>
      </form>
      <ToastContainer autoClose={8000} />
    </div>
  );
};

export default EditStudentDetails;
