import { AnimatedCircularProgressBar } from "@/components/ui/AnimatedCircularProgressBar";

export default function Loading() {
  return (
    <div className="flex-1 w-full flex flex-col items-center gap-8 max-w-3xl animate-pulse opacity-30">
      <div className="flex gap-8 items-center md:flex-row flex-col-reverse">
        <div className="w-[455px] h-[256px] bg-slate-400 rounded-xl shadow-md" />
        <div className="flex flex-col items-center gap-5">
          <AnimatedCircularProgressBar
            max={100}
            value={50}
            min={0}
            className="size-24"
            gaugePrimaryColor="#94a3b8ff"
            gaugeSecondaryColor="#94a3b81a"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <div className="w-40 h-8 bg-slate-400 rounded-sm" />
            <div className="w-50 h-6 bg-slate-400 rounded-sm" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex items-center gap-5">
          <AnimatedCircularProgressBar
            max={100}
            value={50}
            min={0}
            className="size-16"
            gaugePrimaryColor="#94a3b8ff"
            gaugeSecondaryColor="#94a3b81a"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <div className="w-40 h-6 bg-slate-400 rounded-sm" />
            <div className="w-50 h-5 bg-slate-400 rounded-sm" />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <AnimatedCircularProgressBar
            max={100}
            value={50}
            min={0}
            className="size-16"
            gaugePrimaryColor="#94a3b8ff"
            gaugeSecondaryColor="#94a3b81a"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <div className="w-40 h-6 bg-slate-400 rounded-sm" />
            <div className="w-50 h-5 bg-slate-400 rounded-sm" />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <AnimatedCircularProgressBar
            max={100}
            value={50}
            min={0}
            className="size-16"
            gaugePrimaryColor="#94a3b8ff"
            gaugeSecondaryColor="#94a3b81a"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <div className="w-40 h-6 bg-slate-400 rounded-sm" />
            <div className="w-50 h-5 bg-slate-400 rounded-sm" />
          </div>
        </div>
        <div className="flex items-center gap-5">
          <AnimatedCircularProgressBar
            max={100}
            value={50}
            min={0}
            className="size-16"
            gaugePrimaryColor="#94a3b8ff"
            gaugeSecondaryColor="#94a3b81a"
          />
          <div className="flex-1 flex flex-col gap-2 justify-center">
            <div className="w-40 h-6 bg-slate-400 rounded-sm" />
            <div className="w-50 h-5 bg-slate-400 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
