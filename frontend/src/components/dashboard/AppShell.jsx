import Navbar from "./Navbar";

function AppShell({
  children,
  search,
  setSearch,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f6faff]">

      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <div className="absolute -top-40 -left-40 h-[550px] w-[550px] rounded-full bg-sky-300/20 blur-[120px]" />

        <div className="absolute top-1/3 -right-32 h-[500px] w-[500px] rounded-full bg-blue-300/15 blur-[120px]" />

        <div className="absolute bottom-[-150px] left-1/3 h-[450px] w-[450px] rounded-full bg-cyan-200/20 blur-[120px]" />

      </div>

      <Navbar
  search={search}
  setSearch={setSearch}
/>

      <main className="mx-auto w-full max-w-[1550px] px-6 py-8 md:px-10 xl:px-14">
        {children}
      </main>
    </div>
  );
}

export default AppShell;