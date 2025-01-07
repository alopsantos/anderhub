import Link from "next/link";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center py-40">
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">AnderHub</h1>
      </Link>
      {children}
    </section>
  );
}
