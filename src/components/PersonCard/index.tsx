import { iPerson, iScoringMeta } from '@src/shared/types'
import { Icon24ChevronDown, Icon24ChevronUp, Icon24LogoVkColor } from '@vkontakte/icons'
import { Avatar, Badge, IconButton, InfoRow, SimpleCell, Subhead, Title } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { getMedals } from '../Medals'
import './index.css'

const medalsHeader = getMedals(18, '0')

export interface iPersonCardProps {
  person: iPerson
  isCardsCollapsed: boolean
  isCurPerson: boolean
  scoringMeta: iScoringMeta
}

export const PersonCard: FC<iPersonCardProps> = ({ person, isCardsCollapsed, isCurPerson, scoringMeta }) => {
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(isCardsCollapsed)

  useEffect(() => {
    setIsCardCollapsed(isCardsCollapsed)
  }, [isCardsCollapsed])

  const cardHeader = (
    <div className="person-card__header">
      <Avatar className="person-card__header-photo" size={48} src={person.photo} />
      <div className="person-card__header-container">
        <div className="person-card__header-title">
          <Title level="3">{`${person.name ? person.name + ' ' : ''}${person.surname ? person.surname : ''}${
            isCurPerson ? '⭐' : ''
          }`}</Title>
          {person.excluded && (
            <Badge className="person-card__header-inactive-badge" mode="prominent" aria-label="Исключён" />
          )}
        </div>
        <div className="person-card__header-subheader">
          <div className="person-card__header-subheader-medals" >
            {person.score_place && (
              <Subhead className="person-card__header-subheader-scoring">
                {person.score_place} место, {person.score_sum} баллов
              </Subhead>
            )}
            {person.medals &&
              person.medals.map((i) => (
                <div key={i}>
                  <>{medalsHeader[i as keyof typeof medalsHeader]}</>
                </div>
              ))}
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

  const excludedKeys = ['excluded', 'score_sum', 'score_place', 'medals', 'surname', 'name', 'vk_id', 'photo']
  const contentInfoKeys = Object.getOwnPropertyNames(person).filter((k) => !excludedKeys.includes(k))
  const contentInfo = contentInfoKeys.map((key) => {
    const value = person[key]
    const ru_name = scoringMeta[key]
    if (!value || !ru_name) {
      return
    }
    if (value.toString().length > 10) {
      return <InfoRow header={ru_name}>{value}</InfoRow>
    } else {
      return <InfoRow header="">{`${ru_name}: ${value}`}</InfoRow>
    }
  })

  const cardContent = (
    <div className="person-card__content">
      <div className="person-card__content-info">{contentInfo}</div>
      <div className="person-card__content-buttons">
        {person.vk_id && (
          <IconButton
            onClick={(e) => handleClick(e)}
            href={`https://vk.com/id${person.vk_id}`}
            target="_blank"
            rel="noopener"
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
