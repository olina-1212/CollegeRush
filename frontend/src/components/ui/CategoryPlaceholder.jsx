import { motion } from "framer-motion";

function CategoryPlaceholder({ category }) {

  const emojiMap = {
    BOOKS: "📚",
    NOTES: "📝",
    ELECTRONICS: "💻",
    SUPPLIES: "✏️",
    ESSENTIALS: "🎒",
    LAB_EQUIPMENT: "🧪",
    OTHERS: "📦",
  };


  const emoji = emojiMap[category] || "📦";


  return (
    <div
      className="
        relative
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-br
        from-blue-50
        via-indigo-50
        to-purple-50
      "
    >

      {/* floating box */}

      <motion.div
        animate={{
          y:[0,-8,0],
          rotate:[0,3,-3,0],
        }}

        transition={{
          duration:2.5,
          repeat:Infinity,
          ease:"easeInOut"
        }}

        className="
          text-5xl
        "
      >
        📦
      </motion.div>



      {/* sparkle item */}

      <motion.div
        animate={{
          opacity:[0,1,0],
          scale:[0.8,1.2,0.8],
        }}

        transition={{
          duration:2,
          repeat:Infinity,
        }}

        className="
          absolute
          top-8
          right-10
          text-xl
        "
      >
        ✨
      </motion.div>



      {/* category icon */}

      <motion.div
        initial={{
          opacity:0,
          y:10,
        }}

        animate={{
          opacity:1,
          y:0,
        }}

        transition={{
          delay:0.3,
        }}

        className="
          mt-3
          text-sm
        "
      >
        {emoji}
      </motion.div>



      {/* text animation */}

      <motion.p
        animate={{
          opacity:[0.5,1,0.5],
        }}

        transition={{
          duration:2,
          repeat:Infinity,
        }}

        className="
          mt-2
          text-xs
          font-semibold
          tracking-wide
          text-slate-500
        "
      >
        Unboxing Soon
      </motion.p>


    </div>
  );
}


export default CategoryPlaceholder;