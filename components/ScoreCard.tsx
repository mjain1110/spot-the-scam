import { AnimatedCircularProgressBar } from "@/components/ui/AnimatedCircularProgressBar";

export default function ScoreCard({
  score,
  heading,
  reason,
  size,
}: {
  score: number;
  heading: string;
  reason: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`flex ${
        size === "big" ? "flex-col" : "flex-row"
      } items-center gap-5`}
    >
      <AnimatedCircularProgressBar
        max={100}
        value={score}
        min={0}
        className={size === "small" ? "size-16" : "size-24"}
        gaugePrimaryColor={`${
          score > 66 ? "#0cce6a" : score > 33 ? "#ffa400" : "#ff4e43"
        }ff`}
        gaugeSecondaryColor={`${
          score > 66 ? "#0cce6a" : score > 33 ? "#ffa400" : "#ff4e43"
        }1A`}
      />
      <div
        className={`flex-1 flex flex-col ${
          size === "big" ? "items-center" : ""
        } justify-center`}
      >
        <div className={`text-${size === "small" ? "xl" : "2xl"} font-bold`}>
          {heading}
        </div>
        <div className={`text-${size === "small" ? "sm" : "md"} text-gray-500 ${size === "big" ? "text-center" : ""}`}>
          {reason}
        </div>
      </div>
    </div>
  );
}
