import { motion } from "framer-motion";
import {
  ShoppingCart,
  BookOpen,
  Laptop,
  Headphones,
  Package,
} from "lucide-react";

const items = [
  {
    Icon: BookOpen,
    start: { x: -120, y: 70 },
    delay: 0,
  },
  {
    Icon: Laptop,
    start: { x: -40, y: 90 },
    delay: 0.5,
  },
  {
    Icon: Headphones,
    start: { x: 40, y: 90 },
    delay: 1,
  },
  {
    Icon: Package,
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
          className="absolute left-1/2 top-4 -translate-x-1/2 text-primary"
          animate={{
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 0.35,
            repeat: Infinity,
            repeatDelay: 1.65,
          }}
        >
          <ShoppingCart className="w-16 h-16 md:w-20 md:h-20" />
        </motion.div>

        {/* Flying Items */}
        {items.map(({ Icon, start, delay }, index) => (
          <motion.div
            key={index}
            className="absolute left-1/2 top-4 text-muted-foreground"
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
              scale: [0.8, 1, 0.3],
            }}
            transition={{
              duration: 0.8,
              delay,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          >
            <Icon className="w-8 h-8 md:w-10 md:h-10" />
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