import { request } from '@/plugins/request'

export const fetchArticle = params => {
  return request({
    method: 'GET',
    url: `/api/articles`,
    params
  })
}

export const fetchLike = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}

export const fetchUnLike = slug => {
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

export const fetchArticleInfo = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}

export const fetchPublishArticle = params => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data: params
  })
}

export const fetchArticleComment = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}

export const fetchArticlePublishComment = (slug, params) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data: params
  })
}

export const fetchArticleRemoveComment = (slug, commentId) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${commentId}`,
  })
}