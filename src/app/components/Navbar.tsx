import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="w-full  ">
      <div className="w-full h-[100px] p-[24px] flex flex-row justify-between items-center text-violet-600 space-x-4 md:space-x-0">
        
          <div className="">
            <Image src="/images/Group 252.svg" width={146} height={32} alt="logo" />
          </div>

          <div className="flex md:gap-8 gap-4">
       <Link href="/dashboard/">     <button className="md:bg-gray-300  flex gap-[8px] items-center md:px-4 md:py-2 border rounded-lg">
              <Image src="/images/ph_link-bold.png" width={21} height={20} alt="link logo" />
              <span className="text-[16px] md:block hidden">Links</span>
            </button>
          </Link>  

          
        <Link href="/dashboard/profile">   <button className="md:bg-gray-300  flex gap-[8px] items-center md:px-4 md:py-2 border rounded-lg">
              <Image src="/images/ph_user-circle-bold.png" width={21} height={20} alt="profile logo" />
              <span className="text-[16px] md:block hidden">Profile Details</span>
            </button>
            </Link> 
          </div>

          <Link href="/showcase">
            <button className="bg-gray-300 px-4 py-2 border rounded-lg">
              <span className="text-[16px] ">Preview</span>
            </button>
          </Link>
        </div>
      </div>
  
  );
}
