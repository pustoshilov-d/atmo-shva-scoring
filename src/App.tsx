import { ViewNotLoaded } from '@views/ViewNotLoaded'
import bridge, { AppearanceType } from '@vkontakte/vk-bridge'
import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Root,
  SplitCol,
  SplitLayout,
  useAdaptivityConditionalRender,
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { FC, useEffect, useState } from 'react'
import { getGsheetsData } from './shared/api/gsheets'
import { checkIsAtmoMember } from './shared/api/vkbridge'
import { eViewIds } from './shared/enums'
import { ExtededUserInfo, iConfig, iPerson, iScoringInfo } from './shared/types'
import { ViewBlock } from './views/ViewBlock'
import { ViewLoader } from './views/ViewLoader'
import { ViewMain } from './views/ViewMain'

const App: FC = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('dark')
  const [activeView, setActiveView] = useState<eViewIds>(eViewIds.Loader)

  const [scoringInfo, setScoringInfo] = useState<iScoringInfo>()
  const [fetchedUser, setFetchedUser] = useState<ExtededUserInfo>()
  const [config, setConfig] = useState<iConfig>()
  const [curPerson, setCurPerson] = useState<iPerson>()

  const { sizeX } = useAdaptivityConditionalRender()

  useEffect(() => {
    bridge.subscribe((res) => {
      if (res.detail.type === 'VKWebAppUpdateConfig') {
        // TODO: where stand scheme
        // setAppearance(res.detail.data.scheme)
      }
    })

    async function fetchData() {
      console.log(new Date().toTimeString(), 'App.fetchData hook called')
      try {
        let fetchedUserToSet = {
          ...(await bridge.send('VKWebAppGetUserInfo')),
          isAtmoMember: false,
          isAppModerator: false,
          isShvaParticipant: false,
        }

        if (!fetchedUserToSet) {
          console.log(new Date().toTimeString(), 'Access denied 1')
          setActiveView(eViewIds.Block)
          return
        }
        console.log(new Date().toTimeString(), 'Access allowed 1')

        const [persons, scoringInfoToSet, configToSet] = await getGsheetsData()
        console.log(new Date().toTimeString(), 'getGsheetsData processed')
        // console.log({ scoringInfoToSet })

        const isShvaParticipant = persons.map((p) => p.vk_id).includes(fetchedUserToSet.id)
        const isAtmoMember = await checkIsAtmoMember(fetchedUserToSet.id)
        const isAppModerator = configToSet?.moderators.includes(fetchedUserToSet.id) || false
        fetchedUserToSet = { ...fetchedUserToSet, isShvaParticipant, isAtmoMember, isAppModerator }
        // console.log(fetchedUserToSet)

        if (!scoringInfoToSet || !(isAtmoMember || isShvaParticipant)) {
          console.log(new Date().toTimeString(), 'Access denied 2')
          setActiveView(eViewIds.Block)
          return
        }
        console.log(new Date().toTimeString(), 'Access allowed 1')

        let curPersonToSet = persons.filter((person) => person.vk_id === fetchedUserToSet?.id)[0] || undefined

        setConfig(configToSet)
        setFetchedUser(fetchedUserToSet)
        setCurPerson(curPersonToSet)
        setScoringInfo(scoringInfoToSet)
        setActiveView(eViewIds.Main)
        console.log(new Date().toTimeString(), 'App.fetchData hook processed')
      } catch (error) {
        console.log(new Date().toTimeString(), 'App.fetchData hook error', error)
        setActiveView(eViewIds.NotLoaded)
      }
    }

    fetchData()
  }, [])

  return (
    <ConfigProvider appearance={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <Root activeView={activeView}>
                <ViewBlock id={eViewIds.Block} />
                <ViewNotLoaded id={eViewIds.NotLoaded} />
                <ViewLoader id={eViewIds.Loader} />
                <ViewMain
                  id={eViewIds.Main}
                  fetchedUser={fetchedUser}
                  curPerson={curPerson}
                  scoringInfo={scoringInfo!}
                />
              </Root>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
