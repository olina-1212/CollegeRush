import { useEffect, useMemo, useState } from "react";
import { LogOut } from "lucide-react";
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
import { Button } from "../components/ui/Button";

function MyListings() {
  const [profile, setProfile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    collegeName: "",
    bio: "",
  });

  const [listings, setListings] = useState([]);
  const [workPosts, setWorkPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
  setEditing(true);

  setForm((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};
  const fetchProfile = async () => {
  try {
    const res = await api.get("/users/profile");
    const data = res.data.data;

setProfile(data);

setForm({
  name: data.name || "",
  collegeName: data.collegeName || "",
  bio: data.bio || "",
});

setListings(data.listings || []);
setWorkPosts(data.workPosts || []);

  } catch (err) {
    console.error(err);
    setError("Failed to load profile.");
  } finally {
    setLoading(false);
  }
};

const handleSave = async () => {
  try {
    const res = await api.put("/users/profile", form);

    setProfile(res.data.data);
setEditing(false);
    alert("Profile updated successfully!");

  } catch (err) {
    console.error(err);
    alert("Couldn't update profile.");
  }
};
 const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/");
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
    works: workPosts.length,
  };
}, [listings, workPosts]);
  
  return (
    <AppShell>

{profile && (
  <div
    className="
      mb-6
      overflow-hidden
      rounded-2xl
      bg-white
      shadow-xl
      sm:mb-10
      sm:rounded-[32px]
    "
  >
    {/* Cover */}
    <div
      className="
        h-24
        bg-gradient-to-r
        from-blue-600
        via-indigo-500
        to-cyan-400
        sm:h-36
      "
    />

    <div
      className="
        relative
        px-4
        pb-5
        sm:px-8
        sm:pb-8
      "
    >
      {/* Avatar */}
      <img
        src={profile.avatarUrl}
        alt={profile.name}
        className="
          -mt-10
          h-20
          w-20
          rounded-full
          border-4
          border-white
          object-cover
          shadow-xl
          sm:-mt-14
          sm:h-28
          sm:w-28
        "
      />

      <div
        className="
          mt-4
          flex
          flex-col
          gap-5
          sm:mt-5
          sm:flex-row
          sm:items-start
          sm:justify-between
        "
      >
        {/* Left */}
        <div className="flex-1">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              bg-transparent
              px-2
              py-1
              text-2xl
              font-bold
              text-slate-900
              outline-none
              transition-all
              duration-200
              hover:bg-slate-50
              focus:bg-slate-50
              focus:ring-2
              focus:ring-blue-200
              sm:text-3xl
            "
          />

          <p className="mt-1 text-sm text-slate-500 break-all">
            {profile.email}
          </p>

          <input
            name="collegeName"
            value={form.collegeName}
            onChange={handleChange}
            placeholder="Your College"
            className="
              mt-4
              w-full
              rounded-xl
              bg-slate-50
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition-all
              duration-200
              hover:bg-slate-100
              focus:bg-white
              focus:ring-2
              focus:ring-blue-200
              sm:py-3
            "
          />

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Tell others about yourself..."
            className="
              mt-4
              w-full
              resize-none
              rounded-2xl
              bg-slate-50
              p-3
              text-sm
              leading-6
              text-slate-700
              placeholder:text-slate-400
              outline-none
              transition-all
              duration-200
              hover:bg-slate-100
              focus:bg-white
              focus:ring-2
              focus:ring-blue-200
              sm:mt-5
              sm:p-4
            "
          />
        </div>

        {/* Save Button */}
        <div className="flex w-full gap-3 sm:w-auto">
  <Button
    onClick={handleSave}
    className="
      h-10
      flex-1
      rounded-xl
      px-5
      text-sm
      sm:h-11
      sm:flex-none
      sm:px-6
    "
  >
    Save Changes
  </Button>

  <Button
    variant="outline"
    onClick={handleLogout}
    className="
      h-10
      rounded-xl
      px-4
      border-red-200
      text-red-600
      hover:bg-red-50
      sm:h-11
    "
  >
    <LogOut className="h-4 w-4" />
  </Button>
</div>
      </div>
    </div>
  </div>
)}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Listings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage everything you've posted on CollegeSquare
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

<div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-7">
  {[
    
    {
      title: "Selling",
      value: stats.selling,
      icon: <ShoppingBag className="h-4 w-4 md:h-6 md:w-6" />,
      color: "from-violet-500 to-indigo-500",
    },
    {
      title: "Renting",
      value: stats.renting,
      icon: <Home className="h-4 w-4 md:h-6 md:w-6" />,
      color: "from-orange-500 to-amber-400",
    },
    {
  title: "Work Requests",
  value: stats.works,
  icon: <Package className="h-4 w-4 md:h-6 md:w-6" />,
  color: "from-green-500 to-emerald-400",
},
  ].map((card) => (
    <div
      key={card.title}
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        bg-white
        p-3
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        md:rounded-[28px]
        md:px-6
        md:py-5
      "
    >
      <div
        className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-2xl md:-right-10 md:-top-10 md:h-40 md:w-40 md:blur-3xl`}
      />

      <div
        className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-md md:h-12 md:w-12 md:rounded-2xl`}
      >
        {card.icon}
      </div>

      <p className="mt-2 text-[11px] font-medium text-slate-500 md:mt-3 md:text-base">
        {card.title}
      </p>

      <h2 className="mt-1 text-lg font-bold text-slate-900 md:mt-2 md:text-3xl">
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
    <div className="flex flex-col sm:flex-row">

      {/* IMAGE */}
      <div className="relative sm:w-44
lg:w-56 shrink-0">
        <img
          src={
            listing.images?.length
              ? listing.images[0].url
              : "https://placehold.co/600x400?text=No+Image"
          }
          alt={listing.title}
          className="h-48 w-full object-cover sm:h-full"
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
      <div className="flex flex-1 flex-col justify-between px-4 py-4 sm:px-5">

        <div>

          {/* TITLE + PRICE */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex-1">
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-1">
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

            <h2 className="whitespace-nowrap text-xl sm:text-2xl font-bold text-blue-600">
              ₹{listing.price}
            </h2>

          </div>

          {/* TAGS */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">

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
        <div className="mt-5 grid grid-cols-1 gap-2 sm:flex">

         <Link to={`/item/${listing.id}`}>
            <Button className="h-10 w-full rounded-xl px-4 text-sm sm:h-9 sm:w-auto">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </Link>

         <Button
  variant="outline"
  className="h-10 w-full rounded-xl px-4 text-sm sm:h-9 sm:w-auto"
onClick={(e) => {
  e.stopPropagation();
  navigate(`/edit-listing/${listing.id}`);
}}
>
  Edit
</Button>

          <Button
            variant="destructive"
            className="h-10 w-full rounded-xl px-4 text-sm sm:h-9 sm:w-auto"
            onClick={(e) => {
  e.stopPropagation();
  deleteListing(listing.id);
}}
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
<div className="mt-12">

<h2 className="
text-3xl
font-bold
text-slate-900
mb-6
">
My Work Requests
</h2>


{workPosts.length === 0 ? (

<div className="
rounded-[32px]
bg-white
p-10
text-center
shadow-xl
">

<p className="text-slate-500">
No assignment/project requests created yet.
</p>

</div>

) : (

<div className="grid gap-6">

{workPosts.map((work)=>(

<div
key={work.id}
className="
rounded-3xl
bg-white
p-6
shadow-md
"
>

<h3 className="
text-xl
font-bold
text-slate-900
">
{work.title}
</h3>


<p className="
mt-2
text-slate-500
">
{work.description}
</p>


<div className="
mt-4
flex
flex-wrap
gap-3
">

<span className="
rounded-full
bg-blue-50
px-4
py-2
text-sm
text-blue-600
">
{work.subject}
</span>


<span className="
rounded-full
bg-green-50
px-4
py-2
text-sm
text-green-600
">
₹{work.budget}
</span>


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