import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import Link from "next/link";

export default function TopicList() {
  const topicId = "123"; // Replace with actual dynamic ID

  return (
    <>
      <div className="border border-slate-300 my-4 p-4 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-2xl">topic title</h2>
          <h2>topic description</h2>
        </div>
        <div className="flex">
          <Link href={`/EditTopic/${topicId}`}>
            <MdOutlineModeEdit
              className="text-yellow-500 me-3 cursor-pointer"
              size={26}
            />
          </Link>

          <RiDeleteBinLine className="text-red-600" size={26} />
        </div>
      </div>
    </>
  );
}
