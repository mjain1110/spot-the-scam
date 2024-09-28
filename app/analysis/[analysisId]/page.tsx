import { fetchAnalysis } from "@/app/actions/serverActions";
import AnalyzedResult from "@/components/AnalyzedResult";
import { analysisResult } from "@/lib/interfaces";

export default async function AnalysisPage({
  params,
}: {
  params: { analysisId: string };
}) {
  const result = await fetchAnalysis(params.analysisId);
  if (!result) {
    return;
  }
  return (
    <AnalyzedResult
      result={result as unknown as analysisResult}
      analysisId={params.analysisId}
    />
  );
}
