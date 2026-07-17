import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  IndianRupee,
  UserRound,
  Search,
  Plus,
} from "lucide-react";

import AppShell from "../components/dashboard/AppShell";
import api from "../api/apiClient";
import { Button } from "../components/ui/Button";
import EmptyState from "../components/dashboard/EmptyState";


function Work() {

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");


  useEffect(() => {

    const fetchWorks = async () => {

      try {

        const res = await api.get("/workposts");

        setWorks(res.data.data || []);

      } catch(err){

        console.error(err);
        setError("Failed to load assignments.");

      } finally {

        setLoading(false);

      }

    };


    fetchWorks();

  }, []);



  const filteredWorks = useMemo(()=>{

    return works.filter((work)=>{

      if(!search.trim()) return true;

      const query = search.toLowerCase();


      return (
        work.title?.toLowerCase().includes(query) ||
        work.description?.toLowerCase().includes(query) ||
        work.subject?.toLowerCase().includes(query)
      );

    });


  },[works,search]);



return (

<AppShell
 search={search}
 setSearch={setSearch}
>


<div
className="
flex
flex-col
gap-6
"
>


{/* HEADER */}

<div
className="
flex
flex-col
gap-4
sm:flex-row
sm:items-end
sm:justify-between
"
>


<div>

<h1
className="
text-3xl
font-bold
tracking-tight
"
>
Assignments & Projects
</h1>


<p
className="
mt-2
text-sm
text-slate-500
"
>
Find students who need assignments or project work completed.
</p>

</div>



<Link to="/create-work">

<Button
className="
h-11
rounded-xl
px-5
shadow-lg
"
>

<Plus
className="
mr-2
h-4
w-4
"
/>

Post Work

</Button>

</Link>


</div>




{/* SEARCH */}

<div
className="
relative
"
>

<Search
className="
absolute
left-4
top-1/2
h-5
w-5
-translate-y-1/2
text-slate-400
"
/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="
Search assignments, subjects...
"

className="
w-full
rounded-2xl
border
bg-white
py-3
pl-12
pr-4
text-sm
outline-none
shadow-sm
focus:ring-2
focus:ring-blue-200
"

/>

</div>





{/* CONTENT */}


{
loading ? (

<div
className="
py-20
text-center
text-slate-500
"
>
Loading assignments...
</div>


) : error ? (

<EmptyState
title="Something went wrong"
description={error}
/>


) : filteredWorks.length===0 ? (

<EmptyState

title="No assignments available"

description="
No one has posted assignment work yet.
"

/>

) : (



<div
className="
grid
gap-5
sm:grid-cols-2
"
>


{
filteredWorks.map((work)=>(


<div

key={work.id}

className="
group
rounded-3xl
bg-white
p-5
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:shadow-xl
"

>


{/* SUBJECT */}

<p
className="
text-xs
font-semibold
uppercase
tracking-[0.18em]
text-blue-600
"
>
{work.subject}
</p>




<h2
className="
mt-2
line-clamp-2
text-xl
font-bold
text-slate-900
"
>

{work.title}

</h2>




<p
className="
mt-3
line-clamp-3
text-sm
leading-6
text-slate-500
"
>

{work.description}

</p>




{/* DETAILS */}

<div
className="
mt-5
grid
grid-cols-2
gap-3
"
>


<div
className="
rounded-xl
bg-slate-50
p-3
"
>

<div
className="
flex
items-center
gap-2
text-xs
text-slate-500
"
>

<IndianRupee size={14}/>

Budget

</div>


<p
className="
mt-1
font-bold
text-slate-900
"
>

₹{work.budget}

</p>


</div>





<div
className="
rounded-xl
bg-slate-50
p-3
"
>

<div
className="
flex
items-center
gap-2
text-xs
text-slate-500
"
>

<CalendarDays size={14}/>

Deadline

</div>


<p
className="
mt-1
text-sm
font-bold
text-slate-900
"
>

{
work.deadline
?
new Date(work.deadline)
.toLocaleDateString()
:
"Flexible"
}


</p>


</div>


</div>






{/* USER */}

<div
className="
mt-5
flex
items-center
gap-3
border-t
pt-4
"
>


<img

src={
work.seller?.avatarUrl ||
"https://ui-avatars.com/api/?name=User"
}

className="
h-10
w-10
rounded-full
object-cover
"

 />


<div>

<p
className="
text-sm
font-semibold
text-slate-900
"
>

{work.seller?.name}

</p>


<p
className="
text-xs
text-slate-500
">
{work.seller?.collegeName || "CollegeSquare User"}
</p>
</div>
</div>
<Button
className="
mt-5
w-full
rounded-xl
">
Contact Student
</Button>
</div>
))}
</div>
)}
</div>
</AppShell>
);}
export default Work;