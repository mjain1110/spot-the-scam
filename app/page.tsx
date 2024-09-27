import InputForm from "@/components/InputForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="w-full flex p-4">
        <Image
          src="/images/logo-highRes.png"
          alt="logo"
          width={200}
          height={36}
        />
      </div>
      <div className="flex-1 flex flex-col items-center p-10">
        <InputForm />
      </div>
    </div>
  );
}
