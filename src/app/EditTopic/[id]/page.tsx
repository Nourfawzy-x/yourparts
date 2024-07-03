"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditTopicForm from "@/app/Compontents/EditTopicForm/page";

interface Topic {
  name: string;
  email: string;
  phone: string;
}

interface Params {
  id: string;
}

interface EditTopicProps {
  params: Params;
}

const EditTopic: React.FC<EditTopicProps> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  console.log(params.id);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTopic = async (id: string) => {
      try {
        const res = await fetch(`http://localhost:3000/api/datas/?id=${id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("Fetched topic data:", data); // Log the response data
        setTopic(data);
      } catch (error) {
        console.error("Error fetching topic:", error); // Log the error
        setError("Failed to fetch topic data");
      } finally {
        setLoading(false);
      }
    };

    if (typeof id === "string") {
      fetchTopic(id);
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!topic) {
    return <p>No topic found</p>;
  }

  return (
    <>
      <EditTopicForm
        _id={id}
        name={topic.name}
        email={topic.email}
        phone={topic.phone}
      />
    </>
  );
};

export default EditTopic;
