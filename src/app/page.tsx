// // Basic entry point for the application

// export default function HomePage() {
//     return (
//         <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//             <h1 className="text-3xl font-bold">Welcome to the Pharmaceutical Data Management App</h1>
//             <p className="text-lg mt-4">Navigate to the staging area to manage your records.</p>
//         </div>
//     );
// }

'use client';

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import getUserRole from "../getUserRole"; 


export default function HomePage() {
  const router = useRouter();
  const { user, isSignedIn, isLoaded } = useUser();
  let path = "";

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const userEmail = user?.emailAddresses?.[0]?.emailAddress;
     
    path = getUserRole(userEmail || "");
      console.log("Redirecting to path: ", path);
      router.push(path);
    }

  }, [isLoaded, isSignedIn, user, router]);

  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className=" bg-gray-100 flex-col items-center justify-center">
             <h1 className="flex-col text-3xl font-bold items-center justify-center">Welcome to the Pharmaceutical Data Management App</h1>
             <p className="flex text-lg mt-4 items-center justify-center">Navigate to the staging area to manage your records.</p>
        </div>
      <div className=" flex items-center-safe text-center bg-gray-400 rounded-3xl py-2 px-3 mt-4">
        Please sign in to access your dashboard
      </div>
    </div>
  );
}
