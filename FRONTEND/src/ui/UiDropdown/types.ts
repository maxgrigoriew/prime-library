export type DropdownOption = {
  label: string
  value: any
  disabled?: boolean
}

export const dropDownSizes = ['sm', 'md', 'lg'] as const
export type DropdownSize = typeof dropDownSizes[number]