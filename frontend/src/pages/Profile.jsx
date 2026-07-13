import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Trash2,
  Eye,
  Package,
  ShoppingBag,
  Home,
} from "lucide-react";

import AppShell from "../components/dashboard/AppShell";
import api from "../api/apiClient";
import { Button } from "../components/ui/button";

function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const res = await api.get("/users/profile");

setProfile(res.data.data);
setListings(res.data.data.listings || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load your listings.");
    } finally {
      setLoading(false);
    }
  };

  const deleteListing = async (id) => {
    if (!window.confirm("Delete this listing?")) return;

    try {
      await api.delete(`/listings/${id}`);

      setListings((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Couldn't delete listing.");
    }
  };
const stats = useMemo(() => {
  return {
    total: listings.length,
    selling: listings.filter((l) => l.type === "SELL").length,
    renting: listings.filter((l) => l.type === "RENT").length,
  };
}, [listings]);
  
  return (
    <AppShell>

      {profile && (

<div className="
mb-10
overflow-hidden
rounded-[32px]
bg-white
shadow-xl
">

<div className="
h-36
bg-gradient-to-r
from-blue-600
via-indigo-500
to-cyan-400
"/>

<div className="
relative
px-8
pb-8
">

<img
src={profile.avatarUrl}
alt={profile.name}
className="
-mt-14
h-28
w-28
rounded-full
border-4
border-white
object-cover
shadow-xl
"
/>

<div className="
mt-5
flex
items-start
justify-between
">

<div>

<h1 className="text-3xl font-bold">

{profile.name}

</h1>

<p className="text-slate-500">

{profile.email}

</p>

<p className="mt-2 text-sm text-slate-500">

🎓 {profile.collegeName || "Add your college"}

</p>

{profile.bio && (

<p className="mt-3 max-w-2xl text-slate-600">

{profile.bio}

</p>

)}

</div>

<Button
variant="outline"
className="rounded-xl"
>

Edit Profile

</Button>

</div>

</div>

</div>

)}
      <div className="flex items-end justify-between mb-10">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            My Listings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage everything you've posted on CollegeRush.
          </p>
        </div>

        <Link to="/create-listing">
          <Button className="h-12 rounded-2xl px-6 shadow-xl">
            + New Listing
          </Button>
        </Link>

      </div>

      {loading && (
        <div className="text-center py-20 text-slate-500">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center py-20 text-red-500">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>

<div className="grid grid-cols-1 md:grid-cols-3 gap-7">

{[
{
title:"Total Listings",
value:stats.total,
icon:<Package size={26}/>,
color:"from-blue-500 to-cyan-400"
},
{
title:"Selling",
value:stats.selling,
icon:<ShoppingBag size={26}/>,
color:"from-violet-500 to-indigo-500"
},
{
title:"Renting",
value:stats.renting,
icon:<Home size={26}/>,
color:"from-orange-500 to-amber-400"
}
].map(card=>(

<div
key={card.title}
className="
group
relative
overflow-hidden
rounded-[28px]
bg-white
px-6
py-5
shadow-lg
transition-all
duration-300
hover:-translate-y-1
hover:shadow-2xl
"
>

<div
className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-3xl`}
/>

<div
className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}
>

{card.icon}

</div>

<p className="mt-3 text-slate-500 font-medium">

{card.title}

</p>

<h2 className="mt-2 text-3xl font-bold">

{card.value}

</h2>

</div>

))}

</div>



<div className="mt-10">

 {listings.length === 0 ? (

<div className="rounded-[32px] bg-white p-16 text-center shadow-xl">

<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">

<Package
size={44}
className="text-blue-600"
/>

</div>

<h2 className="mt-6 text-3xl font-bold text-slate-800">

No Listings Yet

</h2>

<p className="mt-3 text-slate-500">

Create your first listing and it'll appear here.

</p>

<Link to="/create-listing">

<Button className="mt-8 rounded-2xl h-12 px-7 shadow-lg">

+ Create Listing

</Button>

</Link>

</div>

) : (

<div className="grid gap-6">

{listings.map((listing) => (
  <div
    key={listing.id}
    className="
      group
      overflow-hidden
      rounded-2xl
      bg-white
      shadow-md
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-xl
    "
  >
    <div className="flex flex-col md:flex-row">

      {/* IMAGE */}
      <div className="relative md:w-56 shrink-0">
        <img
          src={
            listing.images?.length
              ? listing.images[0].url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={listing.title}
          className="h-40 w-full object-cover md:h-full"
        />

        <span
          className={`
            absolute left-3 top-3
            rounded-full
            px-3 py-1
            text-[11px]
            font-semibold
            text-white
            shadow-md
            ${
              listing.type === "SELL"
                ? "bg-blue-600"
                : "bg-orange-500"
            }
          `}
        >
          {listing.type}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col justify-between px-5 py-4">

        <div>

          {/* TITLE + PRICE */}
          <div className="flex items-start justify-between gap-4">

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900 line-clamp-1">
                {listing.title}
              </h2>

              <p
                className="mt-1 text-sm text-slate-500 line-clamp-2"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {listing.description}
              </p>
            </div>

            <h2 className="whitespace-nowrap text-2xl font-bold text-blue-600">
              ₹{listing.price}
            </h2>

          </div>

          {/* TAGS */}
          <div className="mt-3 flex flex-wrap items-center gap-2">

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              📚 {listing.category}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              ✨ {listing.condition.replaceAll("_", " ")}
            </span>

            <span className="ml-auto text-xs text-slate-400">
              {new Date(listing.createdAt).toLocaleDateString()}
            </span>

          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-4 flex gap-2">

          <Link to={`/listing/${listing.id}`}>
            <Button className="h-9 rounded-xl px-4 text-sm">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>

         <Button
  variant="outline"
  className="h-9 rounded-xl px-4 text-sm"
  onClick={() => navigate(`/edit-listing/${listing.id}`)}
>
  Edit
</Button>

          <Button
            variant="destructive"
            className="h-9 rounded-xl px-4 text-sm"
            onClick={() => deleteListing(listing.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

        </div>

      </div>

    </div>
  </div>
))}

</div>

)}

</div>

</>

)}

</AppShell>

);

}

export default MyListings;