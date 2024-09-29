import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import FeedbackComp from "@/components/feedbackComp";

export default function feedbackIcons({ analysisId }: { analysisId: string }) {
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger>
          <FeedbackComp analysisId={analysisId} feedback={true}>
            <ThumbsUpIcon size={16} />
          </FeedbackComp>
        </TooltipTrigger>
        <TooltipContent>
          <p>Good response.</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <FeedbackComp analysisId={analysisId} feedback={false}>
            <ThumbsDownIcon size={16} />
          </FeedbackComp>
        </TooltipTrigger>
        <TooltipContent>
          <p>Bad response.</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
