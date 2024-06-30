import RemovedBtn from "../RemovedBtn/RemovedBtn";
import { MdOutlineModeEdit } from "react-icons/md";
import Link from "next/link";

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3001/topics");
    if (!res.ok) {
      throw new Error("failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("error loading topics", error);
    return [];
  }
};

export default async function TopicList() {
  const topics = await getTopics();

  return (
    <>
      {topics.length > 0 ? (
        topics.map((t: any) => (
          <div
            key={t.id}
            className="border border-slate-300 my-4 p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <h2>{t.description}</h2>
            </div>
            <div className="flex">
              <Link href={`/EditTopic/${t.id}`}>
                <MdOutlineModeEdit
                  className="text-yellow-500 me-3 cursor-pointer"
                  size={26}
                />
              </Link>
              <RemovedBtn id={t.id} />
            </div>
          </div>
        ))
      ) : (
        <p>No topics found.</p>
      )}
    </>
  );
}
