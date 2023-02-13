import { eModalIds, ePanelIds } from '@shared/enums'
import useDidMountEffect from '@shared/hooks/useDidMountEffect'

import { ReactComponent as IconCollapse } from '@assets/img/collapse.svg'
import { ReactComponent as IconExpand } from '@assets/img/expand.svg'
import { ReactComponent as IconFilter } from '@assets/img/filter.svg'
import { ReactComponent as IconUnfilter } from '@assets/img/filter_x.svg'
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

import '../../index.css'
import { CHUNK_SIZE } from './consts'
import { filterPersons, searchPersons, shiftCurPerson, sortPersons } from './helpers'
import './index.css'
import { iPerson } from '@src/shared/types'
import { iPeoplePanelProps } from '../types'
import { PersonCard } from '@components/PersonCard'

export const PanelPeople: FC<iPeoplePanelProps> = ({
  fetchedUser,
  persons,
  curPerson,
  setPeopleSort,
  peopleSort,
  setPeopleFilter,
  peopleFilter,
  setActivePanel,
  setActiveModal,
  peopleSearch,
  setPeopleSearch,
  isPeopleCardsCollapsed,
  setIsPeopleCardsCollapsed,
  goHome,
  ...rest
}) => {
  
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
    if (peopleFilter) {
      localShownPersons = filterPersons({ persons: localShownPersons, ...peopleFilter })
    }
    if (peopleSearch !== '') {
      localShownPersons = searchPersons({ persons: localShownPersons, value: peopleSearch })
    }

    resetShownPersons(localShownPersons)
    console.log(new Date().toTimeString(), 'fetchData hook ended')
  }, [peopleSort, peopleFilter, peopleSearch])

  
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

  const onSearchFocus = (): void => {
    setPeopleFilter(null)
  }

  const panelHeader = (
    <FixedLayout vertical="top">
      <PanelHeader separator={false} before={<PanelHeaderBack onClick={goHome} />}>
        Вожатые
      </PanelHeader>
      <div className="people-panel__header">
        <Search
          autoFocus
          onFocus={onSearchFocus}
          className="people-panel__header-search"
          value={peopleSearch}
          onChange={onSearchChange}
        />
        <div className="people-panel__header-buttons">
          {peopleFilter ? (
            <IconButton onClick={() => setPeopleFilter(null)}>
              <IconUnfilter className="people-panel__header-buttons-unfilter-svg" />
            </IconButton>
          ) : (
            <IconButton onClick={() => setActiveModal(eModalIds.PeopleFilters)}>
              <IconFilter className="people-panel__header-buttons-filter-svg" />
            </IconButton>
          )}

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
                ? 'Найден ' + shownPersons.length.toString() + ' вожатый'
                : 'Найдено ' + shownPersons.length.toString() + ' вожатых'
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
            {scrolledPersons.map((person) => (
              <PersonCard
                key={person.vk_id}
                person={person}
                isCurPerson={person === curPerson}
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
