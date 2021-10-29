import Link from "next/link";

export default function Header() {
  return (
    <nav className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-lg font-medium">
      <Link href="/">
        <a className="hover:underline">Home</a>
      </Link>
    </nav>
  );
}
