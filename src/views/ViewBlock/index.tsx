import blockImage from '@assets/img/atmo_block.jpg'
import { ePanelIds, eViewIds } from '@src/shared/enums'
import { iNonAuthViewsProps } from '@views/types'
import { Panel, PanelHeader, Text, View } from '@vkontakte/vkui'
import { FC } from 'react'
import { REACT_APP_APP_TITLE, REACT_APP_VK_SHVA_GROUP_ID, REACT_APP_VK_ATMOMY_GROUP_ID } from '../../shared/consts'
import './index.css'

export const ViewBlock: FC<iNonAuthViewsProps> = ({ ...rest }) => (
  <View activePanel={eViewIds.Block} {...rest}>
    <Panel id={ePanelIds.Block}>
      <PanelHeader separator={false}>{REACT_APP_APP_TITLE}</PanelHeader>
      <div className="view-block__content">
        <Text className="view-block__content-text">
          В доступе отказано, так как ты не являешься подписчиком{' '}
          <a
            style={{ color: 'inherit' }}
            target="_blank"
            rel="noopener"
            href={`https://vk.com/club${REACT_APP_VK_ATMOMY_GROUP_ID}`}
          >
            «Атмосфера — это мы»
          </a>
          . <br />
          Если считаешь, что это ошибка, напиши в сообщения группы. <br />
          Иначе приходи к нам на{' '}
          <a style={{ color: 'inherit' }} target="_blank" rel="noopener" href={`https://vk.com/club${REACT_APP_VK_SHVA_GROUP_ID}`}>
            Школу
          </a>{' '}
          и становись профессиональным вожатым!
        </Text>
        <img src={blockImage} alt="Access denied" className="view-block__image" />
      </div>
    </Panel>
  </View>
)
