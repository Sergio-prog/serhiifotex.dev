"use client"

import { PropsWithChildren, useEffect, useState } from "react";
import { classNames } from "../utils/classnames";
import { Tooltip } from 'react-tooltip'

interface LinkButtonProps extends PropsWithChildren {
  text: string;
  className?: string;
  link: string;
  isCopiable?: boolean;
  durationCopiableMs?: number;
  tooltip: string;
}

export default function LinkButton({ children, text, className, link, tooltip, isCopiable, durationCopiableMs=1000 }: LinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (e) {
      // ignore - copying isn't required for the visual effect
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 800);
  };

  const redirect = () => {
    window.open(link, "_blank", "noreferrer noopener");
  }

  return (
    <>
    <Tooltip id="link-button" opacity="50%" noArrow 
      style={{paddingLeft: "12px", paddingRight: "12px", borderRadius: "6px"}} />
      <div
        className={classNames("lg:min-w-[176px] w-fit min-w-[150px] h-[56px] lg:py-3 py-2 lg:px-4 px-3 bg-[#EFE4D326] rounded-2xl", 
          "hover:ring-2 hover:cursor-pointer hover:ring-[#EFE4D340] hover:scale-[101.8%]",
          "transition-transform ease-in-out duration-200 flex items-center", className)}
        onClick={isCopiable ? handleCopyClick : redirect}
        data-tooltip-id="link-button"
        data-tooltip-content={copied ? "Copied!" : tooltip}
        data-tooltip-place="top"
      >
        <div className="flex gap-2 items-center">
          {children}
          <p className="lg:text-xl text-md font-medium leading-normal">{text}</p>
        </div>
      </div>
    </>
  )
}