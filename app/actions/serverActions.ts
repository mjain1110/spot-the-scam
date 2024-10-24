"use server";
import { AnalysisResult } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

type analysisResultJSON = {
  analysisId: string;
  inputParameters: AnalysisResult["inputParameters"];
  outputParameters: AnalysisResult["outputParameters"];
};

export async function analyzeUrl(url: string, type: "website" | "app") {
  const alreadyAnalyzed = await prisma.analysis.findMany({
    where: { url, type },
  });
  if (alreadyAnalyzed.length > 0) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return alreadyAnalyzed[alreadyAnalyzed.length - 1];
  }
  const rawResult = await fetch("http://127.0.0.1:5001/analyze", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.AUTH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url, type }),
  });
  if (rawResult.status !== 200) {
    console.log(
      "Error aa rha hai api analyze me. rawresult:",
      await rawResult.json()
    );
    return null;
  }

  try {
    const result: analysisResultJSON = await rawResult.json();
    const newAnalysis = await prisma.analysis.create({
      data: {
        type,
        analysisId: result.analysisId,
        url,
        lastAnalyzedAt: new Date(),
        feedbackGiven: false,
        inputParameters: result.inputParameters,
        outputParameters: result.outputParameters as any,
      },
    });

    return newAnalysis;
  } catch (error) {
    console.log(
      "Error aa rha hai api analyze me. rawresult:",
      rawResult,
      "ye error hai",
      error
    );
  }
}

export async function fetchAnalysis(analysisId: string) {
  const result = await prisma.analysis.findUnique({
    where: { analysisId },
  });
  return result;
}

export async function recordFeedback(analysisId: string, feedback: boolean) {
  const analysisRecord = await prisma.analysis.update({
    where: { analysisId },
    data: { feedbackGiven: true },
  });

  const result = await prisma.feedback.create({
    data: {
      analysisId,
      feedbackGiven: feedback,
      inputParameters: analysisRecord.inputParameters as InputJsonValue,
      outputParameters: analysisRecord.outputParameters as InputJsonValue,
      type: analysisRecord.type,
    },
  });
  revalidatePath("/analysis/" + analysisId);
  return result;
}

export async function submitAnalysisToDB(result: AnalysisResult) {
  const newAnalysis = await prisma.analysis.create({
    data: {
      type: result.type,
      analysisId: result.analysisId,
      url: result.url,
      inputParameters: result.inputParameters,
      outputParameters: result.outputParameters as unknown as InputJsonValue,
    },
  });
  return newAnalysis;
}
