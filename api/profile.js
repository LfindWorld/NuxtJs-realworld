import { request } from '@/plugins/request'

export const getProfile = slug => {
  return request({
    method: 'GET',
    url: `/api/profiles/${slug}`,
  })
}

// 关注用户
export const followUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

// 取关用户
export const UnfollowUser = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}