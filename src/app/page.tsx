import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-24">
      <h1 className="text-4xl sm:text-7xl">NextJs Auth 🔐</h1>
      <div className="flex flex-col sm:flex-row w-full justify-center items-center gap-3 my-6">
        <Link
          className="border rounded-lg w-1/2 text-center py-2 sm:py-2 hover:bg-slate-500"
          href={"/login"}
        >
          LOGIN
        </Link>
        <Link
          className="border rounded-lg w-1/2 text-center py-2 sm:py-2 hover:bg-slate-500"
          href={"/signup"}
        >
          SIGN UP
        </Link>
      </div>
    </main>
  );
}
