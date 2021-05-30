import { request } from '@/plugins/request'

export const getProfile = slug => {
  return request({
    method: 'GET',
    url: `/api/profiles/${slug}`,
  })
}