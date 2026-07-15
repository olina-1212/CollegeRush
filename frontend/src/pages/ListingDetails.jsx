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
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

        <div className="w-full max-w-[1700px] px-8 py-8 mx-auto">

          <div className="grid gap-10 xl:grid-cols-[1.8fr_430px]">

            {/* LEFT */}

            <div>

              {/* IMAGE CARD */}

              <div className="group relative overflow-hidden rounded-[38px] bg-white shadow-[0_25px_80px_rgba(15,23,42,.12)]">

                <img
                  src={images[activeImage]?.url}
                  alt={listing.title || "Listing"}
                  className="
h-[380px]
md:h-[460px]
xl:h-[520px]
w-full
object-contain
bg-slate-100
transition-all
duration-700
group-hover:scale-[1.02]
"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"></div>

                <div className="absolute bottom-8 left-8">

                  <div className="flex flex-wrap gap-3">

                    <Badge className="rounded-full bg-white/90 px-5 py-1 text-slate-900 backdrop-blur">
                      {listing.type}
                    </Badge>

                    <Badge
                      variant="secondary"
                      className="rounded-full px-5 py-1"
                    >
                      {listing.category}
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-full border-white bg-white/20 px-5 py-1 text-white backdrop-blur"
                    >
                      {listing.condition.replaceAll("_", " ")}
                    </Badge>

                  </div>

                  <h1 className="mt-6 max-w-3xl text-5xl font-black leading-tight text-white drop-shadow-lg">
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
                      left-8
                      top-1/2
                      flex
                      h-14
                      w-14
                      -translate-y-1/2
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
                      <ChevronLeft />
                    </button>

                    <button
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="
                      absolute
                      right-8
                      top-1/2
                      flex
                      h-14
                      w-14
                      -translate-y-1/2
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
                      <ChevronRight />
                    </button>
                  </>
                )}
              </div>
                            {/* THUMBNAILS */}

              {images.length > 1 && (
                <div className="mt-8 flex gap-5 overflow-x-auto pb-2">
                  {images.map((img, index) => (
                    <button
                      key={img.url || index}
                      onClick={() => setActiveImage(index)}
                      className={`
                        relative
                        h-28
                        w-32
                        shrink-0
                        overflow-hidden
                        rounded-3xl
                        transition-all
                        duration-300
                        ${
                          activeImage === index
                            ? "scale-105 ring-4 ring-blue-500 shadow-2xl"
                            : "opacity-80 hover:scale-105 hover:opacity-100"
                        }
                      `}
                    >
                      <img
                        src={img.url}
                        alt={`Thumbnail ${index + 1}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-110"
                      />

                      {activeImage === index && (
                        <div className="absolute inset-0 rounded-3xl border-2 border-white"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* PRODUCT INFO */}
<div className="mt-8 rounded-[28px] bg-white p-7 shadow-lg">

  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

    <div className="flex-1">

      <h2 className="text-2xl font-bold text-slate-900">
        Description
      </h2>

      <p className="mt-5 whitespace-pre-wrap text-[16px] leading-8 text-slate-600">
        {listing.description}
      </p>

    </div>

    <div className="flex shrink-0 gap-3">

      <div className="rounded-2xl bg-slate-100 px-4 py-3">

        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Category
        </p>

        <p className="mt-1 font-semibold text-slate-900">
          {listing.category}
        </p>

      </div>

      <div className="rounded-2xl bg-slate-100 px-4 py-3">

        <p className="text-[11px] uppercase tracking-widest text-slate-500">
          Condition
        </p>

        <p className="mt-1 font-semibold text-slate-900">
          {(listing.condition || "").replaceAll("_", " ")}
        </p>

      </div>

    </div>

  </div>

  <div className="mt-8 flex flex-wrap gap-4">

    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
        <MapPin size={18} className="text-blue-600" />
      </div>

      <div>

        <p className="text-xs text-slate-500">
          College
        </p>

        <p className="font-semibold text-slate-900">
          {listing.location || "Campus"}
        </p>

      </div>

    </div>

    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-3">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
        <Calendar size={18} className="text-emerald-600" />
      </div>

      <div>

        <p className="text-xs text-slate-500">
          Listed On
        </p>

        <p className="font-semibold text-slate-900">
          {new Date(listing.createdAt).toLocaleDateString()}
        </p>

      </div>

    </div>

</div></div></div>
            {/* RIGHT SIDEBAR */}

            <div>

              <div className="sticky top-24">
                              <div className="overflow-hidden rounded-[38px] border border-white/40 bg-white/80 p-8 shadow-[0_25px_80px_rgba(15,23,42,.12)] backdrop-blur-xl">

                  {/* PRICE */}

                  <div className="rounded-[30px] bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 text-white shadow-xl">

                    <p className="text-sm uppercase tracking-[0.35em] text-blue-100">
                      Asking Price
                    </p>

                    <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                      ₹{listing.price}
                    </h2>

                    <p className="mt-3 text-blue-100">
                      Fair price • Negotiable with seller
                    </p>

                  </div>

                  

                  

                  {/* SELLER */}

                  <div className="mt-10 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 text-white">

                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      Seller
                    </p>

                    <div className="mt-6 flex items-center gap-5">

                      <img
                        src={
                          listing.seller?.avatarUrl||
                          "https://ui-avatars.com/api/?background=2563eb&color=fff&size=256&name=" +
                            encodeURIComponent(listing.seller?.name)
                        }
                        alt={listing.seller.name}
                        className="h-16 w-16 md:h-20 md:w-20 rounded-full border-4 border-white object-cover shadow-xl"
                      />

                      <div>

                        <h3 className="text-2xl font-bold">
                          {listing.seller.name}
                        </h3>

                        <p className="mt-1 text-slate-300">
                          {listing.seller?.collegeName ||
                            "CollegeSquare User"}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* ACTION BUTTONS */}

                  <Button
  onClick={startConversation}
  disabled={startingChat}
  className="
  mt-10
  h-14
  w-full
  rounded-2xl
  bg-gradient-to-r
  from-blue-600
  to-indigo-600
  text-base
  font-semibold
  shadow-xl
  transition-all
  hover:scale-[1.02]
  hover:shadow-2xl
  disabled:opacity-60
  "
>
  <MessageCircle className="mr-3 h-5 w-5" />

  {startingChat ? "Opening..." : "Contact Seller"}
</Button>

                  <p className="mt-6 text-center text-sm leading-6 text-slate-500">
                    Always meet in a safe public place inside your campus.
                    Never pay in advance without verifying the product.
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