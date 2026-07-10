import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

function ProductCard({ listing }) {
  const [saved, setSaved] = useState(false);

  const image =
    listing.images?.length > 0
      ? listing.images[0].url
      : "/placeholder.png";

  const badgeColor = {
    SELL: "default",
    RENT: "secondary",
    BORROW: "outline",
    EXCHANGE: "outline",
  };

  return (
    <Card
      className="
      group
      overflow-hidden
      rounded-3xl
      border-0
      bg-white
      shadow-sm
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
    "
    >
      {/* IMAGE */}

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={listing.title}
          className="
            h-60
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {/* dark gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Listing Type */}

        <Badge
          variant={badgeColor[listing.type] || "default"}
          className="absolute left-4 top-4 rounded-full px-3 py-1"
        >
          {listing.type}
        </Badge>

        {/* Wishlist */}

        <button
          onClick={() => setSaved(!saved)}
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-lg
            backdrop-blur
            transition
            hover:scale-110
          "
        >
          <Heart
            className={`h-5 w-5 transition ${
              saved
                ? "fill-red-500 text-red-500"
                : "text-slate-500"
            }`}
          />
        </button>
      </div>

      <CardContent className="space-y-5 p-6">

        {/* Category */}

        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          {listing.category}
        </p>

        {/* Title */}

        <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
          {listing.title}
        </h2>

        {/* Description */}

        <p className="line-clamp-2 text-sm text-slate-500">
          {listing.description}
        </p>

        {/* Location + Condition */}

        <div className="flex items-center justify-between text-sm text-slate-500">

          <div className="flex items-center gap-1">
            <MapPin size={15} />
            {listing.location || "Campus"}
          </div>

          <div className="flex items-center gap-1">
            <Clock3 size={15} />
            {listing.condition}
          </div>

        </div>

        {/* Bottom */}

        <div className="flex items-center justify-between border-t pt-5">

          <div>

            <p className="text-3xl font-bold text-slate-900">
              ₹{listing.price}
            </p>

            <p className="text-xs text-slate-500">
              Negotiable
            </p>

          </div>

          <Button
            asChild
            className="rounded-t-3xl px-5"
          >
            <Link to={`/item/${listing.id}`}>
              View
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

        </div>

      </CardContent>
    </Card>
  );
}

export default ProductCard;