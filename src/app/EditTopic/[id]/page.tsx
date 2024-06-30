"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditTopicForm from "@/app/Compontents/EditTopicForm/EditTopicForm";

interface Topic {
  title: string;
  description: string;
  params: string;
}

const EditTopic: React.FC = ({ params }) => {
  const { id } = params;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchTopic = async (id: string) => {
      try {
        const res = await fetch(`http://localhost:3001/topics/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await res.json();
        console.log("Fetched topic data:", data); // Log the response data
        setTopic(data); // Adjust this if `data` has a nested structure
      } catch (error) {
        console.error("Error fetching topic:", error); // Log the error
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
        id={id as string}
        title={topic.title}
        description={topic.description}
      />
    </>
  );
};

export default EditTopic;
