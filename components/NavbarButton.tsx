"use client";
import React from "react";
import { Button } from "@radix-ui/themes";
import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

interface Props extends PropsWithChildren {
  onClick?: () => void;
  icon?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const NavbarButton = ({
  children,
  onClick,
  icon,
  bgColor,
  textColor = "text-black",
}: Props) => {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        bgColor || "bg-primary",
        textColor,
        "px-4 py-2 h-[40px] rounded-[10px] font-montserrat font-semibold",
        "md:text-sm lg:text-[16px] leading-[19.5px] lg:px-4 lg:py-2 md:px-3"
      )}
    >
      <div className="flex justify-center items-center">
        {icon && (
          <div className="md:w-0.5 md:text-xs w-1 h-6 md:mr-6 mr-7">{icon}</div>
        )}
        <span className="pb-1 md:text-xs">{children}</span>
      </div>
    </Button>
  );
};

export default NavbarButton;
