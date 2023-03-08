/* eslint-disable no-loop-func */
const express = require('express')
const cors = require('cors')

const {getToken, getUserInfo, getClips} = require('./helpers/getTwitchClips.js')

const app = express()
const port = process.env.PORT || 4000

app.use(cors({origin: 'http://localhost:3000'}))

app.listen(port, () => console.log(`App listening on port ${port}`))

app.get('/gettest', (req, res) => {
  res.send({
    message: 'Express backend reached!'
  })
})

app.get('/getClips', (req, res) => {
  getToken()
    .then((token) => {
      getUserInfo(token)
        .then((broadcasterInfo) => {
          let clipList
          let hasPagination = true
          getClips(token, broadcasterInfo)
            .then((clips) => {
              clipList = (clips.data.data)
              while (hasPagination) {
                getClips(token, broadcasterInfo, clips.data.pagination.cursor)
                  .then((addtlClips) => {
                    clipList = clipList.concat(addtlClips.data.data)
                    if (Object.keys(addtlClips.data.pagination).length === 0) {
                      hasPagination = false
                    }
                  })
                  hasPagination = false
              }
              res.send({
                allClips: clipList
              })
            })
        })
    })
    // .then((userInfo) => {
    //   console.log('user info:', userInfo)
    //   res.send({
    //     userInfo: userInfo
    //   })
    // })
    // .catch(err => console.log('/getClips:', err.response.statusText))
})