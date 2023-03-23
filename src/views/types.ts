import { eViewIds } from '@src/shared/enums'
import { ExtededUserInfo, iPerson, iScoringInfo } from '@src/shared/types'
import { ViewProps } from '@vkontakte/vkui'

export interface iCustomViewProps extends Omit<ViewProps, 'activePanel'> {
  id: eViewIds
  fetchedUser?: ExtededUserInfo
}

export interface iNonAuthViewsProps extends iCustomViewProps {
  setActiveView?: (view: eViewIds) => void
}


export interface iMainViewProps extends iCustomViewProps {
  curPerson: iPerson | undefined
  scoringInfo: iScoringInfo
}
