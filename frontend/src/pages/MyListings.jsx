import { useEffect, useMemo, useState } from "react";
import AppShell from "../components/dashboard/AppShell";
import api from "../api/apiClient";
import { Button } from "../components/ui/button";

function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings/my");
        setListings(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const stats = useMemo(() => {
    return {
      total: listings.length,
      active: listings.filter(l => l.status === "ACTIVE").length,
      sold: listings.filter(l => l.status === "SOLD").length,
      rented: listings.filter(l => l.type === "RENT").length,
    };
  }, [listings]);

  

  return (
    <AppShell>
      <div className="mb-10 flex items-center justify-between">
  <div>
    <h1 className="text-4xl font-bold tracking-tight">
      My Listings
    </h1>

    <p className="mt-2 text-slate-500">
      Manage everything you're selling or renting.
    </p>
  </div>

  <Button
    className="rounded-xl h-12 px-6 shadow-lg hover:shadow-xl transition-all"
  >
    + New Listing
  </Button>
</div>

      {loading && <p className="mt-6">Loading...</p>}

      {error && (
        <p className="mt-6 text-red-500">
          {error}
        </p>
      )}

      {!loading && !error && (
       <>
  {/* KPI CARDS */}
  <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
    {[
      {
        title: "Total Listings",
        value: stats.total,
        color: "from-blue-500 to-cyan-400",
        glow: "shadow-blue-200/60",
        icon: "📦",
      },
      {
        title: "Active",
        value: stats.active,
        color: "from-emerald-500 to-green-400",
        glow: "shadow-emerald-200/60",
        icon: "🟢",
      },
      {
        title: "Sold",
        value: stats.sold,
        color: "from-violet-500 to-fuchsia-500",
        glow: "shadow-violet-200/60",
        icon: "💸",
      },
      {
        title: "Rented",
        value: stats.rented,
        color: "from-orange-500 to-amber-400",
        glow: "shadow-orange-200/60",
        icon: "🏠",
      },
    ].map((card) => (
      <div
        key={card.title}
        className={`
          group
          relative
          overflow-hidden
          rounded-3xl
          bg-white
          p-6
          shadow-xl
          ${card.glow}
          transition-all
          duration-300
          hover:-translate-y-2
          hover:shadow-2xl
        `}
      >
        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${card.color} opacity-15 blur-3xl group-hover:scale-125 transition`}
        />

        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-2xl text-white shadow-lg`}
        >
          {card.icon}
        </div>

        <p className="text-sm font-medium text-slate-500">
          {card.title}
        </p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
          {card.value}
        </h2>
      </div>
    ))}
  </div>

  {/* FILTERS */}
  <div className="mt-10 flex flex-wrap gap-3">
    <button className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700">
      All
    </button>

    <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-md transition hover:shadow-lg">
      Selling
    </button>

    <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-md transition hover:shadow-lg">
      Renting
    </button>

    <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-md transition hover:shadow-lg">
      Sold
    </button>
  </div>

  {/* CONTENT */}
  <div className="mt-8">
    {listings.length === 0 ? (
      <div className="rounded-3xl bg-white p-16 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-5xl">
          📦
        </div>

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          No Listings Yet
        </h2>

        <p className="mt-3 text-slate-500">
          Your listings will appear here once you create one.
        </p>

        <Button className="mt-8 h-11 rounded-xl px-6 shadow-lg">
          + Create Your First Listing
        </Button>
      </div>
    ) : (
      <div className="grid gap-5">
        {/* Listing cards will go here in the next step */}
      </div>
    )}
  </div>
</>
      )}
    </AppShell>
  );
}

export default MyListings;