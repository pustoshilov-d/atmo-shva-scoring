import { ViewNotLoaded } from '@views/ViewNotLoaded'
import bridge, { AppearanceType, UserInfo } from '@vkontakte/vk-bridge'
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
import { REACT_APP_VK_ATMOMY_GROUP_ID } from './shared/consts'
import { eViewIds } from './shared/enums'
import { iPerson, iScoringMeta } from './shared/types'
import { ViewBlock } from './views/ViewBlock'
import { ViewLoader } from './views/ViewLoader'
import { ViewMain } from './views/ViewMain'

const App: FC = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('dark')
  const [activeView, setActiveView] = useState<eViewIds>(eViewIds.Loader)
  const [scoringMeta, setScoringMeta] = useState<iScoringMeta>({})

  const [fetchedUser, setFetchedUser] = useState<UserInfo>()
  const [persons, setPersons] = useState<iPerson[]>([])
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
      // try {
      let fetchedUserToSet = await bridge.send('VKWebAppGetUserInfo')
      let groupInfo = await bridge.send('VKWebAppGetGroupInfo', {
        group_id: REACT_APP_VK_ATMOMY_GROUP_ID,
      })
      console.log({ fetchedUserToSet }, { groupInfo })
      if (!fetchedUserToSet) {
        console.log(new Date().toTimeString(), 'Access denied 1')
        setActiveView(eViewIds.Block)
      } else {
        console.log(new Date().toTimeString(), 'Access allowed 1')

        let [personsToSet, scoringMetaToSet] = await getGsheetsData()
        console.log(new Date().toTimeString(), 'getGsheetsData processed')
        console.log({ personsToSet })

        if (
          !personsToSet ||
          (groupInfo.is_member === 1 && !personsToSet.map((p) => p.vk_id).includes(fetchedUserToSet.id))
        ) {
          console.log(new Date().toTimeString(), 'Access denied 2')
          setActiveView(eViewIds.Block)
        } else {
          console.log(new Date().toTimeString(), 'Access allowed 1')

          let curPersonToSet = personsToSet.filter((person) => person.vk_id === fetchedUserToSet?.id)[0] || undefined
          setFetchedUser(fetchedUserToSet)
          setCurPerson(curPersonToSet)
          setPersons(personsToSet)
          setScoringMeta(scoringMetaToSet)
          setActiveView(eViewIds.Main)
          console.log(new Date().toTimeString(), 'App.fetchData hook processed')
        }
      }
      // } catch (error) {
      //   console.log(new Date().toTimeString(), 'App.fetchData hook error', error)
      //   setActiveView(eViewIds.NotLoaded)
      // }
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
                  persons={persons}
                  curPerson={curPerson}
                  scoringMeta={scoringMeta}
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
