"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditStudentDetails from "@/app/Compontents/EditStudentDetails/page";

interface Student {
  name: string;
  email: string;
  phone: string;
}

interface Params {
  id: string;
}

interface EditStudentProps {
  params: Params;
}

const EditTopic: React.FC<EditStudentProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  console.log(params.id);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOneStudent = async (id: string) => {
      try {
        const res = await fetch(`http://localhost:3000/api/datas/?id=${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("Fetched student data:", data);
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student:", error);
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    if (typeof id === "string") {
      fetchOneStudent(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>No student found</p>;
  }

  return (
    <>
      <EditStudentDetails
        _id={id}
        name={student.name}
        email={student.email}
        phone={student.phone}
      />
    </>
  );
};

export default EditTopic;
