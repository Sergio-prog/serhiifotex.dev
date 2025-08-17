"use client"

import Image from "next/image";
import LinkButton from "./components/LinkButton";
import { DiscordLogoIcon, GithubLogoIcon, LinkedinLogoIcon, XLogoIcon } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative lg:w-[868px] w-screen px-4 text-center">
          <h1 className="lg:text-[64px] md:text-[48px] text-[36px] font-bold absolute -top-[142px] w-full left-1/2 transform -translate-x-1/2">
            Serhii Nesterov
          </h1>
          <h2 className="lg:text-sm text-xs absolute lg:-top-[64px] -top-[72px] w-full left-1/2 transform -translate-x-1/2">
            Software engineer. Smart Contract and Backend developer 
          </h2>

          <div className="bg-[#393E46] w-full md:h-[90px] max-md:min-h-[180px] max-md:h-fit relative rounded-4xl text-left px-4 py-2.5 items-center max-md:justify-center 
            lg:gap-x-3 gap-x-2 gap-y-4 flex max-md:flex-wrap">
            <Image src="/image/reach-me-here.svg" alt="Reach me here" height={346} width={326} className="absolute right-[690px] top-[40px] lg:block hidden" />
            <LinkButton text="Sergio-prog" link="https://github.com/Sergio-prog" tooltip="Github">
              <GithubLogoIcon className="lg:size-8 size-7" />
            </LinkButton>
            <LinkButton text="@FotexFN" link="https://x.com/FotexFN" tooltip="Twitter">
              <XLogoIcon size={32} className="lg:size-8 size-7" />
            </LinkButton>
            <LinkButton text="@fotex" link="@fotex" isCopiable tooltip="Discord username">
              <DiscordLogoIcon size={32} className="lg:size-8 size-7" />
            </LinkButton>
            <LinkButton text="sergey-nesterov" link="https://www.linkedin.com/in/sergey-nesterov/" tooltip="Linkedin">
              <LinkedinLogoIcon size={32} className="lg:size-8 size-7" />
            </LinkButton>
          </div>
          <div className="relative mt-1">
            <p className="text-[#393E46] opacity-50">I’m too lazy to make a good design. sry</p>
          </div>
        </div>
      </div>
    </div>
  );
}
