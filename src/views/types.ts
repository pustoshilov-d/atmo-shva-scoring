import { eViewIds } from '@src/shared/enums'
import { iPerson, iScoringMeta } from '@src/shared/types'
import { UserInfo } from '@vkontakte/vk-bridge'
import { ViewProps } from '@vkontakte/vkui'

export interface iCustomViewProps extends Omit<ViewProps, 'activePanel'> {
  id: eViewIds
  fetchedUser?: UserInfo
}

export interface iNonAuthViewsProps extends iCustomViewProps {
  setActiveView?: (view: eViewIds) => void
}

export interface iMainViewProps extends iCustomViewProps {
  persons: iPerson[]
  curPerson: iPerson | undefined
  scoringMeta: iScoringMeta
}
