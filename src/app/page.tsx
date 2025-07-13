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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center px-4">
  <div className="bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full text-center">
    <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
      Welcome to the Pharmaceutical Data Management App
    </h1>
    <p className="text-lg text-gray-600">
      Navigate to the staging area to manage your records.
    </p>

    <div className="bg-blue-100 text-blue-800 mt-6 rounded-xl py-3 px-5 text-sm font-medium">
      Please sign in to access your dashboard
    </div>
  </div>
</div>

  );
}
