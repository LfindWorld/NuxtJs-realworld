import { request } from '@/plugins/request'

export const fetchArticle = params => {
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

export const fetchFollowArticle = params => {
  return request({
    method: 'GET',
    url: `/api/articles/feed`,
    params
  })
}

export const fetchTagsArticle = () => {
  return request({
    method: 'GET',
    url: `/api/tags`,
  })
}