import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/Badge";

function ProductCard({ listing, index = 0 }) {
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
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
        scale: 0.96,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.35,
        delay: index * 0.12,
        ease: "easeOut",
      }}

      whileTap={{
        scale: 0.97,
      }}

      onClick={() => navigate(`/item/${listing.id}`)}

      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-slate-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >


      {/* IMAGE */}

      <div
        className="
          relative
          aspect-square
          overflow-hidden
          bg-slate-100
        "
      >

        <img
          src={image}
          alt={listing.title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />


        {/* Image Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/25
            via-transparent
          "
        />


        {/* Category Tag */}

        <div
          className="
            absolute
            left-3
            top-3
            rounded-full
            bg-white/80
            px-3
            py-1
            text-[10px]
            font-bold
            uppercase
            tracking-wide
            text-slate-700
            backdrop-blur-md
          "
        >
          {listing.category.replaceAll("_", " ")}
        </div>



        {/* Sell / Rent */}

        <Badge
          variant={badgeColor[listing.type] || "default"}
          className="
            absolute
            bottom-3
            right-3
            rounded-full
            px-3
            py-1
            text-xs
          "
        >
          {listing.type}
        </Badge>


      </div>



      {/* CONTENT */}

      <div
        className="
          p-3
          sm:p-4
        "
      >


        {/* TITLE */}

        <h2
          className="
            line-clamp-1
            text-sm
            sm:text-base
            font-bold
            text-slate-900
          "
        >
          {listing.title}
        </h2>



        {/* PRICE + LOCATION */}

        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            gap-2
          "
        >

          <p
            className="
              text-lg
              sm:text-xl
              font-extrabold
              text-blue-600
            "
          >
            ₹{listing.price}
          </p>


          <p
            className="
              max-w-[80px]
              truncate
              text-xs
              text-slate-400
            "
          >
            📍 {listing.location || "Campus"}
          </p>


        </div>


      </div>


    </motion.div>
  );
}


export default ProductCard;