
import Preview from "@/app/components/Preview" 
import Link from "next/link";   


export default function Showcase(){       


return (                      
<div className="w-full h-[357px] bg-violet-500 relative">           
      <div className=" flex flex-col items-center">                
 <div className="p-4 w-[90%] h-[76px] bg-white border rounded-lg flex justify-between items-center mt-4">       
          <Link href="/dashboard/">   <button className="border border-violet-500 rounded-lg text-violet-500 p-2">Back to Editor</button></Link>   
          <Link href="/dashboard/">         <button className="bg-violet-500 text-white border rounded-lg p-2">Share link</button>  </Link>             </div>    
             <div className=" p-6 bg-white border rounded-lg absolute lg:top-[50%]  top-[50%] flex justify-center items-center md:top-[50%]  overflow-hidden shadow-xl">       
              <Preview />                    
 </div>     
        </div>       
      </div>           
  ) }
