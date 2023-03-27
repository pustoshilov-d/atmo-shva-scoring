import { REACT_APP_APP_ID, REACT_APP_VK_ATMOMY_GROUP_ID } from '@src/shared/consts'
import bridge from '@vkontakte/vk-bridge'

export const getAccessToken = async (): Promise<string> => {
  const { access_token } = await bridge.send('VKWebAppGetAuthToken', {
    app_id: REACT_APP_APP_ID,
    scope: '',
  })
  return access_token
}

// export const getGsheetsAPI = async (): Promise<string> => {
//   const { response: gheetsAPI } = await bridge.send('VKWebAppCallAPIMethod', {
//     method: 'execute.getGsheetsAPI',
//     params: { access_token: await getAccessToken(), v: '5.131' },
//   })
//   return gheetsAPI
// }

export const getPhotoUrls = async (ids: (number | undefined)[]): Promise<{ photo: string; id: number }[]> => {
  // console.log({ ids })
  let result = await bridge.send('VKWebAppCallAPIMethod', {
    method: 'users.get',
    params: {
      user_ids: ids.join(','),
      fields: 'photo_max,has_photo',
      v: '5.131',
      access_token: await getAccessToken(),
    },
  })
  let photos: (any | null)[] = result.response
  // console.log({ photos })
  photos = photos.map((item: { deactivated?: string; photo_max: string; has_photo: number; id: number }) => ({
    photo: item.deactivated || item.has_photo === 0 ? null : item.photo_max,
    id: item.id,
  }))
  // console.log({ photos })
  return photos
}

export const checkIsAtmoMember = async (id: number): Promise<boolean> => {
  const { response } = await bridge.send('VKWebAppCallAPIMethod', {
    method: 'groups.getMembers',
    params: {
      group_id: REACT_APP_VK_ATMOMY_GROUP_ID,
      v: '5.131',
      access_token: await getAccessToken(),
    },
  })
  const atmoMembers: Array<number> = response.items
  return atmoMembers.includes(id)
}


export const getGroupToken = async (groupId: number): Promise<string> => {
  const {access_token} = await bridge.send("VKWebAppGetCommunityToken", {
    app_id: REACT_APP_APP_ID,
    group_id: groupId,
    scope: 'app_widget'
  })
  return access_token
}