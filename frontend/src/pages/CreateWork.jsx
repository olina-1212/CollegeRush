import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppShell from "../components/dashboard/AppShell";
import api from "../api/apiClient";

import {
  FileText,
  BookOpen,
  IndianRupee,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/Badge";


function CreateWork() {

const navigate = useNavigate();

const [form,setForm] = useState({
  title:"",
  description:"",
  subject:"",
  budget:"",
  deadline:"",
});


const [loading,setLoading] = useState(false);



const handleChange=(e)=>{

setForm({
 ...form,
 [e.target.name]:e.target.value
});

};



const handleSubmit=async(e)=>{

e.preventDefault();

try{

setLoading(true);


await api.post(
"/workposts",
form
);


navigate("/work");


}

catch(err){

console.error(err);

alert(
err.response?.data?.message ||
"Something went wrong"
);

}

finally{

setLoading(false);

}

};



return (

<AppShell>


<div className="relative">


<div
className="
absolute
-top-40
right-20
h-72
w-72
rounded-full
bg-blue-200/40
blur-3xl
"
/>


<div className="
relative
max-w-7xl
mx-auto
">


{/* HEADER */}

<div className="
mb-10
">

<div className="
flex
items-center
gap-3
">


<div
className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-blue-600
text-white
shadow-lg
"
>

<Sparkles size={22}/>

</div>


<div>

<h1 className="
text-4xl
font-bold
tracking-tight
">

Post Assignment Request

</h1>


<p className="
mt-1
text-slate-500
">

Find students willing to complete assignments and projects.

</p>


</div>


</div>


</div>




<div className="
grid
lg:grid-cols-[1fr_380px]
gap-10
">


<form
onSubmit={handleSubmit}
className="
space-y-8
"
>


{/* BASIC DETAILS */}

<section
className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
"
>


<div className="
flex
items-center
gap-3
mb-6
">

<FileText className="text-blue-600"/>

<h2 className="
font-semibold
text-lg
">

Work Details

</h2>

</div>



<div className="
space-y-5
">


<div>

<Label>
Title
</Label>


<Input

name="title"

value={form.title}

onChange={handleChange}

placeholder="Example: Need DBMS Assignment"

/>


</div>



<div>

<Label>
Description
</Label>


<Textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Explain what needs to be done..."

rows={5}

/>


</div>


</div>


</section>





{/* SUBJECT */}

<section
className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
"
>


<div className="
flex
items-center
gap-3
mb-5
">

<BookOpen className="text-blue-600"/>


<h2 className="
font-semibold
text-lg
">

Subject

</h2>


</div>



<Input

name="subject"

value={form.subject}

onChange={handleChange}

placeholder="Example: Database Management System"

/>


</section>





{/* BUDGET */}

<section
className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
"
>


<div className="
flex
items-center
gap-3
mb-5
">

<IndianRupee className="text-blue-600"/>


<h2 className="
font-semibold
text-lg
">

Budget

</h2>


</div>



<Input

type="number"

name="budget"

value={form.budget}

onChange={handleChange}

placeholder="Enter amount you are willing to pay"

/>


</section>





{/* DEADLINE */}

<section
className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
"
>


<div className="
flex
items-center
gap-3
mb-5
">

<CalendarDays className="text-blue-600"/>


<h2 className="
font-semibold
text-lg
">

Deadline

</h2>


</div>



<Input

type="date"

name="deadline"

value={form.deadline}

onChange={handleChange}

/>



</section>






<Button

type="submit"

disabled={loading}

className="
h-14
w-full
rounded-2xl
text-lg
shadow-xl
hover:-translate-y-1
transition
"

>

{
loading
?
"Posting..."
:
"🚀 Post Assignment"
}


</Button>




</form>







{/* PREVIEW */}

<aside
className="
sticky
top-24
h-fit
"
>


<p className="
mb-4
font-semibold
text-slate-500
">

Live Preview

</p>



<div
className="
rounded-3xl
bg-white
p-6
shadow-2xl
shadow-blue-100
"
>


<Badge>

Assignment

</Badge>



<h2 className="
mt-5
text-xl
font-bold
"
>

{
form.title ||
"Your assignment title"
}

</h2>



<p className="
mt-3
text-sm
text-slate-500
"
>

{
form.description ||
"Your description will appear here"
}

</p>



<div className="
mt-6
rounded-2xl
bg-blue-50
p-4
">


<p className="
text-xs
uppercase
text-slate-500
">

Budget

</p>


<p className="
text-3xl
font-bold
text-blue-600
"
>

₹{form.budget || "0"}

</p>


</div>



<div className="
mt-4
flex
justify-between
text-sm
text-slate-500
">


<span>

{form.subject || "Subject"}

</span>


<span>

{form.deadline || "Deadline"}

</span>


</div>



</div>


</aside>




</div>


</div>


</div>


</AppShell>


);

}


export default CreateWork;