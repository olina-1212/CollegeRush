import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  if (loading) {
    return (
      <AppShell>
        <div className="py-40 text-center text-slate-500">
          Loading listing...
        </div>
      </AppShell>
    );
  }

  if (!listing) {
    return (
      <AppShell>
        <div className="py-40 text-center text-red-500">
          Listing not found.
        </div>
      </AppShell>
    );
  }

  const images =
    listing.images?.length > 0
      ? listing.images
      : [{ url: "https://placehold.co/900x700?text=No+Image" }];

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* LEFT */}

          <div>

            {/* IMAGE */}

            <div className="relative overflow-hidden rounded-[32px] bg-white shadow-xl">

              <img
                src={images[activeImage].url}
                alt={listing.title}
                className="aspect-[4/3] w-full object-cover"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg"
                  >
                    <ChevronLeft />
                  </button>

                  <button
                    onClick={() =>
                      setActiveImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg"
                  >
                    <ChevronRight />
                  </button>
                </>
              )}

            </div>

            {/* THUMBNAILS */}

            {images.length > 1 && (

              <div className="mt-5 flex gap-4 overflow-auto">

                {images.map((img, index) => (

                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`overflow-hidden rounded-2xl transition ${
                      activeImage === index
                        ? "ring-4 ring-blue-500"
                        : ""
                    }`}
                  >

                    <img
                      src={img.url}
                      className="h-24 w-24 object-cover"
                    />

                  </button>

                ))}

              </div>

            )}

            {/* DESCRIPTION */}

            <div className="mt-10 rounded-[30px] bg-white p-8 shadow-lg">

              <h2 className="text-2xl font-bold">
                Description
              </h2>

              <p className="mt-5 whitespace-pre-wrap leading-8 text-slate-600">
                {listing.description}
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="sticky top-24 rounded-[32px] bg-white p-8 shadow-xl">

              <div className="flex gap-2 flex-wrap">

                <Badge>{listing.type}</Badge>

                <Badge variant="secondary">
                  {listing.category}
                </Badge>

                <Badge variant="outline">
                  {listing.condition.replaceAll("_", " ")}
                </Badge>

              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight">
                {listing.title}
              </h1>

              <h2 className="mt-6 text-5xl font-bold text-blue-600">
                ₹{listing.price}
              </h2>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3 text-slate-500">

                  <MapPin size={18} />

                  {listing.location || "Campus"}

                </div>

                <div className="flex items-center gap-3 text-slate-500">

                  <Calendar size={18} />

                  {new Date(
                    listing.createdAt
                  ).toLocaleDateString()}

                </div>

              </div>

              {/* SELLER */}

              <div className="mt-8 rounded-2xl bg-slate-50 p-5">

                <h3 className="font-semibold">
                  Seller
                </h3>

                <div className="mt-4 flex items-center gap-4">

                  <img
                    src={
                      listing.seller.avatarUrl ||
                      "https://ui-avatars.com/api/?name=" +
                        listing.seller.name
                    }
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>

                    <p className="font-semibold text-lg">
                      {listing.seller.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {listing.seller.collegeName ||
                        "CollegeRush User"}
                    </p>

                  </div>

                </div>

              </div>

              {/* BUTTONS */}

              <Button
                className="mt-8 h-12 w-full rounded-2xl text-base"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contact Seller
              </Button>

              <Button
                variant="outline"
                className="mt-3 h-12 w-full rounded-2xl"
              >
                <Flag className="mr-2 h-5 w-5" />
                Report Listing
              </Button>

            </div>

          </div>

        </div>

      </div>
    </AppShell>
  );
}

export default ListingDetails;