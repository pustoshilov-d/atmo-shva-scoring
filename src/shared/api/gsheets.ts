import AvatartPathArcticfox from '@assets/img/avatartArcticfox.svg'
import { sortPersons } from '@views/ViewMain/components/PanelPeople/helpers'
import { REACT_APP_GSHEETS_API_URL } from '../consts'

import { ePeopleSort, eTabbarItemIds } from '../enums'
import { iConfig, iGsheetsResDTO, iPerson, iPersonDTO, iScoringInfo } from '../types'
import apiService from './ApiService'
import { getPhotoUrls } from './vkbridge'

export const getGsheetsData = async (): Promise<[iPerson[], iScoringInfo, iConfig]> => {
  const gheetsAPI = REACT_APP_GSHEETS_API_URL || ""

  console.log(new Date().toTimeString(), 'getGsheetsData sent')
  const gsheetsData = await apiService.get<iGsheetsResDTO>(gheetsAPI)
  // console.log({ gsheetsData })
  console.log(new Date().toTimeString(), 'getGsheetsData recieved')

  const { online, offline, medalsMeta, persons, config } = gsheetsData
  let personsToSet = suitePersons(persons)
  personsToSet = sortPersons({ persons: personsToSet, ...ePeopleSort.SUM })
  personsToSet = await updatePhotos(personsToSet)

  let onlineToSet = { ...online, persons: personsToSet.filter((p) => p.format === eTabbarItemIds.Online) }
  onlineToSet = { ...onlineToSet, persons: onlineToSet.persons }
  let offlineToSet = { ...offline, persons: personsToSet.filter((p) => p.format === eTabbarItemIds.Offline) }
  offlineToSet = { ...offlineToSet, persons: offlineToSet.persons }

  personsToSet = offlineToSet.persons.concat(onlineToSet.persons)
  return [personsToSet, { online: onlineToSet, offline: offlineToSet, medalsMeta}, config]
}

const suitePersons = (persons: iPersonDTO[]): iPerson[] => {
  // let personsToSet = persons.map((item) => (_updateBoolean(item)))
  // console.log({ persons })
  let personsToSet: iPerson[] = persons.map((item) => {
    // console.log(item.medals)
    return {
      ...item,
      'medals': item.medals
        ? item.medals
            .toString()
            .replace('\n', ',')
            .split(',')
            .map((m) => m.trim())
        : [],
      'sex': item.sex || 'М',
    }
  })

  return personsToSet
}

export const updatePhotos = async (localPersons: iPerson[]): Promise<iPerson[]> => {
  const photos = await getPhotoUrls(localPersons.map((p) => p.vk_id))
  const personsToSet = localPersons.map((person) => ({
    ...person,
    'photo': photos.find((i) => i.id === person.vk_id)?.photo || AvatartPathArcticfox,
  }))
  return personsToSet
}
