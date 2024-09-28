import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-12">
      <Image
        src="/images/hero-image.png"
        alt="hero-image"
        width={300}
        height={300}
        className="rounded-md opacity-80"
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-bold text-gray-500">Is this a fake website or app?</h1>
        <p className="text-lg text-gray-500">
          SpotTheScam is a free tool to help you detect fake websites and app
          store listings.
        </p>
      </div>
    </div>
  );
}
