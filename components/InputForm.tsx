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

  function extractAppIdFromUrl(url: string) {
    const match = url.match(/\/store\/apps\/details\?id=([^&]+)/);
    return match ? match[1] : null;
  }

  const handleAnalyze = async () => {
    if (!inputUrl) {
      toast.error("Enter a URL to analyze first.");
      return;
    }
    setIsLoading(true);
    let analysisRecord;
    if (isWebsite) {
      if (!inputUrl.match(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}.*$/)) {
        toast.error("Invalid website URL.");
        setIsLoading(false);
        return;
    }
    const formattedUrl = inputUrl.match(/^https?:\/\//) ? inputUrl : `https://${inputUrl}`;
    analysisRecord = await analyzeUrl(formattedUrl, "website");
    
    } else {
      const appId = inputUrl.match(/^[a-zA-Z][a-zA-Z0-9._-]{0,255}$/) ? inputUrl : extractAppIdFromUrl(inputUrl);
      if (!appId) {
        toast.error("Invalid Play Store URL or App ID.");
        setIsLoading(false);
        return;
      }
      analysisRecord = await analyzeUrl(appId, "app");
    }
    setIsLoading(false);
    console.log(analysisRecord);
    if (analysisRecord) {
      router.push(`/analysis/${analysisRecord.analysisId}`);
    }
    if (analysisRecord === null) {
      toast.error("Failed to fetch app data. Check if App ID provided is correct.");
    }
  };
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
          Enter {isWebsite ? "Website URL" : "Play Store URL or ID"}
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
                : "https://play.google.com/store/apps/details?id=com.example.app"
            }
            className="placeholder:text-gray-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAnalyze();
              }
            }}
          />
          <Button
            onClick={handleAnalyze}
            className="flex gap-2 items-center"
            disabled={isLoading}
          >
            {isLoading && <Loader2Icon size={14} className="animate-spin" />}
            {isLoading ? "Analyzing..." : "Analyze"}
          </Button>
        </div>
      </div>
    </div>
  );
}
