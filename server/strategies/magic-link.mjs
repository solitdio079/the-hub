import passport from 'passport'
import MagicLink from 'passport-magic-link'
import brevo from '@getbrevo/brevo'
import Users from '../models/users.mjs'
import {} from 'dotenv/config'

const MagicLinkStrategy = MagicLink.Strategy


// set the email parameters up
let defaultClient = brevo.ApiClient.instance

let apiKey = defaultClient.authentications['api-key']

let apiInstance = new brevo.TransactionalEmailsApi()

apiKey.apiKey = process.env.BREVO_API_KEY;

let sendSmtpEmail = new brevo.SendSmtpEmail()


passport.use(
  new MagicLinkStrategy(
    {
      secret: 'keyboard cat',
      userFields: ['email'],
      tokenField: 'token',
      verifyUserAfterToken: true,
    },
    async function send(user, token) {
          var link =
            'https://api.bysolitdio.net/auth/login/email/verify?token=' + token
      sendSmtpEmail.subject = 'Login to bySolitdio.net!'
      sendSmtpEmail.htmlContent =
        '<h3>Hello!</h3><p>Click the link below to finish signing in to bySolitdio.</p><p><a href="' +
        link +
        '">Sign in</a></p>'
      sendSmtpEmail.sender = {
        name: 'Solitdio',
        email: process.env.SENDER_EMAIL,
      }
      sendSmtpEmail.to = [
        { email: user.email },
      ]
      sendSmtpEmail.replyTo = {
        email: process.env.SENDER_EMAIL,
        name: 'Solitdio',
      }
    

      apiInstance.sendTransacEmail(sendSmtpEmail).then(
        function (data) {
          console.log(
            'API called successfully. Returned data: ' + JSON.stringify(data)
          )
        },
        function (error) {
          console.error(error)
        }
      )
       
      },
    async function verify(user) {
      try {
        const check = await Users.findOne({ email: user.email })
        if (!check) {
          const newUser = new Users({ email: user.email })
          await newUser.save()
          return new Promise(function (resolve, reject) {
            return resolve(newUser)
          })
        }
        return new Promise(function (resolve, reject) {
          return resolve(check)
        })
      } catch (error) {
        return new Promise(function (resolve, reject) {
          return reject(error.message)
        })
      }
    }
  )
)
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user)
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})
