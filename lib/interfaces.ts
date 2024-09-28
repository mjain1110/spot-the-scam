export interface analysisResult {
  type: string;
  analysisId: string;
  url: string;
  lastAnalyzedAt: Date;
  feedbackGiven: boolean;
  inputParameters: {
    domainDetails: any;
    sslDetails: any;
    contactDetails: any;
    content: any;
    websiteScreenshot: string;
  };
  outputParameters: {
    overallScore: scoreResult;
    sslScore: scoreResult;
    contentQualityScore: scoreResult;
    contactDetailsScore: scoreResult;
    phishingScore: scoreResult;
    screenshotScore: scoreResult;
    domainScore: scoreResult;
  };
}

interface scoreResult {
  score: number;
  heading: string;
  reason: string;
}
