import normalizeStructureParam from '@/utils/normalizeStructureParam'
import { ApiFilters } from '@prisma/client'
import { z } from 'zod'

const ResponseDataSchema = z.object({
  date: z.string(),
  areaName: z.string(),
  areaCode: z.string(),
  newCasesByPublishDate: z.number(),
  cumCasesByPublishDate: z.number(),
  newDeaths28DaysByPublishDate: z.number(),
  cumDeaths28DaysByPublishDate: z.number(),
})
type ResponseData = z.infer<typeof ResponseDataSchema>

const createCovidSchema = <TData extends keyof ResponseData>(data: TData[]) =>
  z.object({
    length: z.number(),
    maxPageLimit: z.number(),
    totalRecords: z.number(),
    data: ResponseDataSchema.pick(
      data.reduce((obj, item) => {
        obj[item] = true
        return obj
      }, {} as Record<TData, boolean>)
    ).array(),
    requestPayload: z.object({
      structure: z.record(
        ResponseDataSchema.keyof(),
        ResponseDataSchema.keyof()
      ),
      filters: z
        .object({
          identifier: z.string(),
          operator: z.literal('='),
          value: z.string(),
        })
        .array(),
      page: z.number().optional(),
    }),
    pagination: z
      .object({
        current: z.string().nullable(),
        next: z.string().nullable(),
        previous: z.string().nullable(),
        first: z.string().nullable(),
        last: z.string().nullable(),
      })
      .optional(),
  })

type Structure = keyof ResponseData
type CovidApiParams<T extends Structure> = {
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
}: CovidApiParams<T>) {
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

  const json = await response.json()

  return createCovidSchema(structure).parse(json)
}
