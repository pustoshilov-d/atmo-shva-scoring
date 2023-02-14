import blockImage from '@assets/img/atmo_block.jpg'
import { ePanelIds, eViewIds } from '@src/shared/enums'
import { iNonAuthViewsProps } from '@views/types'
import { Panel, PanelHeader, Text, View } from '@vkontakte/vkui'
import { FC } from 'react'
import { REACT_APP_APP_TITLE, REACT_APP_VK_SHVA_GROUP_ID } from '../../shared/consts'
import './index.css'

export const ViewNotLoaded: FC<iNonAuthViewsProps> = ({ ...rest }) => (
  <View activePanel={eViewIds.NotLoaded} {...rest}>
    <Panel id={ePanelIds.NotLoaded}>
      <PanelHeader separator={false}>{REACT_APP_APP_TITLE}</PanelHeader>
      <div className="view-notloaded__content">
        <Text className="view-notloaded__content-text">
          При загрузке произошла ошибка.<br/>Пожалуйста, попробуй позже или обратись к <a style={{ color: 'inherit' }} target="_blank" rel="noopener" href={`https://vk.me/club${REACT_APP_VK_SHVA_GROUP_ID}`}>разработчикам</a>.
        </Text>
        <img src={blockImage} alt="Access denied" className="view-notloaded__image" />
      </div>
    </Panel>
  </View>
)
