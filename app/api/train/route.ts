import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const AppDataToTrain = await prisma.feedback.findMany({
    where: {
      usedForTraining: false,
      type: "app",
    },
  });

  const WebsiteDataToTrain = await prisma.feedback.findMany({
    where: {
      usedForTraining: false,
      type: "website",
    },
  });

  if (AppDataToTrain.length > 20) {
    // at least one record should be of feedback true and one of false
    const feedbackTrue = AppDataToTrain.find(
      (feedback) => feedback.feedbackGiven === true
    );
    const feedbackFalse = AppDataToTrain.find(
      (feedback) => feedback.feedbackGiven === false
    );
    if (feedbackTrue && feedbackFalse) {
      const response = await fetch("http://127.0.0.1:5000/train", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputParameters: feedbackTrue.inputParameters,
          outputParameters: feedbackTrue.outputParameters,
          feedbackGiven: feedbackTrue.feedbackGiven,
          type: "app",
        }),
      });

      if (response.status !== 200) {
        console.log("Error aa rha hai api train me. response:", response);
      }

      await prisma.feedback.update({
        where: {
          id: feedbackTrue.id,
        },
        data: {
          usedForTraining: true,
        },
      });
    }
  }

  if (WebsiteDataToTrain.length > 20) {
    // at least one record should be of feedback true and one of false
    const feedbackTrue = WebsiteDataToTrain.find(
      (feedback) => feedback.feedbackGiven === true
    );
    const feedbackFalse = WebsiteDataToTrain.find(
      (feedback) => feedback.feedbackGiven === false
    );
    if (feedbackTrue && feedbackFalse) {
      const response = await fetch("http://127.0.0.1:5000/train", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputParameters: feedbackTrue.inputParameters,
          outputParameters: feedbackTrue.outputParameters,
          feedbackGiven: feedbackTrue.feedbackGiven,
          type: "website",
        }),
      });

      if (response.status !== 200) {
        console.log("Error aa rha hai api train me. response:", response);
      }

      await prisma.feedback.update({
        where: {
          id: feedbackTrue.id,
        },
        data: {
          usedForTraining: true,
        },
      });
    }
  }

  return NextResponse.json({ message: "Training data updated" });
}
