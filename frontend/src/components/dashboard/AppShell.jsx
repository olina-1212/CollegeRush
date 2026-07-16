import Navbar from "./Navbar";

function AppShell({
  children,
  search,
  setSearch,
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f6faff]">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl sm:h-[420px] sm:w-[420px] lg:h-[550px] lg:w-[550px]" />

        <div className="absolute top-1/3 -right-24 h-64 w-64 rounded-full bg-blue-300/15 blur-3xl sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px]" />

        <div className="absolute -bottom-20 left-1/3 h-60 w-60 rounded-full bg-cyan-200/20 blur-3xl sm:h-[340px] sm:w-[340px] lg:h-[450px] lg:w-[450px]" />
      </div>

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <main
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-5
          sm:px-6
          sm:py-6
          md:px-8
          md:py-8
          lg:px-10
          xl:px-14
        "
      >
        {children}
      </main>
    </div>
  );
}

export default AppShell;