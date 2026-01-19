import type {ButtonSize} from "./types.ts";

export const BUTTON_CLASSES_BY_TYPE: Record<ButtonSize, string > =  {
  "sm": "rounded-[2px] px-4 py-2 text-[12px]",
  "md": "rounded-[4px] px-6 py-4 text-[14px]",
  "lg": "rounded-[6px] px-8 py-6 text-[16px]",
}