import { cn } from "../../lib/utils";


function CategoryChip({
  label,
  active,
  onClick,
}) {


  return (

    <button

      onClick={onClick}

      className={cn(

        `
        shrink-0
        rounded-full
        px-5
        py-2.5
        text-sm
        font-medium
        transition-all
        duration-300
        `,


        active

        ?

        `
        bg-blue-600
        text-white
        shadow-lg
        shadow-blue-200
        scale-105
        `

        :

        `
        bg-white/80
        text-slate-600
        shadow-sm
        hover:bg-blue-50
        hover:text-blue-600
        hover:-translate-y-0.5
        `

      )}

    >

      {label}

    </button>

  );

}


export default CategoryChip;