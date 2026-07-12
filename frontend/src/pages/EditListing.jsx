import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createListing } from "../api/listingApi";

import AppShell from "../components/dashboard/AppShell";
import api from "../api/apiClient";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";

import {
  ImagePlus,
  MapPin,
  Tag,
  FileText,
  IndianRupee,
  Sparkles
} from "lucide-react";


function CreateListing() {


const navigate = useNavigate();
const { id } = useParams();

const [form,setForm] = useState({

title:"",
description:"",
price:"",
type:"SELL",
category:"BOOKS",
condition:"LIKE_NEW",
location:""

});
useEffect(() => {
  const fetchListing = async () => {
    try {
      const res = await api.get(`/listings/${id}`);

      const listing = res.data.data;

      setForm({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        type: listing.type,
        category: listing.category,
        condition: listing.condition,
        location: listing.location || "",
      });

    } catch (err) {
      console.error(err);
      alert("Couldn't load listing");
    }
  };

  fetchListing();
}, [id]);


const [images,setImages] = useState([]);
useEffect(() => {
  const fetchListing = async () => {
    try {
      const res = await api.get(`/listings/${id}`);

      const listing = res.data.data;

      setForm({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        type: listing.type,
        category: listing.category,
        condition: listing.condition,
        location: listing.location || "",
      });

    } catch (err) {
      console.error(err);
      alert("Couldn't load listing");
    }
  };

  fetchListing();
}, [id]);


const [loading,setLoading] = useState(false);
useEffect(() => {
  const fetchListing = async () => {
    try {
      const res = await api.get(`/listings/${id}`);

      const listing = res.data.data;

      setForm({
        title: listing.title,
        description: listing.description,
        price: listing.price,
        type: listing.type,
        category: listing.category,
        condition: listing.condition,
        location: listing.location || "",
      });

    } catch (err) {
      console.error(err);
      alert("Couldn't load listing");
    }
  };

  fetchListing();
}, [id]);



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
const data = new FormData();
Object.keys(form).forEach(key=>{
data.append(
key,
form[key]
);
});
images.forEach(img=>{
data.append(
"images",
img
);
});
await api.put(
`/listings/${id}`,
data,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);
navigate("/my-listings");
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


{/* background glow */}

<div className="
absolute
-top-40
right-20
h-72
w-72
rounded-full
bg-blue-200/40
blur-3xl
"/>



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


<div className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-blue-600
text-white
shadow-lg
">

<Sparkles size={22}/>

</div>


<div>

<h1 className="
text-4xl
font-bold
tracking-tight
">

Edit Listing

</h1>


<p className="
mt-1
text-slate-500
">

Update your listing details.

</p>


</div>


</div>

</div>






<div className="
grid
lg:grid-cols-[1fr_380px]
gap-10
">



{/* LEFT FORM */}


<form
onSubmit={handleSubmit}
className="
space-y-8
"
>




{/* DETAILS */}

<section className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
">


<div className="
flex
items-center
gap-3
mb-6
">


<FileText
className="text-blue-600"
/>

<h2 className="
font-semibold
text-lg
">

Basic Details

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

placeholder="Example: Engineering Mathematics Book"

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

placeholder="Describe condition and details"

/>
</div>
</div>
</section>
{/* CATEGORY */}

<section className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
">
<div className="
flex
items-center
gap-3
mb-6
">

<Tag className="text-blue-600"/>

<h2 className="
font-semibold
text-lg
">

Category

</h2>

</div>



<div className="
grid
md:grid-cols-3
gap-4
">


<select
name="type"
value={form.type}
onChange={handleChange}
className="
rounded-xl
bg-slate-50
px-4
py-3
outline-none
"
>

<option value="SELL">
Sell
</option>

<option value="RENT">
Rent
</option>


</select>




<select
name="category"
value={form.category}
onChange={handleChange}
className="
rounded-xl
bg-slate-50
px-4
py-3
outline-none
"
>


<option>
BOOKS
</option>

<option>
NOTES
</option>

<option>
ELECTRONICS
</option>

<option>
OTHERS
</option>

</select>
<select
name="condition"

value={form.condition}

onChange={handleChange}

className="
rounded-xl
bg-slate-50
px-4
py-3
outline-none
"

>


<option>
NEW
</option>

<option>
LIKE_NEW
</option>

<option>
GOOD
</option>

<option>
FAIR
</option>
</select>
</div>
</section>
{/* PRICE */}

<section className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
">
<div className="
flex
items-center
gap-3
mb-5
">

<IndianRupee className="text-blue-600"/>

<h2 className="font-semibold text-lg">
Pricing
</h2>
</div>
<Input
type="number"

name="price"

value={form.price}

onChange={handleChange}

placeholder="Enter price"

/>

</section>
{/* IMAGE */}
<section className="
rounded-3xl
bg-white
p-7
shadow-xl
shadow-blue-100/40
">


<h2 className="
font-semibold
text-lg
mb-5
">

Images

</h2>



<label className="
flex
h-40
cursor-pointer
flex-col
items-center
justify-center
rounded-3xl
bg-blue-50
text-blue-600
hover:bg-blue-100
transition
">


<ImagePlus size={32}/>


<p className="
mt-2
text-sm
font-medium
">

Upload Photos

</p>



<input

type="file"

multiple

hidden

onChange={(e)=>
setImages([...e.target.files])
}

/>
</label>
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
  {loading ? "Saving..." : "Save Changes"}
</Button>
</form>
{/* PREVIEW */}
<aside className="
sticky
top-24
h-fit
">
<p className="
mb-4
font-semibold
text-slate-500
">
Live Preview
</p>
<div className="
overflow-hidden
rounded-3xl
bg-white
shadow-2xl
shadow-blue-100
">
<div className="
aspect-[4/3]
bg-slate-100
">
{ images.length ?
<img
src={URL.createObjectURL(images[0])}
className="
h-full
w-full
object-cover
"
/>
:
<div className="
h-full
flex
items-center
justify-center
text-slate-400
">
No Image
</div>
}
<Badge className="
absolute
">
{form.type}
</Badge>
</div>
<div className="
p-6
">
<p className="
text-xs
text-slate-400
uppercase
">
{form.category}
</p>
<h2 className="
mt-2
text-xl
font-bold
">
{
form.title ||
"Your listing title"
}
</h2>
<p className=" mt-3 text-2xl font-bold text-blue-600 ">
₹{form.price || "0"}
</p>
<p className=" mt-3 text-sm text-slate-500 ">
{
form.description ||
"Your description"
}
</p>
<div className="mt-4">
<Badge variant="secondary">
{form.condition}
</Badge>
</div>
</div>
</div>
</aside>
</div>
</div>
</div>
</AppShell>
);
}
export default CreateListing;