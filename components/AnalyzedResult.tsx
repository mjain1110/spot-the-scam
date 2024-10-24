import ScoreCard from "@/components/ScoreCard";
import { AnalysisResult } from "@/lib/interfaces";
import Image from "next/image";
import FeedbackIcons from "@/components/feedbackIcons";

export default function AnalyzedResult({
  result,
  analysisId,
}: {
  result: AnalysisResult;
  analysisId: string;
}) {
  return (
    <div className="w-full flex flex-col items-center gap-8 max-w-3xl">
      <div className="w-full flex justify-center gap-4 items-center text-gray-400">
        <span className="text-sm">
          Analysis result of {result.url} last analyzed on{" "}
          {result.lastAnalyzedAt.toLocaleDateString()}
        </span>
        {!result.feedbackGiven && <FeedbackIcons analysisId={analysisId} />}
      </div>
      <div className="flex gap-8 items-center md:flex-row flex-col-reverse">
        <Image
          src={
            result.type === "website"
              ? result.inputParameters.websiteScreenshot
              : result.type === "app"
              ? result.inputParameters.appDetails.icon
              : "/images/apk-file.png"
          }
          alt="screenshot"
          width={result.type === "website" ? 455 : 96}
          height={result.type === "website" ? 256 : 96}
          className={`rounded-xl ${
            result.type === "website" ? "shadow-md" : ""
          }`}
        />
        <ScoreCard
          heading={result.outputParameters.overallScore.heading}
          score={result.outputParameters.overallScore.score}
          reason={result.outputParameters.overallScore.reason}
          size={result.type === "website" ? "big" : "small"}
        />
      </div>
      {result.type === "website" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            heading={result.outputParameters.domainScore.heading}
            score={result.outputParameters.domainScore.score}
            reason={result.outputParameters.domainScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.screenshotScore.heading}
            score={result.outputParameters.screenshotScore.score}
            reason={result.outputParameters.screenshotScore.reason}
            size="small"
          />
        </div>
      )}
      {result.type === "app" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ScoreCard
            heading={result.outputParameters.reviewsScore.heading}
            score={result.outputParameters.reviewsScore.score}
            reason={result.outputParameters.reviewsScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.updatesScore.heading}
            score={result.outputParameters.updatesScore.score}
            reason={result.outputParameters.updatesScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.installsScore.heading}
            score={result.outputParameters.installsScore.score}
            reason={result.outputParameters.installsScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.developerScore.heading}
            score={result.outputParameters.developerScore.score}
            reason={result.outputParameters.developerScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.descriptionScore.heading}
            score={result.outputParameters.descriptionScore.score}
            reason={result.outputParameters.descriptionScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.privacyPolicyScore.heading}
            score={result.outputParameters.privacyPolicyScore.score}
            reason={result.outputParameters.privacyPolicyScore.reason}
            size="small"
          />
        </div>
      )}
      {result.type === "apk" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ScoreCard
            heading={result.outputParameters.appNameScore.heading}
            score={result.outputParameters.appNameScore.score}
            reason={result.outputParameters.appNameScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.permissionsScore.heading}
            score={result.outputParameters.permissionsScore.score}
            reason={result.outputParameters.permissionsScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.certificateScore.heading}
            score={result.outputParameters.certificateScore.score}
            reason={result.outputParameters.certificateScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.versionNameScore.heading}
            score={result.outputParameters.versionNameScore.score}
            reason={result.outputParameters.versionNameScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.minSdkVersionScore.heading}
            score={result.outputParameters.minSdkVersionScore.score}
            reason={result.outputParameters.minSdkVersionScore.reason}
            size="small"
          />
          <ScoreCard
            heading={result.outputParameters.targetSdkVersionScore.heading}
            score={result.outputParameters.targetSdkVersionScore.score}
            reason={result.outputParameters.targetSdkVersionScore.reason}
            size="small"
          />
        </div>
      )}
    </div>
  );
}
