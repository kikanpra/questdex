import React from "react";
import logoImage from "../assets/images/logo.png";

interface QuestdexLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const QuestdexLogo: React.FC<QuestdexLogoProps> = ({
  className = "",
  size = "md",
}) => {
  const heightClass =
    size === "sm"
      ? "h-7"
      : size === "md"
        ? "h-10"
        : size === "lg"
          ? "h-16"
          : "h-24";

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
    >
      <img
        src={logoImage}
        alt="Questdex"
        className={`${heightClass} w-auto filter drop-shadow-md`}
      />
    </div>
  );
};
