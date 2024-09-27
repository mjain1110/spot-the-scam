"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function InputForm() {
  const [isWebsite, setIsWebsite] = useState(true);

  return (
    <div className="w-full flex flex-col items-end justify-center gap-4 max-w-2xl">
      <div className="bg-gray-100 rounded-md p-1 gap-1 self-center mb-6 flex justify-center items-center shadow-sm">
        <div
          className={`rounded-md p-2 cursor-pointer ${
            isWebsite ? "bg-white shadow-sm font-medium text-black" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setIsWebsite(true)}
        >
          Website URL
        </div>
        <div
          className={`rounded-md p-2 cursor-pointer ${
            !isWebsite ? "bg-white shadow-sm font-medium text-black" : "bg-gray-100 text-gray-700"
          }`}
          onClick={() => setIsWebsite(false)}
        >
          App Listing
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="url">Enter {isWebsite ? "Website URL" : "App Listing URL"}</Label>
        <Input
          name="url"
          type="url"
          placeholder={isWebsite ? "https://fakeCart.com/product/iphone-16-pro-free.html" : "https://apps.apple.com/us/app/fake-app/id1234567890"}
          className="placeholder:text-gray-400"
        />
      </div>
      <Button>Analyze</Button>
    </div>
  );
}
