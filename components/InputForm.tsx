"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { analyzeUrl, submitAnalysisToDB } from "@/app/actions/serverActions";
import { Loader2Icon, UploadIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn, parseJsonFromAnalysis } from "@/lib/utils";
import Image from "next/image";
import { AnalysisResult, ApkAnalysisResult } from "@/lib/interfaces";

export default function InputForm() {
  const [inputMethod, setInputMethod] = useState<"website" | "app" | "apk">(
    "website"
  );
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function extractAppIdFromUrl(url: string) {
    const match = url.match(/\/store\/apps\/details\?id=([^&]+)/);
    return match ? match[1] : null;
  }

  const handleAnalyze = async () => {
    if (!inputUrl && !file) {
      toast.error("Enter a URL to analyze first.");
      return;
    }
    setIsLoading(true);
    let analysisRecord;
    if (inputMethod == "website") {
      if (!inputUrl.match(/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}.*$/)) {
        toast.error("Invalid website URL.");
        setIsLoading(false);
        return;
      }
      const formattedUrl = inputUrl.match(/^https?:\/\//)
        ? inputUrl
        : `https://${inputUrl}`;
      analysisRecord = await analyzeUrl(formattedUrl, "website");
    } else if (inputMethod == "app") {
      const appId = inputUrl.match(/^[a-zA-Z][a-zA-Z0-9._-]{0,255}$/)
        ? inputUrl
        : extractAppIdFromUrl(inputUrl);
      if (!appId) {
        toast.error("Invalid Play Store URL or App ID.");
        setIsLoading(false);
        return;
      }
      analysisRecord = await analyzeUrl(appId, "app");
    } else if (inputMethod == "apk") {
      analysisRecord = await analyzeApkFile();
    }
    setIsLoading(false);
    if (analysisRecord) {
      router.push(`/analysis/${analysisRecord.analysisId}`);
    }
    if (analysisRecord === null) {
      toast.error("Failed to fetch data. Check if input is correct.");
    }
  };

  const [fileHover, setFileHover] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type !== "application/vnd.android.package-archive") {
        toast.error("Invalid file type. Please upload an APK file.");
        return;
      }
      setFile(file);
    }
  };

  const analyzeApkFile = async () => {
    const formData = new FormData();
    formData.append("type", "apk");
    if (file) {
      formData.append("file", file);
    }

    const response = await fetch("http://127.0.0.1:5000/analyze", {
      method: "POST",
      body: formData,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      cache: "no-store",
    });
    const result = await response.json();

    console.log(result);

    const oldOutputParameters = parseJsonFromAnalysis(result.analysis);

    console.log(oldOutputParameters);
    const newOutputParameters: ApkAnalysisResult["outputParameters"] = {
      overallScore: {
        score: oldOutputParameters.overall_score.score,
        heading: "Overall Score",
        reason: oldOutputParameters.overall_score.reason,
      },
      appNameScore: {
        score: oldOutputParameters.app_name_score.score,
        heading: "App Name Score",
        reason: oldOutputParameters.app_name_score.reason,
      },
      permissionsScore: {
        score: oldOutputParameters.permissions_score.score,
        heading: "Permissions Score",
        reason: oldOutputParameters.permissions_score.reason,
      },
      certificateScore: {
        score: oldOutputParameters.certificate_score.score,
        heading: "Certificate Score",
        reason: oldOutputParameters.certificate_score.reason,
      },
      versionNameScore: {
        score: oldOutputParameters.version_name_score.score,
        heading: "Version Name Score",
        reason: oldOutputParameters.version_name_score.reason,
      },
      minSdkVersionScore: {
        score: oldOutputParameters.min_sdk_version_score.score,
        heading: "Min SDK Version Score",
        reason: oldOutputParameters.min_sdk_version_score.reason,
      },
      targetSdkVersionScore: {
        score: oldOutputParameters.target_sdk_version_score.score,
        heading: "Target SDK Version Score",
        reason: oldOutputParameters.target_sdk_version_score.reason,
      },
    };

    const formattedResult: AnalysisResult = {
      analysisId: result.analysisId,
      type: "apk",
      inputParameters: {},
      outputParameters: newOutputParameters,
      url: "",
      lastAnalyzedAt: new Date(),
      feedbackGiven: false,
    };

    const newAnalysis = await submitAnalysisToDB(formattedResult);
    return newAnalysis;
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-6 max-w-2xl">
      <div className="bg-accent rounded-md p-1 gap-1 self-center flex justify-center items-center shadow-sm">
        <div
          className={`rounded-md py-1.5 px-2 cursor-pointer ${
            inputMethod == "website"
              ? "bg-background shadow-sm font-medium text-foreground"
              : "bg-accent text-accent-foreground"
          }`}
          onClick={() => setInputMethod("website")}
        >
          Website URL
        </div>
        <div
          className={`rounded-md py-1.5 px-2 cursor-pointer ${
            inputMethod == "app"
              ? "bg-background shadow-sm font-medium text-foreground"
              : "bg-accent text-accent-foreground"
          }`}
          onClick={() => setInputMethod("app")}
        >
          App Listing
        </div>
        <div
          className={`rounded-md py-1.5 px-2 cursor-pointer ${
            inputMethod == "apk"
              ? "bg-background shadow-sm font-medium text-foreground"
              : "bg-accent text-accent-foreground"
          }`}
          onClick={() => setInputMethod("apk")}
        >
          APK File
        </div>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="url">
          {inputMethod == "website" && "Enter Website URL"}
          {inputMethod == "app" && "Enter Play Store URL or ID"}
          {inputMethod == "apk" && "Upload APK File"}
        </Label>
        <div className="flex gap-2 items-center">
          {(inputMethod == "website" || inputMethod == "app") && (
            <Input
              name="url"
              type="url"
              value={inputUrl}
              disabled={isLoading}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder={
                inputMethod == "website"
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
          )}
          {inputMethod == "apk" && (
            <>
              {file === undefined ? (
                <div
                  className={cn(
                    "w-full h-24 bg-accent border border-dashed rounded-md flex flex-col gap-3 justify-center items-center cursor-pointer",
                    fileHover && "bg-accent/80 animate-pulse border-primary"
                  )}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setFileHover(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setFileHover(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleFileDrop(e);
                    setFileHover(false);
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div
                    className={
                      (fileHover ? "animate-bounce" : "") + " text-center"
                    }
                  >
                    <UploadIcon />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-1">
                    <div className="text-center">
                      {fileHover ? (
                        <p>Release to upload</p>
                      ) : (
                        <>
                          <p className="md:block hidden">
                            Browse or Drag Apk File here
                          </p>
                          <p className="md:hidden ">Browse Apk File</p>
                        </>
                      )}
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="application/vnd.android.package-archive"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                  />
                </div>
              ) : (
                <div className="flex-1">
                  <div className="w-fit flex gap-2 items-center px-2 py-1 border rounded-md">
                    <Image
                      src="/images/apk-file.png"
                      alt="Apk File"
                      width={20}
                      height={20}
                    />
                    <p className="text-center">{file.name}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setFile(undefined)}
                    >
                      <XIcon size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
          <Button
            onClick={isLoading ? undefined : handleAnalyze}
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
