import { SlidersHorizontal } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";


const categories = [
  "All",
  "BOOKS",
  "NOTES",
  "SUPPLIES",
  "ELECTRONICS",
  "ESSENTIALS",
  "OTHERS",
];


const conditions = [
  "All",
  "NEW",
  "LIKE_NEW",
  "GOOD",
  "FAIR",
];


function FilterPanel({
  filters,
  setFilters,
}) {


  const update = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };


  return (

    <div
      className="
      rounded-3xl
      bg-white/80
      p-6
      shadow-xl
      shadow-blue-100/40
      backdrop-blur-xl
      "
    >


      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div
          className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-2xl
          bg-blue-600
          text-white
          shadow-lg
          "
        >

          <SlidersHorizontal size={18}/>

        </div>


        <div>

          <h2 className="font-semibold text-slate-900">
            Filters
          </h2>

          <p className="text-xs text-slate-500">
            Find what you need
          </p>

        </div>

      </div>





      {/* TYPE */}


      <FilterSection title="Listing Type">


        <div className="grid grid-cols-3 gap-2">


          {
            ["All","SELL","RENT"].map((item)=>(


              <button

                key={item}

                onClick={()=>
                  update("type",item)
                }


                className={cn(

                  "rounded-2xl px-3 py-2 text-sm font-medium transition-all",

                  filters.type===item

                  ?

                  "bg-blue-600 text-white shadow-lg shadow-blue-200"

                  :

                  "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"

                )}

              >

                {item}

              </button>


            ))
          }


        </div>


      </FilterSection>








      {/* CATEGORY */}



      <FilterSection title="Category">

<div className="relative">

<select
value={filters.category}
onChange={(e)=>
 update("category", e.target.value)
}
className="
w-full
appearance-none
rounded-2xl
bg-slate-100
px-4
py-3
text-sm
font-medium
text-slate-700
outline-none
transition
hover:bg-blue-50
focus:ring-2
focus:ring-blue-500
"
>

<option value="All">
All Categories
</option>

<option value="BOOKS">
Books
</option>

<option value="NOTES">
Notes
</option>

<option value="SUPPLIES">
Supplies
</option>

<option value="ELECTRONICS">
Electronics
</option>

<option value="ESSENTIALS">
Essentials
</option>

<option value="OTHERS">
Others
</option>

</select>


<ChevronDown
className="
absolute
right-4
top-1/2
-translate-y-1/2
text-slate-400
pointer-events-none
"
/>

</div>



      </FilterSection>









      {/* PRICE */}



      <FilterSection title="Maximum Price">


        <div className="flex justify-between text-sm mb-3">

          <span className="text-slate-500">
            Up to
          </span>


          <span className="font-semibold text-blue-600">

            ₹{filters.price.toLocaleString()}

          </span>


        </div>


        <input

          type="range"

          min="0"

          max="50000"

          step="500"

          value={filters.price}

          onChange={(e)=>
            update(
              "price",
              Number(e.target.value)
            )
          }


          className="
          w-full
          accent-blue-600
          cursor-pointer
          "

        />


      </FilterSection>









      {/* CONDITION */}



      <FilterSection title="Condition">


        <div className="flex flex-wrap gap-2">


        {
          conditions.map((item)=>(


            <button

              key={item}

              onClick={()=>
                update("condition",item)
              }


              className={cn(

                "rounded-full px-4 py-2 text-xs font-medium transition-all",

                filters.condition===item

                ?

                "bg-blue-600 text-white shadow-md"

                :

                "bg-slate-100 text-slate-600 hover:bg-blue-50"

              )}

            >

              {item.replace("_"," ")}

            </button>


          ))
        }


        </div>


      </FilterSection>



    </div>


  );
}





function FilterSection({
  title,
  children
}){


return (

<div className="mb-7">


<h3 className="mb-3 text-sm font-semibold text-slate-800">

{title}

</h3>


{children}


</div>

);


}



export default FilterPanel;