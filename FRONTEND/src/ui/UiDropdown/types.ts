export type DropdownOption = {
  label: string
  value: any
  disabled?: boolean
}

export const dropDownSizes = ['sm', 'md', 'lg'] as const
export type DropdownSize = typeof dropDownSizes[number]

export const dropDownPositions = ['absolute', 'static'] as const
export type DropDownPosition = typeof dropDownPositions[number]

export type DropdownProps = {
  options: DropdownOption[]
  placeholder?: string
  isDisabled?: boolean
  isFilter?: boolean
  size: DropdownSize
  position: DropDownPosition
}