import Link from "next/link";

export default function Footer() {
  const currentYear = new Date();
  return (
    <footer className="flex justify-center items-center p-4 bg-gray-800 text-white w-full sticky bottom-0">
      <p>
        Copyright &copy; {currentYear.getFullYear()}{" "}
        <Link href="/">ProjectApp</Link>
      </p>
    </footer>
  );
}
