import { ePanelIds } from '@src/shared/enums'
import { iMainViewProps } from '@views/types'
import { View } from '@vkontakte/vkui'
import { FC, useState } from 'react'
import { PanelPeople } from './components/PanelPeople'

export const ViewMain: FC<iMainViewProps> = ({ persons, curPerson, fetchedUser, scoringMeta, ...rest }) => {
  const [activePanel, setActivePanel] = useState<ePanelIds>(ePanelIds.People)

  const goHome = () => {
    setActivePanel(ePanelIds.People)
  }

  return (
    <View activePanel={activePanel} {...rest} onSwipeBack={() => setActivePanel(ePanelIds.People)}>
      <PanelPeople
        id={ePanelIds.People}
        goHome={goHome}
        setActivePanel={setActivePanel}
        fetchedUser={fetchedUser}
        curPerson={curPerson}
        persons={persons}
        scoringMeta={scoringMeta}
      />
    </View>
  )
}
