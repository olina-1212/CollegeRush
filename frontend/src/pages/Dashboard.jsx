import { useEffect, useMemo, useState } from "react";
import api from "../api/apiClient";

import AppShell from "../components/dashboard/AppShell";
import CategoryChip from "../components/dashboard/CategoryChip";
import ProductCard from "../components/dashboard/ProductCard";
import FilterPanel from "../components/dashboard/FilterPanel";
import EmptyState from "../components/dashboard/EmptyState";
import { SlidersHorizontal, X, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";


const CATEGORIES = [
  "ALL",
  "BOOKS",
  "NOTES", 
  "ELECTRONICS",
  "SUPPLIES",
  "ESSENTIALS",
  "LAB_EQUIPMENT",
  "OTHERS"
];
function Dashboard() {
  const [listings,setListings] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [activeCategory,setActiveCategory] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [filters,setFilters] = useState({
    type:"ALL",
    category:"ALL",
    price:100000,
    condition:"ALL",
  });
  // FETCH LISTINGS
  useEffect(() => {
  const fetchListings = async () => {
    try {
      const res = await api.get("/listings");

      setListings(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  fetchListings();
}, []);
 

      // FILTER LOGIC
const filteredListings = useMemo(() => {
  return listings.filter((item) => {

    // SEARCH
    if (search.trim() !== "") {
      const query = search.toLowerCase();

      const matches =
        item.title?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        (item.location || "").toLowerCase().includes(query) ||
        item.type?.toLowerCase().includes(query);

      if (!matches) return false;
    }

    // CATEGORY CHIPS
    if (
      activeCategory !== "ALL" &&
      item.category !== activeCategory
    ) {
      return false;
    }

    // FILTER PANEL CATEGORY
    if (
      filters.category !== "ALL" &&
      item.category !== filters.category
    ) {
      return false;
    }

    // TYPE
    if (
      filters.type !== "ALL" &&
      item.type !== filters.type
    ) {
      return false;
    }

    // CONDITION
    if (
      filters.condition !== "ALL" &&
      item.condition !== filters.condition
    ) {
      return false;
    }

    // PRICE
    if (Number(item.price) > filters.price) {
      return false;
    }

    return true;
  });
}, [listings, filters, activeCategory, search]);
  return (

    <AppShell
  search={search}
  setSearch={setSearch}
>

      <div className="
        flex
        flex-col
        gap-6
      ">
        {/* HEADER */}
        {/* WORK CTA */}

<Link to="/work">

<div
className="
mt-6
relative
overflow-hidden
rounded-[28px]
bg-gradient-to-br
from-blue-600
via-indigo-600
to-violet-600
p-5
text-white
shadow-xl
transition-all
duration-300
hover:-translate-y-1
hover:shadow-2xl
sm:p-7
"
>

{/* Glow */}

<div
className="
absolute
-right-10
-top-10
h-32
w-32
rounded-full
bg-white/20
blur-3xl
"
/>


<div
className="
relative
flex
flex-col
gap-5
sm:flex-row
sm:items-center
sm:justify-between
"
>

<div className="flex gap-4">


<div
className="
flex
h-12
w-12
shrink-0
items-center
justify-center
rounded-2xl
bg-white/20
backdrop-blur
sm:h-14
sm:w-14
"
>

<Sparkles
className="text-white"
size={26}
/>

</div>


<div>

<h2
className="
text-xl
font-bold
sm:text-2xl
"
>
Need Academic Help?
</h2>


<p
className="
mt-1
max-w-md
text-sm
leading-6
text-blue-100
"
>
Find students who can help with assignments,
reports and projects.
</p>


</div>

</div>


<div
className="
flex
items-center
justify-between
gap-3
rounded-2xl
bg-white
px-4
py-3
text-sm
font-semibold
text-blue-600
shadow-lg
sm:w-fit
"
>

Explore Work

<ArrowRight size={18}/>

</div>


</div>


</div>

</Link>
        {/* CATEGORY CHIPS */}
       {/* CATEGORY CHIPS */}
<div
  className="
    -mx-4
    flex
    items-center
    gap-2
    overflow-x-auto
    px-4
    pb-2
    sm:mx-0
    sm:px-0
  "
>
  {CATEGORIES.map((category) => (
    <CategoryChip
      key={category}
      label={
        category === "ALL"
          ? "All"
          : category.replaceAll("_", " ")
      }
      active={activeCategory === category}
      onClick={() => setActiveCategory(category)}
    />
  ))}
</div>

<div className="flex gap-8">

  {/* Desktop Filters */}
  <div className="hidden w-80 shrink-0 lg:block">
    <FilterPanel
      filters={filters}
      setFilters={setFilters}
    />
  </div>

  {/* Products */}
  <div className="min-w-0 flex-1">

    {/* Top Bar */}
    <div className="mb-4 flex items-center justify-between">

      <p className="text-sm text-muted-foreground">
        {filteredListings.length} results
      </p>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setShowFilters(true)}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          bg-white
          px-3
          py-2
          text-sm
          shadow-sm
          lg:hidden
        "
      >
        <SlidersHorizontal size={18} />
        Filter
      </button>

    </div>

    {/* Mobile Filter Drawer */}
    {showFilters && (
      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/40
          lg:hidden
        "
      >
        <div
          className="
            absolute
            right-0
            top-0
            h-full
            w-[85%]
            max-w-sm
            overflow-y-auto
            bg-white
            p-5
            shadow-2xl
          "
        >
          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-lg font-semibold">
              Filters
            </h2>

            <button
              onClick={() => setShowFilters(false)}
            >
              <X size={24} />
            </button>

          </div>

          <FilterPanel
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
    )}

    {/* Listings */}

    {loading ? (
      <div className="flex justify-center py-20 text-muted-foreground">
        Loading listings...
      </div>
    ) : error ? (
      <EmptyState
        title="Something went wrong"
        description={error}
      />
    ) : filteredListings.length === 0 ? (
      <EmptyState
        title="No listings found"
        description="Try changing filters or add a new listing."
      />
    ) : (
      <div
        className="
  grid
  grid-cols-2
  gap-4
  lg:grid-cols-3
"
      >
        {filteredListings.map((item) => (
          <ProductCard
            key={item.id}
            listing={item}
          />
        ))}
      </div>
    )}

  </div>
</div>
      </div>
    </AppShell>
  );
}
export default Dashboard;