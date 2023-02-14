import { REACT_APP_APP_ID, REACT_APP_GSHEETS_API_URL } from '@src/shared/consts'
import bridge from '@vkontakte/vk-bridge'
import AvatartPathArcticfox from '@assets/img/avatartArcticfox.svg'
import { iGsheetsResDTO, iPersonDTO, iPerson, iScoringMeta } from '../types'
import apiService from './ApiService'


const url = REACT_APP_GSHEETS_API_URL || ""

export const getGsheetsData = async (): Promise<[iPerson[], iScoringMeta]> => {
  console.log(new Date().toTimeString(), 'getGsheetsData sent')
  console.log(url)
  const gsheetsData = await apiService.get<iGsheetsResDTO>(url)
  console.log(new Date().toTimeString(), 'getGsheetsData recieved')
  let persons = suitePersons(gsheetsData.scoring)
  persons = await updatePhotos(persons)
  return [persons, gsheetsData.scoring_meta]
}

export const suitePersons = (persons: iPersonDTO[]): iPerson[] => {
  // let personsToSet = persons.map((item) => (_updateBoolean(item)))
  let personsToSet: iPerson[] = persons.map((item) => ({
    ...item,
    "medals": item.medals ? item.medals.split(",").map(m=>m.trim()) : [],
    "excluded": item.excluded?.toLowerCase().trim() === "да"
    // 'is_student': JSON.parse(item.is_student.toLowerCase()),
    // 'is_po_active': JSON.parse(item.is_po_active.toLowerCase()),
    // 'sex': item.sex === 'м' ? 'м' : 'ж',
  }))

  return personsToSet
}

export const getPhotoUrls = async (ids: (number | undefined)[]): Promise<{ photo: string; id: number }[]> => {
  const { access_token } = await bridge.send('VKWebAppGetAuthToken', {
    app_id: REACT_APP_APP_ID,
    scope: '',
  })
  console.log({ access_token })
  let result = await bridge.send('VKWebAppCallAPIMethod', {
    method: 'users.get',
    params: {
      user_ids: ids.join(','),
      fields: 'photo_max,has_photo',
      v: '5.131',
      access_token: access_token,
    },
  })
  let photos: (any | null)[] = result.response
  console.log({ photos })
  photos = photos.map((item: { deactivated?: string; photo_max: string; has_photo: number; id: number }) => ({
    photo: item.deactivated || item.has_photo === 0 ? null : item.photo_max,
    id: item.id,
  }))
  console.log({ photos })
  return photos
}

export const updatePhotos = async (localPersons: iPerson[]): Promise<iPerson[]> => {
  const photos = await getPhotoUrls(localPersons.map((p) => p.vk_id))
  const personsToSet = localPersons.map((person) => ({
    ...person,
    'photo': photos.find((i) => i.id === person.vk_id)?.photo || AvatartPathArcticfox,
  }))
  return personsToSet
}
