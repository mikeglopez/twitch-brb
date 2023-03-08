if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const axios = require('axios')
const qs = require('qs')

const getToken = () => {
  const secret = process.env.SECRET
  const data = {
    'client_id': 'ydikcpdwy0fhdh8ngrh6g1gprj7q8m',
    'client_secret': secret,
    'grant_type': 'client_credentials'
  }
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data),
    url: 'https://id.twitch.tv/oauth2/token'
  }

  return axios(options)
}

const getUserInfo = (token) => {
  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token.data.access_token}`,
      'Client-Id': 'ydikcpdwy0fhdh8ngrh6g1gprj7q8m'
    },
    url: 'https://api.twitch.tv/helix/users?login=maikohh'
  }
  return axios(options)
}

const getClips = (token, broadcasterInfo, pagination) => {
  let url = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterInfo.data.data[0].id}&first=100`

  if (pagination) {
    url += `&after=${pagination}`
  }

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token.data.access_token}`,
      'Client-Id': 'ydikcpdwy0fhdh8ngrh6g1gprj7q8m'
    },
    url
  }

  return axios(options)
}

module.exports = {getToken, getUserInfo, getClips}