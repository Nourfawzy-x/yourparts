import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href={"/"}>your parts</Link>
      <Link href={"/addTopic"}>add topic</Link>
    </nav>
  );
}
