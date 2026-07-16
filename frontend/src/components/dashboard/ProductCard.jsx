import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock3,
  ArrowRight,
} from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
} from "@/components/ui/Card";

function ProductCard({ listing }) {
  const navigate = useNavigate();

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
  onClick={() => navigate(`/listing/${listing.id}`)}
  className="
    group
    cursor-pointer
    overflow-hidden
    rounded-3xl
    border-0
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
  "
>
      {/* IMAGE */}

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={listing.title}
          className="
 h-40
sm:h-48
  w-full
  object-cover
  transition-transform
  duration-500
  group-hover:scale-105
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

       
      </div>

      <CardContent className="space-y-3 p-5">

        {/* Category */}

        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
          {listing.category}
        </p>

        {/* Title */}

        <h2 className="line-clamp-2 text-base sm:text-lg font-bold text-slate-900">
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

       <div className="border-t pt-5">

  <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
    Price
  </p>

  <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-blue-600">
    ₹{listing.price}
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    📍 {listing.location || listing.seller?.collegeName || "Campus"}
  </p>

</div>

      </CardContent>
    </Card>
  );
}

export default ProductCard;