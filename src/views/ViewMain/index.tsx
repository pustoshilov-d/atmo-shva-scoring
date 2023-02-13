import { ePanelIds } from '@src/shared/enums'
import { iMainViewProps } from '@views/types'
import { View } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { PanelChats } from './components/PanelChats'
import { PanelHome } from './components/PanelHome'
import { PanelMap } from './components/PanelMap'
import { PanelMatch } from './components/PanelMatch'
import { PanelPeople } from './components/PanelPeople'
import { PanelStats } from './components/PanelStats'

export const ViewMain: FC<iMainViewProps> = ({
  stats,
  chats,
  maps,
  persons,
  curPerson,
  setActiveModal,
  setIsPopout,
  fetchedUser,
  setPeopleSort,
  peopleSort,
  setPeopleFilter,
  peopleFilter,
  ...rest
}) => {
  const [activePanel, setActivePanel] = useState<ePanelIds>(ePanelIds.Home)
  const [peopleSearch, setPeopleSearch] = useState<string>('')
  const [isPeopleCardsCollapsed, setIsPeopleCardsCollapsed] = useState<boolean>(true)

  useEffect(() => {
    window.addEventListener('popstate', () => {
      setActiveModal(null)
      setActivePanel(ePanelIds.Home)
    })
  }, [])

  const goHome = () => {
    setActivePanel(ePanelIds.Home)
  }

  return (
    <View activePanel={activePanel} {...rest} onSwipeBack={() => setActivePanel(ePanelIds.Home)}>
      <PanelHome
        id={ePanelIds.Home}
        setActivePanel={setActivePanel}
        setActiveModal={setActiveModal}
        fetchedUser={fetchedUser}
        curPerson={curPerson}
      />
      <PanelPeople
        id={ePanelIds.People}
        goHome={goHome}
        setActivePanel={setActivePanel}
        setActiveModal={setActiveModal}
        fetchedUser={fetchedUser}
        curPerson={curPerson}
        persons={persons}
        peopleSort={peopleSort}
        setPeopleSort={setPeopleSort}
        peopleFilter={peopleFilter}
        setPeopleFilter={setPeopleFilter}
        peopleSearch={peopleSearch}
        setPeopleSearch={setPeopleSearch}
        isPeopleCardsCollapsed={isPeopleCardsCollapsed}
        setIsPeopleCardsCollapsed={setIsPeopleCardsCollapsed}
      />
      <PanelMap
        id={ePanelIds.Map}
        goHome={goHome}
        setActivePanel={setActivePanel}
        fetchedUser={fetchedUser}
        maps={maps}
        persons={persons}
        setActiveModal={setActiveModal}
        setPeopleSearch={setPeopleSearch}
        setPeopleFilter={setPeopleFilter}
        setIsPeopleCardsCollapsed={setIsPeopleCardsCollapsed}
      />
      <PanelMatch
        id={ePanelIds.Match}
        goHome={goHome}
        setActivePanel={setActivePanel}
        setActiveModal={setActiveModal}
        fetchedUser={fetchedUser}
      />
      <PanelStats
        id={ePanelIds.Stats}
        stats={stats}
        goHome={goHome}
        setActivePanel={setActivePanel}
        setActiveModal={setActiveModal}
      />
      <PanelChats
        id={ePanelIds.Chats}
        chats={chats}
        goHome={goHome}
        setActivePanel={setActivePanel}
        setActiveModal={setActiveModal}
      />
    </View>
  )
}
