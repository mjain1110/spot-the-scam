"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { analyzeUrl } from "@/app/actions/serverActions";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function InputForm() {
  const [isWebsite, setIsWebsite] = useState(true);
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-end justify-center gap-3 max-w-2xl">
      <div className="bg-accent rounded-md p-1 gap-1 self-center flex justify-center items-center shadow-sm">
        <div
          className={`rounded-md py-1.5 px-2 cursor-pointer ${
            isWebsite
              ? "bg-background shadow-sm font-medium text-foreground"
              : "bg-accent text-accent-foreground"
          }`}
          onClick={() => setIsWebsite(true)}
        >
          Website URL
        </div>
        <div
          className={`rounded-md py-1.5 px-2 cursor-pointer ${
            !isWebsite
              ? "bg-background shadow-sm font-medium text-foreground"
              : "bg-accent text-accent-foreground"
          }`}
          onClick={() => setIsWebsite(false)}
        >
          App Listing
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="url">
          Enter {isWebsite ? "Website URL" : "App Listing URL"}
        </Label>
        <div className="flex gap-2 items-center">
          <Input
            name="url"
            type="url"
            value={inputUrl}
            disabled={isLoading}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder={
              isWebsite
                ? "https://fakeCart.com/product/iphone-16-pro-free.html"
                : "https://apps.apple.com/us/app/fake-app/id1234567890"
            }
            className="placeholder:text-gray-400"
          />
          <Button
            onClick={async () => {
              if (!inputUrl) {
                toast.error("Enter a URL to analyze first.");
                return;
              }
              setIsLoading(true);
              const analysisRecord = await analyzeUrl(
                inputUrl,
                isWebsite ? "website" : "app"
              );
              toast.success("Analyzed successfully!");
              setIsLoading(false);
              router.push(`/analysis/${analysisRecord.analysisId}`);
            }}
            className="flex gap-2 items-center"
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon size={14} className="animate-spin" />}
            Analyze
          </Button>
        </div>
      </div>
    </div>
  );
}
