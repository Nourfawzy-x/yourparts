"use client";

import { useEffect, useState, useLayoutEffect, useRef } from "react";
import RemovedBtn from "../RemovedBtn/RemovedBtn";
import { MdOutlineModeEdit } from "react-icons/md";
import Link from "next/link";

const getAllStudents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/datas");
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = await res.json();
    console.log("Fetched students:", data);
    return data.students;
  } catch (error) {
    console.log("Error loading students:", error);
    return [];
  }
};

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  dateOfAdmission: Date;
}

export default function StudentList() {
  const checkbox = useRef<HTMLInputElement | null>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getAllStudents();
        setStudents(fetchedStudents);
        console.log("Students state updated:", fetchedStudents); // Log updated state
        fetchedStudents.forEach((student: Student) =>
          console.log("Topic name:", student.name)
        );
      } catch (error) {
        setError("Failed to load topics. Please try again later.");
      }
    };

    fetchStudents();
  }, []);

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedStudent.length > 0 && selectedStudent.length < students.length;
    setChecked(selectedStudent.length === students.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedStudent, students]);

  function toggleAll() {
    setSelectedStudent(checked || indeterminate ? [] : students);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <>
      {error && <p>{error}</p>}
      {students.length > 0 ? (
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="relative">
                  {selectedStudent.length > 0 && (
                    <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12"></div>
                  )}
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="relative px-7 sm:w-12 sm:px-6"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {students.map((s) => (
                        <tr
                          key={s._id}
                          className={
                            selectedStudent.includes(s)
                              ? "bg-gray-50"
                              : undefined
                          }
                        >
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {selectedStudent.includes(s) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              value={s.email}
                              checked={selectedStudent.includes(s)}
                              onChange={(e) =>
                                setSelectedStudent(
                                  e.target.checked
                                    ? [...selectedStudent, s]
                                    : selectedStudent.filter((p) => p !== s)
                                )
                              }
                            />
                          </td>
                          <td
                            className={`whitespace-nowrap py-4 pr-3 text-sm font-medium ${
                              selectedStudent.includes(s)
                                ? "text-indigo-600"
                                : "text-gray-900"
                            }`}
                          >
                            {s.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {s.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {s.phone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {s.dateOfAdmission}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <div className="flex">
                              <Link href={`/EditTopic/${s._id}`}>
                                <MdOutlineModeEdit
                                  className="text-yellow-500 me-3 cursor-pointer"
                                  size={26}
                                />
                              </Link>
                              <RemovedBtn id={s._id} />
                            </div>
                            <span className="sr-only">, {s.name}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !error && <p>No students found.</p>
      )}
    </>
  );
}
