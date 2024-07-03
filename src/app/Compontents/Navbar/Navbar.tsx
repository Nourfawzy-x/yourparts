import AddStudent from "@/app/Pages/AddStudent/page";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-sky-900	 px-8 py-3">
      <Link className="font-bold  text-white" href={"/"}>
        your parts
      </Link>
      <Link
        className="bg-emerald-500 font-medium text-white px-4 py-2 rounded-md"
        href={"/AddStudent"}
      >
        add student
      </Link>
    </nav>
  );
}
