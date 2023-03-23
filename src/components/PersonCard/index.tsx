import { iMedalsMeta, iPerson, iScoringMeta } from '@src/shared/types'
import { Icon24ChevronDown, Icon24ChevronUp, Icon24LogoVkColor } from '@vkontakte/icons'
import { Avatar, Badge, Counter, IconButton, InfoRow, SimpleCell, Subhead, Title } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { getMedals } from '../Medals'
import './index.css'

const medalsImages = getMedals(18, '0')

export interface iPersonCardProps {
  person: iPerson
  isCardsCollapsed: boolean
  isCurPerson: boolean
  scoringMeta: iScoringMeta
  medalsMeta: iMedalsMeta
}

export const PersonCard: FC<iPersonCardProps> = ({
  person,
  isCardsCollapsed,
  isCurPerson,
  scoringMeta,
  medalsMeta,
}) => {
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(isCardsCollapsed)

  useEffect(() => {
    setIsCardCollapsed(isCardsCollapsed)
  }, [isCardsCollapsed])

  const subheaderTitles = []
  if (person.badge) {
    subheaderTitles.push(`${person.badge} бейдж`)
  }
  if (person.team) {
    subheaderTitles.push(`${person.team} команда`)
  }
  if (person.sum || person.sum === 0) {
    let floor = Math.floor(person.sum) % 10
    let title = floor === 1 ? 'балл' : floor > 1 && floor < 5 ? 'балла' : 'баллов'
    subheaderTitles.push(`${person.sum} ${title}`)
  }
  // console.log({ person })

  const cardHeader = (
    <div className="person-card__header">
      <Avatar className="person-card__header-photo" size={48} src={person.photo}>
        {person.sum && person.sum !== 0 && (
          <Avatar.Badge background="stroke">
            <Counter size="s" mode={person.place <= 10 ? 'primary' : 'secondary'}>
              {person.place}
            </Counter>
          </Avatar.Badge>
        )}
      </Avatar>
      <div className="person-card__header-container">
        <div className="person-card__header-title">
          <Title level="3">{`${person.name ? person.name + ' ' : ''}${person.surname ? person.surname : ''}`}</Title>
          {isCurPerson && <Subhead className="person-card__header-title-star">⭐</Subhead>}
          {person.excluded && (
            <Badge className="person-card__header-inactive-badge" mode="prominent" aria-label="Исключён" />
          )}
        </div>
        <div className="person-card__header-subheader">
          <div className="person-card__header-subheader-medals">
            {subheaderTitles.length > 0 && (
              <Subhead className="person-card__header-subheader-scoring">{subheaderTitles.join(', ')}</Subhead>
            )}
            {/* {person.medals &&
              person.medals.map((i) => (
                <div key={i}>
                  <>{medalsHeader[i as keyof typeof medalsHeader]}</>
                </div>
              ))} */}
          </div>
        </div>
      </div>
      {isCardCollapsed ? (
        <Icon24ChevronDown className="person-card__header-expand-button" />
      ) : (
        <Icon24ChevronUp className="person-card__header-collapse-button" />
      )}
    </div>
  )

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  // const medalsExpand = (
  //   <>
  //     <InfoRow header="Достижения:">
  //     <div className="person-card__content-medals-list">
  //       {person.medals && person.medals.length > 0 && person.medals.map(medal => {
  //         if (!medalsMeta[medal] || !medalsHeader[medal]) {return}
  //         const {title_female, title_male, disable, descr } = medalsMeta[medal]
  //         const title = person.sex ==="Ж" ? title_female : title_male
  //         if (disable) { return }
  //         const image = medalsImages[medal]
  //         return (
  //           <>
  //             {image}
  //             <span style={{ paddingLeft: '4px' }}>{title} {descr}</span>
  //           </>
  //       )})}
  //     </div>
  //   </>
  // )

  const contentInfoKeys = Object.getOwnPropertyNames(person).filter((k) => scoringMeta[k] && scoringMeta[k].is_dynamic)
  // console.log({ contentInfoKeys })
  const contentInfo = (
    <>
      {contentInfoKeys
        .filter((key) => person[key] && scoringMeta[key].title_ru)
        .map((key) => {
          const value = person[key]
          const title_ru = scoringMeta[key].title_ru
          const max_score = scoringMeta[key].max_score
          const subLevel = key.split('_').length - 1

          if (value!.toString().length <= 10) {
            if (subLevel === 0) {
              return (
                <InfoRow key={key} header="">
                  <b>{`${title_ru}: ${value}${max_score ? ' из ' + max_score.toString() : ''}`}</b>
                </InfoRow>
              )
            } else {
              return (
                <InfoRow
                  key={key}
                  style={{ paddingLeft: `${(subLevel - 1) * 10}px` }}
                  className="infoRow-sub"
                  header=""
                >{`${subLevel > 1 ? '◦' : '•'} ${title_ru}: ${value}${
                  max_score ? ' из ' + max_score.toString() : ''
                }`}</InfoRow>
              )
            }
          }
          return (
            <InfoRow key={key} header={`${title_ru}:`}>
              {value}
            </InfoRow>
          )
        })}
    </>
  )

  const cardContent = (
    <div className="person-card__content">
      <div className="person-card__content-info">{contentInfo}</div>
      <div className="person-card__content-buttons">
        {person.vk_id && (
          <IconButton
            onClick={(e) => handleClick(e)}
            href={`https://vk.com/id${person.vk_id}`}
            target="_blank"
            rel="noreferrer"
            style={{ width: '24', height: '24', margin: '12' }}
          >
            <Icon24LogoVkColor />
          </IconButton>
        )}
      </div>
    </div>
  )

  return (
    <SimpleCell
      className="person-card"
      onClick={() => {
        setIsCardCollapsed(!isCardCollapsed)
      }}
    >
      {cardHeader}
      {!isCardCollapsed && cardContent}
    </SimpleCell>
  )
}
