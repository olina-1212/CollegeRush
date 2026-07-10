import {
  ShoppingBag,
  Tag,
  Repeat,
  BookOpen,
  Bike,
  ShieldCheck,
  Laptop,
  Calculator,
  GraduationCap,
} from "lucide-react";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";


function Login() {


  const handleGoogleSuccess = async (response) => {

    console.log(response);

    // Later backend connection:
  
    const res = await axios.post(
      "http://localhost:5000/api/auth/google",
      {
        token: response.credential
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );
    

  };



  return (

    <div className="min-h-screen bg-slate-50">


      <div className="grid min-h-screen lg:grid-cols-2">



        {/* LEFT SECTION */}

        <div className="
          relative hidden overflow-hidden 
          bg-gradient-to-br 
          from-blue-50 via-white to-indigo-100
          lg:flex lg:flex-col 
          lg:justify-between 
          lg:p-12
        ">


          <div className="text-3xl font-bold text-blue-600">
            CollegeSquare
          </div>



          <div className="max-w-lg">


            <h1 className="
              text-5xl 
              font-bold 
              tracking-tight 
              text-slate-900
            ">
              Your campus marketplace, simplified.
            </h1>



            <p className="
              mt-5 
              text-lg 
              leading-relaxed 
              text-slate-600
            ">
              Buy, sell, rent and exchange everything you need for college life.
              Connect with students from your campus community.
            </p>


          </div>



          <CampusIllustration />



          {/* background decoration */}

          <div className="
            absolute 
            -right-20 
            -top-20 
            h-72 
            w-72 
            rounded-full 
            bg-blue-300/30 
            blur-3xl
          "/>


          <div className="
            absolute 
            -bottom-20 
            -left-20 
            h-80 
            w-80 
            rounded-full 
            bg-indigo-300/30 
            blur-3xl
          "/>



        </div>







        {/* RIGHT SECTION */}


        <div className="
          flex 
          items-center 
          justify-center 
          px-6 
          py-12
        ">



          <div className="w-full max-w-md">


            {/* mobile logo */}

            <div className="
              mb-8 
              text-center 
              text-3xl 
              font-bold 
              text-blue-600 
              lg:hidden
            ">
              CollegeSquare
            </div>





            <div className="
              rounded-3xl 
              border 
              border-slate-200 
              bg-white 
              p-10 
              shadow-xl
            ">



              <div className="text-center">


                <h2 className="
                  text-3xl 
                  font-bold 
                  text-slate-900
                ">
                  Welcome to CollegeSquare
                </h2>



                <p className="
                  mt-3 
                  text-sm 
                  text-slate-500
                ">
                  Sign in to continue to your campus marketplace
                </p>



              </div>





              <div className="mt-8 flex justify-center">


                <GoogleLogin

                  onSuccess={handleGoogleSuccess}

                  onError={()=>{
                    console.log(
                      "Google Login Failed"
                    );
                  }}

                />


              </div>





              <div className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-slate-500
              ">


                <ShieldCheck size={15}/>

                Secure login powered by Google


              </div>





              <div className="
                my-8 
                h-px 
                bg-slate-200
              "/>






              <div className="space-y-4">


                <FeatureItem>
                  Verified student community
                </FeatureItem>


                <FeatureItem>
                  Buy, sell and rent easily
                </FeatureItem>


                <FeatureItem>
                  Safe campus transactions
                </FeatureItem>



              </div>




            </div>





            <p className="
              mt-6
              text-center
              text-xs
              text-slate-500
            ">

              By continuing you agree to our Terms of Service and Privacy Policy.

            </p>



          </div>



        </div>


      </div>


    </div>

  );

}









function FeatureItem({children}){


return (

<div className="
  flex 
  items-center 
  gap-3
">


<div className="
  flex
  h-6
  w-6
  items-center
  justify-center
  rounded-full
  bg-blue-100
  text-blue-600
  text-sm
">

✓

</div>


<span className="text-sm text-slate-700">

{children}

</span>


</div>


);


}









function CampusIllustration(){


const tiles=[

{
icon:BookOpen,
label:"Books"
},

{
icon:Laptop,
label:"Electronics"
},

{
icon:Bike,
label:"Rentals"
},

{
icon:Calculator,
label:"Study Tools"
},

{
icon:ShoppingBag,
label:"Essentials"
},

{
icon:Tag,
label:"Deals"
},

{
icon:Repeat,
label:"Exchange"
},

{
icon:GraduationCap,
label:"Campus"
}

];



return (

<div className="
  grid
  max-w-md
  grid-cols-4
  gap-4
">


{

tiles.map(({icon:Icon,label},i)=>(


<div

key={label}

className="
flex
aspect-square
flex-col
items-center
justify-center
rounded-2xl
border
border-slate-200
bg-white/80
shadow-sm
backdrop-blur
transition
hover:-translate-y-1
"

style={{
transform:`translateY(${(i%2)*8}px)`
}}

>


<Icon 
className="h-6 w-6 text-blue-600"
/>


<span className="
mt-2
text-xs
font-medium
text-slate-600
">

{label}

</span>


</div>


))


}



</div>


);


}





export default Login;