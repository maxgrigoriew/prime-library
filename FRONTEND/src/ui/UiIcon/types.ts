export const iconSizes = ['sm', 'md', 'lg'] as const
export type IconSize = typeof iconSizes[number]

export const iconTypes = ['primary', 'secondary'] as const
export type iconType = typeof iconTypes[number]
