import { request } from '@/plugins/request'

export const getArticle = params => {
  return request({
    method: 'GET',
    url: `/api/articles`,
    params
  })
}

export const like = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const UnLike = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}