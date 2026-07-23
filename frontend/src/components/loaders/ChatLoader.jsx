import { motion } from "framer-motion";
import Owl from "../../assets/owl.svg";

export default function ChatLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 overflow-hidden">

      {/* Chat Loading Scene */}
      <div className="relative w-[320px] md:w-[500px] h-[250px]">

        {/* Fake chat bubbles background */}
        <motion.div
          className="absolute top-8 left-5 w-32 h-8 rounded-2xl bg-muted animate-pulse opacity-40"
        />

        <motion.div
          className="absolute top-24 right-5 w-40 h-8 rounded-2xl bg-muted animate-pulse opacity-40"
        />

        <motion.div
          className="absolute bottom-10 left-16 w-48 h-8 rounded-2xl bg-muted animate-pulse opacity-40"
        />


        {/* Owl Flying */}
        <motion.div
          className="absolute top-20 left-0 flex items-center"
          animate={{
            x: [0, 230, 0],
            y: [0, -25, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >

          {/* Owl */}
          <motion.img
            src={Owl}
            alt="owl loading"
            className="w-20 h-20 md:w-24 md:h-24"
            animate={{
              rotate: [-5, 5, -5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />


          {/* Message bubble */}
          <motion.div
            className="ml-[-15px] mb-12 bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
            }}
          >
            💬
          </motion.div>

        </motion.div>


      </div>


      {/* Loading Text */}
      <motion.p
        className="mt-4 text-sm md:text-base text-muted-foreground font-medium"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Connecting conversation...
      </motion.p>

    </div>
  );
}