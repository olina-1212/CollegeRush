import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  MessageCircle,
  Flag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import api from "../api/apiClient";
import AppShell from "../components/dashboard/AppShell";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

function ListingDetails() {
  const { id } = useParams();
const navigate = useNavigate();

const [startingChat, setStartingChat] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await api.get(`/listings/${id}`);
      setListing(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
const startConversation = async () => {
  try {
    setStartingChat(true);

    const res = await api.post("/chat/start", {
      listingId: listing.id,
    });

    navigate(`/messages/${res.data.data.id}`);
  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
        "Unable to start conversation."
    );
  } finally {
    setStartingChat(false);
  }
};
  if (loading) {
    return (
      <AppShell>
        <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="space-y-5 text-center">
            <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>

            <h2 className="text-2xl font-bold text-slate-800">
              Loading Listing
            </h2>

            <p className="text-slate-500">
              Please wait while we fetch the details...
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!listing) {
    return (
      <AppShell>
        <div className="flex min-h-[80vh] items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
          <div className="rounded-3xl bg-white px-14 py-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-red-500">
              Listing not found
            </h2>

            <p className="mt-3 text-slate-500">
              This listing may have been removed.
            </p>
          </div>
        </div>
      </AppShell>
    );
  }

  const images =
    listing.images?.length > 0
      ? listing.images
      : [
          {
            url: "https://placehold.co/1200x900?text=No+Image",
          },
        ];

  return (
    <AppShell>
      <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">

        <div className="w-full max-w-[1700px] px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 mx-auto">

          <div className="grid gap-6 xl:grid-cols-[1.8fr_430px]">

            {/* LEFT */}

            <div>

   {/* IMAGE CARD */}

<div
  className="
    group
    relative
    w-full
    overflow-hidden
    rounded-[24px]
    sm:rounded-[30px]
    xl:rounded-[38px]
    bg-white
    shadow-[0_25px_80px_rgba(15,23,42,.12)]
  "
>
  <img
    src={images[activeImage]?.url}
    alt={listing.title}
    className="
      block
      w-full
      h-56
      sm:h-72
      md:h-[420px]
      xl:h-[520px]
      object-cover
      bg-slate-100
      transition-transform
      duration-700
      group-hover:scale-[1.02]
    "
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

  <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
    <div className="flex flex-wrap gap-2 sm:gap-3">

      <Badge
        className="
          rounded-full
          bg-white/90
          px-3
          sm:px-5
          py-1
          text-xs
          sm:text-sm
          text-slate-900
          backdrop-blur
        "
      >
        {listing.type}
      </Badge>

      <Badge
        variant="secondary"
        className="
          rounded-full
          px-3
          sm:px-5
          py-1
          text-xs
          sm:text-sm
        "
      >
        {listing.category}
      </Badge>

      <Badge
        variant="outline"
        className="
          rounded-full
          border-white
          bg-white/20
          px-3
          sm:px-5
          py-1
          text-xs
          sm:text-sm
          text-white
          backdrop-blur
        "
      >
        {listing.condition.replaceAll("_", " ")}
      </Badge>

    </div>

    <h1
      className="
        mt-4
        sm:mt-6
        max-w-full
        sm:max-w-[90%]
        break-words
        text-2xl
        sm:text-4xl
        xl:text-5xl
        font-black
        leading-tight
        text-white
        drop-shadow-lg
      "
    >
      {listing.title}
    </h1>
  </div>

  {images.length > 1 && (
    <>
      <button
        onClick={() =>
          setActiveImage((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
          )
        }
        className="
          absolute
          left-3
          sm:left-8
          top-1/2
          -translate-y-1/2
          flex
          h-9
          w-9
          sm:h-12
          sm:w-12
          items-center
          justify-center
          rounded-full
          bg-white/90
          shadow-xl
          backdrop-blur
          transition
          hover:scale-110
        "
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() =>
          setActiveImage((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
          )
        }
        className="
          absolute
          right-3
          sm:right-8
          top-1/2
          -translate-y-1/2
          flex
          h-9
          w-9
          sm:h-12
          sm:w-12
          items-center
          justify-center
          rounded-full
          bg-white/90
          shadow-xl
          backdrop-blur
          transition
          hover:scale-110
        "
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </>
  )}
</div>

{/* THUMBNAILS */}

{images.length > 1 && (
  <div
    className="
      mt-5
      flex
      gap-3
      overflow-x-auto
      pb-2
      snap-x
      snap-mandatory
    "
  >
    {images.map((img, index) => (
      <button
        key={img.url || index}
        onClick={() => setActiveImage(index)}
        className={`
          relative
          h-16
          w-20
          sm:h-28
          sm:w-32
          shrink-0
          snap-start
          overflow-hidden
          rounded-2xl
          transition-all
          duration-300
          ${
            activeImage === index
              ? "scale-105 ring-4 ring-blue-500 shadow-xl"
              : "opacity-80 hover:opacity-100 hover:scale-105"
          }
        `}
      >
        <img
          src={img.url}
          alt={`Thumbnail ${index + 1}`}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            hover:scale-110
          "
        />

        {activeImage === index && (
          <div className="absolute inset-0 rounded-2xl border-2 border-white" />
        )}
      </button>
    ))}
  </div>
)}
             {/* PRODUCT INFO */}

<div className="mt-6 sm:mt-8 rounded-[24px] sm:rounded-[28px] bg-white p-5 sm:p-7 shadow-lg">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

    {/* DESCRIPTION */}

    <div className="flex-1 min-w-0">

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
        Description
      </h2>

      <p
        className="
          mt-4
          whitespace-pre-wrap
          break-words
          text-[15px]
          leading-7
          sm:text-base
          sm:leading-8
          text-slate-600
        "
      >
        {listing.description}
      </p>

    </div>

    {/* CATEGORY + CONDITION */}

    <div className="grid grid-cols-2 gap-3 lg:w-[240px] shrink-0">

      <div className="rounded-2xl bg-slate-100 px-4 py-3">

        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Category
        </p>

        <p className="mt-1 break-words font-semibold text-slate-900">
          {listing.category}
        </p>

      </div>

      <div className="rounded-2xl bg-slate-100 px-4 py-3">

        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Condition
        </p>

        <p className="mt-1 break-words font-semibold text-slate-900">
          {(listing.condition || "").replaceAll("_", " ")}
        </p>

      </div>

    </div>

  </div>

  {/* LOCATION + DATE */}

  <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">

    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-slate-50
        px-4
        py-3
      "
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
        <MapPin size={18} className="text-blue-600" />
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-500">
          College
        </p>

        <p className="break-words font-semibold text-slate-900">
          {listing.location || "Campus"}
        </p>

      </div>

    </div>

    <div
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        bg-slate-50
        px-4
        py-3
      "
    >

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
        <Calendar size={18} className="text-emerald-600" />
      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-500">
          Listed On
        </p>

        <p className="font-semibold text-slate-900">
          {new Date(listing.createdAt).toLocaleDateString()}
        </p>

      </div>

    </div>

  </div>

</div></div>
          {/* RIGHT SIDEBAR */}

<div>

  <div className="xl:sticky xl:top-24">

    <div
      className="
        overflow-hidden
        rounded-[24px]
        sm:rounded-[28px]
        border
        border-white/40
        bg-white/80
        p-5
        sm:p-6
        lg:p-7
        shadow-[0_20px_60px_rgba(15,23,42,.10)]
        backdrop-blur-xl
      "
    >

      {/* PRICE */}

      <div
        className="
          rounded-[22px]
          sm:rounded-[24px]
          bg-gradient-to-br
          from-blue-600
          via-indigo-600
          to-violet-600
          p-5
          sm:p-6
          text-white
          shadow-xl
        "
      >

        <p
          className="
            text-[10px]
            sm:text-[11px]
            uppercase
            tracking-[0.25em]
            text-blue-100
          "
        >
          Asking Price
        </p>

        <h2
          className="
            mt-2
            break-words
            text-3xl
            sm:text-4xl
            lg:text-5xl
            font-black
            leading-none
            tracking-tight
          "
        >
          ₹{listing.price}
        </h2>

        <p
          className="
            mt-3
            text-xs
            sm:text-sm
            text-blue-100
          "
        >
          Fair price • Negotiable
        </p>

      </div>



      {/* SELLER */}

<div
  className="
    mt-6
    rounded-[24px]
    bg-gradient-to-br
    from-slate-900
    via-slate-800
    to-slate-900
    p-5
    sm:p-6
    text-white
    overflow-hidden
  "
>
  <p
    className="
      text-[10px]
      uppercase
      tracking-[0.3em]
      text-slate-400
    "
  >
    Seller
  </p>

  <div
    className="
      mt-5
      flex
      items-center
      gap-4
      min-w-0
    "
  >
    <img
      src={
        listing.seller?.avatarUrl ||
        `https://ui-avatars.com/api/?background=2563eb&color=fff&size=256&name=${encodeURIComponent(
          listing.seller?.name || "User"
        )}`
      }
      alt={listing.seller?.name}
      className="
        h-14
        w-14
        sm:h-16
        sm:w-16
        shrink-0
        rounded-full
        border-2
        border-white/80
        object-cover
        shadow-lg
      "
    />

    <div className="flex-1 min-w-0">
      <h3
        className="
          text-lg
          sm:text-xl
          font-bold
          leading-tight
          break-words
        "
      >
        {listing.seller?.name}
      </h3>

      <p
        className="
          mt-1
          text-sm
          leading-5
          text-slate-300
          break-words
        "
      >
        {listing.seller?.collegeName || "CollegeSquare User"}
      </p>
    </div>
  </div>
</div>

{/* CONTACT BUTTON */}

<Button
  onClick={startConversation}
  disabled={startingChat}
  className="
    mt-6
    h-12
    sm:h-14
    w-full
    rounded-2xl
    bg-gradient-to-r
    from-blue-600
    to-indigo-600
    text-sm
    sm:text-base
    font-semibold
    shadow-lg
    transition-all
    duration-300
    hover:shadow-xl
    hover:scale-[1.02]
    disabled:opacity-60
    disabled:cursor-not-allowed
  "
>
  <MessageCircle className="mr-2 h-5 w-5 shrink-0" />

  <span className="truncate">
    {startingChat ? "Opening..." : "Contact Seller"}
  </span>
</Button>

<p
  className="
    mt-5
    px-1
    text-center
    text-xs
    sm:text-sm
    leading-5
    text-slate-500
  "
>
  Meet safely inside your campus.
  <br className="sm:hidden" />
  <span className="hidden sm:inline"> </span>
  Verify products before payment.
</p>


    </div>


  </div>


</div>

          </div>

        </div>

      </div>

    </AppShell>
  );
}

export default ListingDetails;