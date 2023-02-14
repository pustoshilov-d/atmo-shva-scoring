import { iSort } from './types'

export const ePeopleSort: { [key: string]: iSort | null } = {
  NAME: { key: 'name', order: 1 } as unknown as iSort,
  SURNAME: { key: 'surname', order: 1 } as unknown as iSort,
  SCORE_PLACE: { key: 'score_place', order: 1 } as unknown as iSort,
}

export enum eViewIds {
  Block = 'block',
  NotLoaded = 'notloaded',
  Loader = 'loader',
  Main = 'main',
}

export enum ePanelIds {
  People = 'people',
  Block = 'block',
  NotLoaded = 'notloaded',
  Loader = 'loader',
}
