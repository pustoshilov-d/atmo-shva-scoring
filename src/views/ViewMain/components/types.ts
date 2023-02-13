import { eModalIds, ePanelIds } from '@shared/enums'
import { iFilter, iSort } from '@shared/types'
import { UserInfo } from '@vkontakte/vk-bridge'
import { PanelProps } from '@vkontakte/vkui'
import { iChat, iMap, iPerson, iStat } from '@shared/types'

export interface iCustomPanelProps extends PanelProps {
  id: ePanelIds
  setActivePanel: (panel: ePanelIds) => void
  setActiveModal: (modal: eModalIds) => void
  goHome?: () => void
  fetchedUser?: UserInfo
  curPerson?: iPerson | undefined
}

export interface iPeoplePanelProps extends iCustomPanelProps {
  persons: iPerson[]
  curPerson: iPerson | undefined
  peopleSort: iSort | null
  setPeopleSort: (v: iSort | null) => void
  peopleFilter: iFilter | null
  setPeopleFilter: (v: iFilter | null) => void
  peopleSearch: string
  setPeopleSearch: (peopleSearch: string) => void
  isPeopleCardsCollapsed: boolean
  setIsPeopleCardsCollapsed: (isPeopleCardsCollapsed: boolean) => void
}

export interface iPanelChatsProps extends iCustomPanelProps {
  chats: iChat[]
}

export interface iPanelStatsProps extends iCustomPanelProps {
  stats: iStat[]
}

export interface iPanelMapProps extends iCustomPanelProps {
  maps: iMap[]
  persons: iPerson[]
  setPeopleSearch: (peopleSearch: string) => void
  setPeopleFilter: (v: iFilter | null) => void
  setIsPeopleCardsCollapsed: (isPeopleCardsCollapsed: boolean) => void
}
