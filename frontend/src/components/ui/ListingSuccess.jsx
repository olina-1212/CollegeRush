import { motion } from "framer-motion";

export default function ListingSuccess() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 50,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      className="
        fixed
        bottom-8
        left-1/2
        z-50
        -translate-x-1/2
        rounded-3xl
        bg-white
        px-8
        py-5
        shadow-2xl
        border
        border-blue-100
      "
    >
      <div className="flex flex-col items-center text-center">

        <motion.div
          animate={{
            rotate: [0, -15, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-4xl"
        >
          🎉
        </motion.div>


        <h2 className="mt-2 text-lg font-bold text-slate-800">
          Your listing is live!
        </h2>


        <p className="mt-1 text-sm text-slate-500">
          Students can now discover your item.
        </p>

      </div>
    </motion.div>
  );
}