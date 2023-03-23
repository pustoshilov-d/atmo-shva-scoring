import { ePanelIds, eViewIds } from '@src/shared/enums'
import { iModeratorViewProps } from '@views/types'
import { Panel, PanelHeader, View } from '@vkontakte/vkui'
import { FC } from 'react'
import { REACT_APP_APP_TITLE } from '../../shared/consts'
import './index.css'

export const ViewModerator: FC<iModeratorViewProps> = ({ ...rest }) => (
  <View activePanel={eViewIds.Moderator} {...rest}>
    <Panel id={ePanelIds.Moderator}>
      <PanelHeader separator={false}>{REACT_APP_APP_TITLE}</PanelHeader>
        
    </Panel>
  </View>
)
