import { motion } from "framer-motion";

const items = [
  {
    emoji: "📚",
    start: { x: -120, y: 70 },
    delay: 0,
  },
  {
    emoji: "💻",
    start: { x: -40, y: 90 },
    delay: 0.5,
  },
  {
    emoji: "🎧",
    start: { x: 40, y: 90 },
    delay: 1,
  },
  {
    emoji: "📦",
    start: { x: 120, y: 70 },
    delay: 1.5,
  },
];

export default function ShoppingCartLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden">

      {/* Animation Area */}
      <div className="relative w-[300px] h-[220px]">

        {/* Cart */}
        <motion.div
          className="absolute left-1/2 top-4 -translate-x-1/2 text-5xl md:text-6xl"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        >
          🛒
        </motion.div>


        {/* Flying Items */}
        {items.map(({ emoji, start, delay }, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-4 text-3xl md:text-4xl"
            initial={{
              opacity: 0,
              x: start.x,
              y: start.y,
              scale: 0.8,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [start.x, 0],
              y: [start.y, 0],
              scale: [0.8, 1.1, 0.3],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 0.9,
              delay,
              repeat: Infinity,
              repeatDelay: 1.1,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}

      </div>


      {/* Text */}
      <motion.p
        className="mt-6 text-sm md:text-base text-muted-foreground font-medium"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Finding the best campus deals...
      </motion.p>

    </div>
  );
}