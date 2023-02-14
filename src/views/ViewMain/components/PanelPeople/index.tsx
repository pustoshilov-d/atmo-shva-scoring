import { ReactComponent as IconCollapse } from '@assets/img/collapse.svg'
import { ReactComponent as IconExpand } from '@assets/img/expand.svg'
import {
  FixedLayout,
  Footer,
  Group,
  IconButton,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Search,
  Spacing,
  Spinner,
} from '@vkontakte/vkui'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { PersonCard } from '@components/PersonCard'
import { iPerson, iSort } from '@src/shared/types'
import {ePeopleSort} from '@src/shared/enums'
import '../../index.css'
import { iPeoplePanelProps } from '../types'
import { CHUNK_SIZE } from './consts'
import { searchPersons, shiftCurPerson, sortPersons } from './helpers'
import './index.css'

export const PanelPeople: FC<iPeoplePanelProps> = ({
  fetchedUser,
  persons,
  curPerson,
  setActivePanel,
  goHome,
  scoringMeta,
  ...rest
}) => {
  const [peopleSearch, setPeopleSearch] = useState<string>('')
  const [peopleSort, setPeopleSort] = useState<iSort | null>(ePeopleSort.SCORE_PLACE)
  const [isPeopleCardsCollapsed, setIsPeopleCardsCollapsed] = useState<boolean>(true)
  const [shownPersons, setShownPersons] = useState<iPerson[]>([])
  const [scrolledPersons, setScrolledPersons] = useState<iPerson[]>([])
  const [hasPersonsToScroll, setHasPersonsToScroll] = useState<boolean>(true)
  const [scrollChunkNum, setScrollChunkNum] = useState<number>(1)

  useEffect(() => {
    console.log(new Date().toTimeString(), 'fetchData hook called')
    console.log({ persons })

    let localShownPersons = persons
    if (peopleSort) {
      localShownPersons = sortPersons({ persons: localShownPersons, ...peopleSort })
    }
    if (peopleSearch !== '') {
      localShownPersons = searchPersons({ persons: localShownPersons, value: peopleSearch })
    }

    resetShownPersons(localShownPersons)
    console.log(new Date().toTimeString(), 'fetchData hook ended')
  }, [peopleSort, peopleSearch])

  const resetShownPersons = (localShownPersons = persons): void => {
    localShownPersons = shiftCurPerson({ persons: localShownPersons, curPerson: curPerson })
    setShownPersons(localShownPersons)
    resetScrolledPersons(localShownPersons)
  }

  const fetchDataToScroll = (
    localShownPersons: iPerson[] = shownPersons,
    localScrollChunkNum: number = scrollChunkNum
  ): void => {
    console.log(new Date().toTimeString(), 'fetchDataToScroll called')
    if (localScrollChunkNum * CHUNK_SIZE >= localShownPersons.length - 1) {
      setScrolledPersons(localShownPersons)
      setHasPersonsToScroll(false)
      console.log(localShownPersons)
    } else {
      const endIndex = localScrollChunkNum * CHUNK_SIZE
      setScrolledPersons(localShownPersons.slice(0, endIndex))
      setHasPersonsToScroll(true)
      console.log(localShownPersons.slice(0, endIndex))
    }
    setScrollChunkNum(localScrollChunkNum + 1)
    console.log(new Date().toTimeString(), 'fetchDataToScroll ended')
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value || ''
    setPeopleSearch(searchString)
  }

  const resetScrolledPersons = (localShownPersons: iPerson[] = shownPersons): void => {
    console.log('resetScrolledPersons called')
    window.scrollTo(0, 0)
    setScrollChunkNum(1)
    fetchDataToScroll(localShownPersons, 1)
  }

  const panelHeader = (
    <FixedLayout vertical="top">
      <PanelHeader separator={false} before={<PanelHeaderBack onClick={goHome} />}>
        Участники ШВА
      </PanelHeader>
      <div className="people-panel__header">
        <Search autoFocus className="people-panel__header-search" value={peopleSearch} onChange={onSearchChange} />
        <div className="people-panel__header-buttons">
          {isPeopleCardsCollapsed ? (
            <IconButton onClick={() => setIsPeopleCardsCollapsed(!isPeopleCardsCollapsed)}>
              <IconExpand className="people-panel__header-buttons-expand-svg" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setIsPeopleCardsCollapsed(!isPeopleCardsCollapsed)}>
              <IconCollapse className="people-panel__header-buttons-collapse-svg" />
            </IconButton>
          )}
        </div>
      </div>
    </FixedLayout>
  )

  const panelFooter = (
    <FixedLayout vertical="bottom">
      <Footer>
        {shownPersons && shownPersons.length > 0
          ? `${
              shownPersons.length % 10 === 1
                ? 'Найден ' + shownPersons.length.toString() + ' участник'
                : 'Найдено ' + shownPersons.length.toString() + ' участников'
            }`
          : 'Никого не найдено'}
      </Footer>
    </FixedLayout>
  )

  return (
    <Panel {...rest}>
      {panelHeader}
      <Spacing size={100} />
      <Group>
        {scrolledPersons && scrolledPersons.length > 0 && (
          <InfiniteScroll
            dataLength={scrolledPersons.length}
            next={fetchDataToScroll}
            hasMore={hasPersonsToScroll}
            loader={<Spinner size="small" style={{ margin: '20px 0' }} />}
          >
            {scrolledPersons.map((person, index) => (
              <PersonCard
                key={index}
                person={person}
                isCurPerson={person === curPerson}
                scoringMeta={scoringMeta}
                isCardsCollapsed={isPeopleCardsCollapsed}
              />
            ))}
          </InfiniteScroll>
        )}
      </Group>
      <Spacing size={30} />
      {panelFooter}
    </Panel>
  )
}
