import labelSvg from "../../label_1.svg";
import { cn } from "../../ui/utils";
import { assetUrl } from "../../../utils/assets";

type SvgLabelHeadingProps = {
  text: string;
  className?: string;
};

export function SvgLabelHeading({ text, className }: SvgLabelHeadingProps) {
  return (
    <div className={cn("relative inline-block w-[210px] md:w-[280px]", className)}>
      <img src={assetUrl(labelSvg)} alt="" className="block h-auto w-full" />
      <div className="font-rejsfest absolute inset-0 flex items-center justify-center px-3 text-center text-[26px] tracking-[0.04em] text-white -translate-x-2 md:-translate-x-3 md:text-[36px]">
        {text.toUpperCase()}
      </div>
    </div>
  );
}
