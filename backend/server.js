const express = require('express')
const webpush = require('web-push')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

const fakeDatabase = []

const PUBLIC_VAPID = 'BDBU1Z3KJzjhs63siLHB3MXzFt_rR3GKKr6rklIclKWaw6UeCgm9Qy6D5jxu7bMeQIoWEYJdtGIjRJAzR29lbU0'
const PRIVATE_VAPID = 'FoUSTBJSQQCc3arQ5mxfp4TB4bN0B9OxPzkaS7flA4c'

app.use(cors())
app.use(bodyParser.json())

webpush.setVapidDetails('mailto:m3arij95@gmail.com', PUBLIC_VAPID, PRIVATE_VAPID)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})

app.post('/subscription', (req, res) => {
    const subscription = req.body
    fakeDatabase.push(subscription)
});

app.post('/sendNotification', (req, res) => {
    const notificationPayload = {
        notification: {
          title: 'New Notification',
          body: 'This is the body of the notification',
          icon: 'assets/label.png',
        },
    } 
    
    const promises = []
    fakeDatabase.forEach(subscription => {
    promises.push(
        webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload)
        ))

    })
    Promise.all(promises).then(() => {
        console.log('sent')
        res.status(200).json({message: 'Newsletter sent successfully.'})
    })
});

