import Navbar from "./Navbar";


function AppShell({ children }) {


  return (

    <div className="
min-h-screen
bg-gradient-to-br
from-primary/5
via-background
to-accent
">


      <Navbar />


      <main className="mx-auto w-full max-w-screen-2xl px-8 xl:px-12 py-8">

        {children}

      </main>


    </div>

  );

}


export default AppShell;