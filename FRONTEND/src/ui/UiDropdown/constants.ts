import type {DropdownSize} from "@/ui/UiDropdown/types.ts";

export const DROPDOWN_CLASS_BY_SIZE: Record<DropdownSize, string> = {
  'sm': 'py-2 px-4 text-sm',
  'md': 'py-4 px-6 text-lg',
  'lg': 'py-6 px-8 text-base'
}