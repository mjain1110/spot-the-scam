interface BaseAnalysisResult {
  analysisId: string;
  url: string;
  lastAnalyzedAt: Date;
  feedbackGiven: boolean;
}

interface WebsiteAnalysisResult extends BaseAnalysisResult {
  type: "website";
  inputParameters: {
    websiteScreenshot: string;
    domainDetails: any;
    sslDetails: boolean;
    contactDetails: any;
    content: any;
  };
  outputParameters: {
    overallScore: ScoreResult;
    sslScore: ScoreResult;
    contentQualityScore: ScoreResult;
    contactDetailsScore: ScoreResult;
    screenshotScore: ScoreResult;
    domainScore: ScoreResult;
  };
}

interface AppAnalysisResult extends BaseAnalysisResult {
  type: "app";
  inputParameters: {
    appId: string;
    appDetails: {
      score: number;
      ratings: number;
      updates: number;
      installs: string;
      developer_apps: number;
      privacy_policy: number;
      description_length: number;
      icon: string;
    };
  };
  outputParameters: {
    overallScore: ScoreResult;
    reviewsScore: ScoreResult;
    updatesScore: ScoreResult;
    installsScore: ScoreResult;
    developerScore: ScoreResult;
    descriptionScore: ScoreResult;
    privacyPolicyScore: ScoreResult;
  };
}

export interface ApkAnalysisResult extends BaseAnalysisResult {
  type: "apk";
  inputParameters: {
    apkFile?: string;
  };
  outputParameters: {
    overallScore: ScoreResult;
    permissionsScore: ScoreResult;
    certificateScore: ScoreResult;
    appNameScore: ScoreResult;
    versionNameScore: ScoreResult;
    minSdkVersionScore: ScoreResult;
    targetSdkVersionScore: ScoreResult;
  };
}

export type AnalysisResult = WebsiteAnalysisResult | AppAnalysisResult | ApkAnalysisResult;
interface ScoreResult {
  score: number;
  heading: string;
  reason: string;
}
