import { ReactComponent as IconInstagram } from '@assets/img/iconInstagram.svg'
import { ReactComponent as IconTelegram } from '@assets/img/iconTelegram.svg'
import {
  REACT_APP_CURRENT_PEREPIS_YEAR,
  REACT_APP_EDIT_USER_INFO_LINK,
  REACT_APP_PEREPIS_LINK,
} from '@src/shared/consts'
import { iPerson } from '@src/shared/types'
import {
  Icon24ChevronDown,
  Icon24ChevronUp,
  Icon24LogoVkColor,
  Icon28EditCircleFillBlue,
  Icon28PhoneCircleFillGreen,
} from '@vkontakte/icons'
import { Avatar, Badge, IconButton, InfoRow, SimpleCell, Subhead, Text, Title } from '@vkontakte/vkui'
import { FC, useEffect, useState } from 'react'
import { getMedals } from '../Medals'
import './index.css'

const medalsHeader = getMedals(18, '0')
const medalsHistory = getMedals(14, '0')

export interface iPersonCardProps {
  person: iPerson
  isCardsCollapsed: boolean
  isCurPerson: boolean
}

export const PersonCard: FC<iPersonCardProps> = ({ person, isCardsCollapsed, isCurPerson }) => {
  const [isCardCollapsed, setIsCardCollapsed] = useState<boolean>(isCardsCollapsed)

  useEffect(() => {
    setIsCardCollapsed(isCardsCollapsed)
  }, [isCardsCollapsed])

  const cardHeader = (
    <div className="person-card__header">
      <Avatar className="person-card__header-photo" size={48} src={person.photo} />
      <div className="person-card__header-container">
        <div className="person-card__header-title">
          <Title level="3">{`${person.name_status ? person.name_status + ' ' : ''}${person.name} ${
            person.nickname ? person.nickname + ' ' : ''
          }${person.surname}${isCurPerson ? '⭐' : ''}`}</Title>
          {!person.is_po_active && person.perepis_year && (
            <Text className="person-card__header-inactive-year">{person.perepis_year}</Text>
          )}
          {!person.is_po_active && !person.perepis_year && (
            <Badge className="person-card__header-inactive-badge" mode="prominent" aria-label="Неактивный" />
          )}
        </div>
        <div className="person-card__header-subheader">
          {person.shva_year_s && (
            <Subhead className="person-card__header-subheader-shva"> {person.shva_year_s}</Subhead>
          )}
          <div
            className="person-card__header-subheader-medals"
            style={{ paddingLeft: person.shva_year_s ? '8px' : '0' }}
          >
            {person.achievements &&
              person.achievements.medals &&
              person.achievements.medals.map((i) => (
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
    return console.log('It works')
  }

  const cardContent = (
    <div className="person-card__content">
      <div className="person-card__content-info">
        {person.education_org && <InfoRow header="Место учёбы">{person.education_org}</InfoRow>}
        {person.is_student && person.education_spec && (
          <InfoRow header="Специальность">{person.education_spec}</InfoRow>
        )}
        {!person.is_student && person.work_spec && <InfoRow header="Должность">{person.work_spec}</InfoRow>}
        {person.all_years_smeny && <InfoRow header="">{`Отработано смен: ${person.all_years_smeny}`}</InfoRow>}
        {person.interests && person.interests.length > 0 && (
          <InfoRow header="Личные интересы">{person.interests.sort().join(', ')}</InfoRow>
        )}
        {person.prof_teach && person.prof_teach.length > 0 && (
          <InfoRow header="Может научить">{person.prof_teach.sort().join(', ')}</InfoRow>
        )}
        {person.prof_learn && person.prof_learn.length > 0 && (
          <InfoRow header="Хочет научиться">{person.prof_learn.sort().join(', ')}</InfoRow>
        )}
        {person.achievements && person.achievements.history && (
          <InfoRow header="Достижения">
            {person.achievements.history.map((i) => {
              const parts = i.split(' | ')
              const image = medalsHistory[parts[1] as keyof typeof medalsHistory]
              const ach = parts[0]
              return (
                <div className="person-card__content-info-history-cell" key={i}>
                  <>
                    {image}
                    <span style={{ paddingLeft: '4px' }}>{ach}</span>
                  </>
                </div>
              )
            })}
          </InfoRow>
        )}
      </div>

      <div className="person-card__content-buttons">
        {!isCurPerson ? (
          <IconButton
            onClick={(e) => handleClick(e)}
            href={`https://vk.com/call?id=${person.vk_id}`}
            target="_blank"
            rel="noopener"
          >
            <Icon28PhoneCircleFillGreen
              className="person-card__content-buttons-vkicons"
              style={{ width: '20', height: '20', padding: '2', margin: '12' }}
            />
          </IconButton>
        ) : (
          <IconButton
            onClick={(e) => handleClick(e)}
            href={
              person.perepis_year === REACT_APP_CURRENT_PEREPIS_YEAR
                ? REACT_APP_EDIT_USER_INFO_LINK
                : REACT_APP_PEREPIS_LINK
            }
            target="_blank"
            rel="noopener"
          >
            <Icon28EditCircleFillBlue
              className="person-card__content-buttons-vkicons"
              style={{ width: '20', height: '20', padding: '2', margin: '12' }}
            />
          </IconButton>
        )}
        <IconButton
          onClick={(e) => handleClick(e)}
          href={`https://vk.com/id${person.vk_id}`}
          target="_blank"
          rel="noopener"
          style={{ width: '24', height: '24', margin: '12' }} 
        >
          <Icon24LogoVkColor />
        </IconButton>
        {person.inst_link && (
          <IconButton onClick={(e) => handleClick(e)} href={person.inst_link} target="_blank" rel="noopener">
            <IconInstagram style={{ width: '24', height: '24', margin: '12' }} />
          </IconButton>
        )}
        {person.tg_link && (
          <IconButton onClick={(e) => handleClick(e)} href={person.tg_link} target="_blank" rel="noopener">
            <IconTelegram style={{ width: '24', height: '24', margin: '12' }} />
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
