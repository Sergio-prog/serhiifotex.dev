"use client";

import Image from "next/image";
import LinkButton from "./components/LinkButton";
import {
  DiscordLogoIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  QuestionIcon,
  QuestionMarkIcon,
  ReadCvLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Snowfall } from "./components/Snowfall";

export default function Home() {
  const onSaveFile = (e: KeyboardEvent) => {
    e.preventDefault();
    toast.info("File saved... wait, what?", { autoClose: 2000, pauseOnHover: false, hideProgressBar: true, icon: (props) => (<QuestionIcon />) });
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const ctrl = event.metaKey || event.ctrlKey;
      if (event.key.toLowerCase() === "s" && ctrl) {
        onSaveFile(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <Snowfall count={35} />
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative lg:w-[890px] w-screen px-4 text-center">
          <h1 className="lg:text-[64px] md:text-[48px] text-[36px] font-bold absolute -top-[142px] w-full left-1/2 transform -translate-x-1/2 text-nowrap">
            Serhii Nesterov
          </h1>
          <h2 className="lg:text-sm text-xs absolute lg:-top-[64px] -top-[72px] w-full left-1/2 transform -translate-x-1/2">
            Software engineer. Smart Contract and Backend developer
          </h2>

          <div
            className="bg-[#393E46] w-full md:min-h-[90px] max-md:min-h-[180px] max-md:h-fit relative rounded-4xl text-left lg:px-4 px-6 py-5
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center ring-[#e1dace40] ring-1"
          >
            <Image
              src="/image/reach-me-here.svg"
              alt="Reach me here"
              height={346}
              width={326}
              className="absolute right-[710px] top-[40px] xl:block hidden pointer-events-none"
            />
            <LinkButton
              className="justify-center md:justify-start group"
              text="Sergio-prog"
              link="https://github.com/Sergio-prog"
              tooltip="Github"
            >
              <GithubLogoIcon className="w-7 h-7 lg:w-8 lg:h-8 group-hover:animate-(--animate-small-bounce)" />
            </LinkButton>

            <LinkButton
              className="justify-center md:justify-start group"
              text="@0xFotex"
              link="https://x.com/0xFotex"
              tooltip="Twitter"
            >
              <XLogoIcon className="w-7 h-7 lg:w-8 lg:h-8 group-hover:animate-(--animate-small-bounce)" />
            </LinkButton>

            <LinkButton
              className="justify-center md:justify-start group"
              text="@fotex"
              link="@fotex"
              isCopiable
              tooltip="Discord username"
            >
              <DiscordLogoIcon className="w-7 h-7 lg:w-8 lg:h-8 group-hover:animate-(--animate-small-bounce)" />
            </LinkButton>

            <LinkButton
              className="justify-center md:justify-start group"
              text="sergey-nesterov"
              link="https://www.linkedin.com/in/sergey-nesterov/"
              tooltip="Linkedin"
            >
              <LinkedinLogoIcon className="w-7 h-7 lg:w-8 lg:h-8 group-hover:animate-(--animate-small-bounce)" />
            </LinkButton>

            <LinkButton
              className="justify-center md:justify-start group"
              text="My CV"
              link="/cv.pdf/"
              tooltip="Curriculum vitae"
            >
              <ReadCvLogoIcon className="w-7 h-7 lg:w-8 lg:h-8 group-hover:-rotate-10 group-hover:animate-(--animate-small-bounce) duration-150" />
            </LinkButton>
          </div>
          <div className="relative mt-1">
            <p
              className="text-transparent bg-clip-text bg-gradient-to-b from-[#393E46]/50
             to-[#393E46]/20 [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            >
              I`m too lazy to make a good design. sry {":)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
