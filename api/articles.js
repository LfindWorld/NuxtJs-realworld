import { request } from '@/plugins/request'

export const getAllArticle = params => {
  return request({
    method: 'GET',
    url: `/api/articles`,
    params
  })
}