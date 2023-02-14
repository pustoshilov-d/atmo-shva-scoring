import { ePanelIds } from '@shared/enums'
import { iPerson, iScoringMeta } from '@shared/types'
import { UserInfo } from '@vkontakte/vk-bridge'
import { PanelProps } from '@vkontakte/vkui'

export interface iCustomPanelProps extends PanelProps {
  id: ePanelIds
  setActivePanel: (panel: ePanelIds) => void
  goHome?: () => void
  fetchedUser?: UserInfo
  curPerson?: iPerson | undefined
}

export interface iPeoplePanelProps extends iCustomPanelProps {
  persons: iPerson[]
  curPerson: iPerson | undefined
  scoringMeta: iScoringMeta
}
