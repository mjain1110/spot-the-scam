"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { recordFeedback } from "@/app/actions/serverActions";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

export default function feedbackIcons({ analysisId }: { analysisId: string }) {
  return (
    <div className="flex items-center">
      <Tooltip>
        <TooltipTrigger>
          <div
            className="p-2 rounded-sm hover:bg-secondary cursor-pointer"
            onClick={() => {
              recordFeedback(analysisId, true);
            }}
          >
            <ThumbsUpIcon size={16} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Rate this response as accurate.</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Dialog>
            <DialogTrigger>
              <div className="p-2 rounded-sm hover:bg-secondary cursor-pointer">
                <ThumbsDownIcon size={16} />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TooltipTrigger>
        <TooltipContent>
          <p>This response is incorrect?</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
