export default function page({ params }: any) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-y-6 p-12 sm:p-24">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-xl sm:text-4xl text-center">
          Your userid is {params.pid}
        </h1>
      </div>
    </main>
  );
}
