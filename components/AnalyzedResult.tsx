import ScoreCard from "@/components/ScoreCard";
import { analysisResult } from "@/lib/interfaces";
import Image from "next/image";
import FeedbackIcons from "@/components/feedbackIcons";

export default function AnalyzedResult({
  result,
  analysisId
}: {
  result: analysisResult;
  analysisId:string;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-8 max-w-3xl">
      <div className="w-full flex justify-center gap-4 items-center text-gray-400">
        <span className="text-sm">
          Analysis result of {result.url} last analyzed at{" "}
          {result.lastAnalyzedAt.toLocaleDateString()}
        </span>
        {!result.feedbackGiven && (
          <FeedbackIcons analysisId={analysisId} />
        )}
      </div>
      <div className="flex gap-8 items-center">
        <Image
          src={result.inputParameters.websiteScreenshot}
          alt="screenshot"
          width={455}
          height={256}
          className="rounded-xl shadow-md"
        />
        <ScoreCard
          heading={result.outputParameters.overallScore.heading}
          score={result.outputParameters.overallScore.score}
          reason={result.outputParameters.overallScore.reason}
          size="big"
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <ScoreCard
          heading={result.outputParameters.sslScore.heading}
          score={result.outputParameters.sslScore.score}
          reason={result.outputParameters.sslScore.reason}
          size="small"
        />
        <ScoreCard
          heading={result.outputParameters.contentQualityScore.heading}
          score={result.outputParameters.contentQualityScore.score}
          reason={result.outputParameters.contentQualityScore.reason}
          size="small"
        />
        <ScoreCard
          heading={result.outputParameters.contactDetailsScore.heading}
          score={result.outputParameters.contactDetailsScore.score}
          reason={result.outputParameters.contactDetailsScore.reason}
          size="small"
        />
        <ScoreCard
          heading={result.outputParameters.phishingScore.heading}
          score={result.outputParameters.phishingScore.score}
          reason={result.outputParameters.phishingScore.reason}
          size="small"
        />
      </div>
    </div>
  );
}
