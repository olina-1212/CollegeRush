import { Inbox } from "lucide-react";


function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
}) {


  return (

    <div className="
      flex
      flex-col
      items-center
      justify-center
      rounded-xl
      border
      border-dashed
      border-border
      bg-card
      px-6
      py-16
      text-center
    ">


      <div className="
        grid
        h-12
        w-12
        place-items-center
        rounded-full
        bg-muted
        text-muted-foreground
      ">

        <Icon className="h-6 w-6"/>

      </div>



      <h3 className="
        mt-4
        text-base
        font-semibold
        text-foreground
      ">

        {title}

      </h3>




      {
        description && (

          <p className="
            mt-1
            max-w-sm
            text-sm
            text-muted-foreground
          ">

            {description}

          </p>

        )
      }





      {
        action && (

          <div className="mt-5">

            {action}

          </div>

        )
      }



    </div>

  );

}


export default EmptyState;