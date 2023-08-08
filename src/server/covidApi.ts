import normalizeStructureParam from '@/utils/normalizeStructureParam'
import { ApiFilters } from '@prisma/client'

type ResponseDataMap = {
  date: string
  areaName: string
  areaCode: string
  newCasesByPublishDate: number
  cumCasesByPublishDate: number
  newDeaths28DaysByPublishDate: number
  cumDeaths28DaysByPublishDate: number
}

type Structure = keyof ResponseDataMap

export type CovidResponse<T extends keyof ResponseDataMap> = {
  length: number
  maxPageLimit: number
  totalRecords: number
  data: Pick<ResponseDataMap, T>[]
  requestPayload: {
    structure: Record<T, T>
    filters: {
      identifier: string
      operator: '='
      value: string
    }[]
    page: number
  }
  pagination: {
    current: string | null
    next: string | null
    previous: string | null
    first: string | null
    last: string | null
  }
}

type getCoronaCasesUrlParams<T extends Structure> = {
  filters: Omit<ApiFilters, 'id'>
  structure: T[]
  latestBy?: T
  page?: number
}

export default async function fetchCovidApi<T extends Structure>({
  filters,
  structure,
  latestBy,
  page,
}: getCoronaCasesUrlParams<T>) {
  const endpoint = 'https://api.coronavirus.data.gov.uk/v1/data?'
  const normalizedStructure = normalizeStructureParam(structure)
  const composedFilters = []

  if (filters.areaType) composedFilters.push(`areaType=${filters.areaType}`)
  if (filters.areaName) composedFilters.push(`areaName=${filters.areaName}`)

  const apiParams = new URLSearchParams({
    filters: composedFilters.join(';'),
    structure: JSON.stringify(normalizedStructure),
    ...(page ? { page: page.toString() } : {}),
    ...(latestBy ? { latestBy } : {}),
  })
  const response = await fetch(endpoint + apiParams)
  const json = (await response.json()) as Promise<CovidResponse<T>>

  return json
}
