import { motion } from "framer-motion";
import owl from "../../assets/owl.svg";

function OwlTransition({ show }) {

  if (!show) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        pointer-events-none
        flex
        items-start
        justify-end
        overflow-hidden
      "
    >

      <motion.div

        initial={{
          x:120,
          y:-50,
          opacity:0,
          rotate:20,
        }}

        animate={{
          x:0,
          y:60,
          opacity:1,
          rotate:0,
        }}

        transition={{
          duration:0.6,
          ease:"easeOut"
        }}

        className="
          mr-8
          mt-20
        "
      >

        <motion.img
          src={owl}
          className="
            h-20
            w-20
          "

          animate={{
            y:[0,-8,0],
          }}

          transition={{
            duration:1,
            repeat:Infinity,
          }}
        />

      </motion.div>


      {/* Looking effect */}

      <motion.div
        initial={{
          opacity:0,
          scale:0,
        }}

        animate={{
          opacity:[0,1,0],
          scale:[0.5,1.2,0.5],
        }}

        transition={{
          duration:1.2,
          delay:0.5,
        }}

        className="
          absolute
          right-20
          top-28
          text-3xl
        "
      >
        👀
      </motion.div>


    </div>
  );
}

export default OwlTransition;