import type { CardVariant } from './types'

export const CARD_CLASSES_BY_VARIANT: Record<CardVariant, string> = {
  outlined: 'border border-gray-2 bg-white shadow-none',
  elevated: 'shadow-custom bg-white',
  filled: 'bg-gray-1'
}