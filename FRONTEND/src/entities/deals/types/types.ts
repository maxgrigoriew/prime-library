export type Deal = {
    id: number
    created: string
    updated: string
    plannedConclusionDate: string | null
    actualConclusionDate: string | null
    actualClosingDate: string | null
    name: string
    description: string | null
    stage: string
    client: number
    manager: number
    refusal: number
    contacts: number[]
}

export type DealListReqt = {
    id: number
    created: string
    updated: string
    plannedConclusionDate: string | null
    actualConclusionDate: string | null
    actualClosingDate: string | null
    name: string
    description: string | null
    stage: string
    client: number
    manager: number
    refusal: number
    contacts: number[]
}