export interface iGsheetsResDTO {
  scoring: iPersonDTO[]
  scoring_meta: iScoringMeta
}

export interface iScoringMeta {
  [key: string]: string
}

export interface iPersonDTO {
  photo?: string
  vk_id?: number
  name?: string
  surname?: string
  medals?: string
  score_place: number
  score_sum: number
  excluded: string
  [key: string]: string | number | boolean | undefined
}

export interface iPerson {
  photo?: string
  vk_id?: number
  name?: string
  surname?: string
  medals?: string[]
  score_place: number
  score_sum: number
  excluded: boolean
  [key: string]: string | number | boolean | string[] | number[] | undefined
}

export interface iFilter {
  key: string
  value: string | number | boolean
}

export interface iSort {
  key: string
  order: 1 | -1
}
