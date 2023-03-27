import { getGroupToken } from '@src/shared/api/vkbridge'
import { ePanelIds, eViewIds } from '@src/shared/enums'
import { iModeratorViewProps } from '@views/types'
import bridge from '@vkontakte/vk-bridge'
import { Button, Panel, PanelHeader, PanelHeaderBack, View } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { REACT_APP_VK_SHVA_GROUP_ID, REACT_APP_VK_SHVA_ONLINE_GROUP_ID } from '../../shared/consts'
import './index.css'
import tableWidget from '@src/assets/data/tableWidget.json'

export const ViewModerator: FC<iModeratorViewProps> = ({ setActiveView, scoringInfo, fetchedUser, ...rest }) => {
  const [isShvaButtonLoading, setIsShvaButtonLoading] = useState<boolean>(false)
  const [isShvaOnlineButtonLoading, setIisShvaOnlineButtonLoading] = useState<boolean>(false)
  useEffect(() => {
    // console.log({tableWidget})
    console.log(new Date().toTimeString(), 'ViewModerator hook called')
    if (!fetchedUser?.isAppModerator) {
      setActiveView(eViewIds.Main)
    }
    console.log(new Date().toTimeString(), 'ViewModerator hook ended')
  }, [])

  const updateShvaWidget = async () => {
    setIsShvaButtonLoading(true)
    const shvaToken = await getGroupToken(REACT_APP_VK_SHVA_GROUP_ID)
    const res = await bridge.send('VKWebAppCallAPIMethod', {
      method: 'appWidgets.update',
      params: {
        type: 'table',
        code: JSON.stringify(tableWidget),
        v: '5.131',
        access_token: shvaToken,
      },
    })
    // console.log({ res })
    setIsShvaButtonLoading(false)
  }

  const updateShvaOnlineWidget = async () => {
    setIisShvaOnlineButtonLoading(true)
    const shvaOnlineToken = await getGroupToken(REACT_APP_VK_SHVA_ONLINE_GROUP_ID)
    setIisShvaOnlineButtonLoading(false)
  }
  return (
    <View activePanel={eViewIds.Moderator} {...rest}>
      <Panel id={ePanelIds.Moderator}>
        <PanelHeader separator={false} before={<PanelHeaderBack onClick={() => setActiveView(eViewIds.Main)} />}>
          Для модераторов
        </PanelHeader>
        <Button
          onClick={updateShvaWidget}
          align="center"
          appearance="positive"
          // stretched={true}
          mode="primary"
          loading={isShvaButtonLoading}
        >
          Установить виджет в группу ШВА
        </Button>
        <Button
          onClick={updateShvaOnlineWidget}
          align="center"
          appearance="positive"
          // stretched={true}
          mode="primary"
          loading={isShvaOnlineButtonLoading}
        >
          Установить виджет в группу онлайн ШВА
        </Button>
      </Panel>
    </View>
  )
}
