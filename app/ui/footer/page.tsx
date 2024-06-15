interface Props {
  companyName: string;
}

export default function Footer({ companyName }: Props) {
  const currentYear = new Date();
  return (
    <footer className="flex justify-center items-center p-4 bg-gray-800 text-white w-full sticky bottom-0">
      <p>
        Copyright &copy; {currentYear.getFullYear()} {companyName}
      </p>
    </footer>
  );
}
