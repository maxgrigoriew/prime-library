export type DataTableColumn = {
  field: string
  header: string
  sortable?: boolean
  style?: Record<string, string>
  class?: string
}

export type SortOrder = 1 | -1 | 0