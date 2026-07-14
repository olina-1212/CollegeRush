import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import AppShell from "../components/dashboard/AppShell";
import CategoryChip from "../components/dashboard/CategoryChip";
import ProductCard from "../components/dashboard/ProductCard";
import FilterPanel from "../components/dashboard/FilterPanel";
import EmptyState from "../components/dashboard/EmptyState";


const CATEGORIES = [
  "ALL",
  "BOOKS",
  "NOTES",
  "ELECTRONICS",
  "SUPPLIES",
  "ESSENTIALS",
  "LAB_EQUIPMENT",
  "OTHERS"
];
function Dashboard() {
  const [listings,setListings] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [activeCategory,setActiveCategory] = useState("ALL");
  const [search, setSearch] = useState("");
  const [filters,setFilters] = useState({
    type:"ALL",
    category:"ALL",
    price:100000,
    condition:"ALL",
  });
  // FETCH LISTINGS
  useEffect(()=>{
    const fetchListings = async()=>{
      try{
        const res = await axios.get(
          "http://localhost:5000/api/listings"
        );
        setListings(
          res.data.data || []
        );
      }
      catch(err){
        console.error(err);
        setError(
          "Failed to load listings"
        );


      }

      finally{

        setLoading(false);

      }
    };
    fetchListings();
  },[]);
 // FILTER LOGIC
  const filteredListings = useMemo(()=>{


    return listings.filter((item)=>{



      if(
        activeCategory !== "ALL" &&
        item.category !== activeCategory
      ){

        return false;

      }

      if(
        filters.type !== "ALL" &&
        item.type !== filters.type
      ){

        return false;
      }
      if(
        filters.category !== "ALL" &&
        item.category !== filters.category
      ){

        return false;

      }

      if(
        filters.condition !== "ALL" &&
        item.condition !== filters.condition
      ){

        return false;

      }
      if(
        Number(item.price) >
        filters.price
      ){
        return false;
      }
      return true;
    });

  },[
    listings,
    filters,
    activeCategory
  ]);
  return (

    <AppShell
  search={search}
  setSearch={setSearch}
>

      <div className="
        flex
        flex-col
        gap-6
      ">
        {/* HEADER */}
        <div>
          <h1 className="
            text-2xl
            font-semibold
            tracking-tight
          ">
            Browse listings
          </h1>
          <p className="
            mt-1
            text-sm
            text-muted-foreground
          ">
            Fresh finds from students across campus.
          </p>
        </div>
        {/* CATEGORY CHIPS */}
        <div className="
          -mx-4
          flex
          gap-2
          overflow-x-auto
          px-4
          pb-2
          sm:mx-0
          sm:px-0
        ">
          {
            CATEGORIES.map((category)=>(
              <CategoryChip

                key={category}

                label={
                  category === "ALL"
                  ?
                  "All"
                  :
                  category.replaceAll("_", " ")
                }
                active={
                  activeCategory === category
                }
                onClick={()=>
                  setActiveCategory(category)
                }
              />
            ))
          }
        </div>
        <div className="
          flex
          gap-8
        ">
          {/* FILTERS */}
          <div className="hidden w-80 shrink-0 lg:block">
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          {/* PRODUCTS */}
          <div className="
            min-w-0
            flex-1
          ">
            <div className="
              mb-4
              flex
              justify-between
              items-center
            ">
              <p className="
                text-sm
                text-muted-foreground
              ">
                {filteredListings.length} results
              </p>
            </div>
            {
              loading ?
              (
                <div className="
                  flex
                  justify-center
                  py-20
                  text-muted-foreground
                ">
                  Loading listings...
                </div>
              )
              :
              error ?
              (
                <EmptyState
                  title="Something went wrong"
                  description={error}
                />
              )
              :
              filteredListings.length===0 ?
              (
                <EmptyState
                  title="No listings found"
                  description="
                    Try changing filters or add a new listing.
                  "
                />
              )
              :
              (
                <div className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  xl:grid-cols-3
                ">
                  {
                    filteredListings.map((item)=>(
                      <ProductCard
                        key={item.id}
                        listing={item}
                      />
                    ))
                  }
                </div>
              )
            }

          </div>

        </div>
      </div>
    </AppShell>
  );
}
export default Dashboard;