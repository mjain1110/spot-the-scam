"use server";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function analyzeUrl(url: string, type: "website" | "app") {
  const result = {
    inputParameters: {
      websiteScreenshot: "/images/screenshot.jpeg",
      domainDetails: {},
      sslDetails: {},
      contactDetails: {},
      content: {},
    },
    outputParameters: {
      overallScore: {
        score: 46,
        heading: "Overall Score",
        reason: "Website seems suspicious.",
      },
      sslScore: {
        score: 99,
        heading: "SSL Score",
        reason: "SSL certificate is valid and secure.",
      },
      contentQualityScore: {
        score: 6,
        heading: "Content Quality Score",
        reason: "Content is AI generated totally.",
      },
      contactDetailsScore: {
        score: 35,
        heading: "Contact Details Score",
        reason: "Contact details are present but seem suspicious.",
      },
      phishingScore: {
        score: 23,
        heading: "Phishing Score",
        reason: "Website does appear to be phishing from its screenshot.",
      },
      screenshotScore: {
        score: 100,
        heading: "Screenshot Score",
        reason: "Screenshot is of high quality and clear.",
      },
      domainScore: {
        score: 100,
        heading: "Domain Score",
        reason: "Domain is valid and secure.",
      },
    },
  };

  const analysisId = uuidv4();

  const newAnalysis = await prisma.analysis.create({
    data: {
      type,
      analysisId,
      url,
      lastAnalyzedAt: new Date(),
      feedbackGiven: false,
      inputParameters: result.inputParameters,
      outputParameters: result.outputParameters,
    },
  });

  return newAnalysis;
}

export async function fetchAnalysis(analysisId: string) {
  const result = await prisma.analysis.findUnique({
    where: { analysisId },
  });
  return result;
}

export async function recordFeedback(analysisId: string, feedback: boolean) {
  const result = await prisma.analysis.update({
    where: { analysisId },
    data: { feedbackGiven: feedback },
  });
  revalidatePath("/analysis/" + analysisId);
  return result;
}
