import { Router } from 'express'
import passport from 'passport'
import '../strategies/magic-link.mjs'

const router = Router()

router.get('/', (req, res) => {
  console.log('The main auth page!')
})

// Sending email requests and getting status messages
router.post(
  '/login/email',
  passport.authenticate('magiclink', {
    action: 'requestToken',
    failureMessage: 'Email Not Sent',
  }),
  (req, res) => {
    res.send({ msg: 'Email sent!' })
  }
)

// verifying link send by email

router.get(
  '/login/email/verify',
  passport.authenticate('magiclink', {
    successReturnToOrRedirect: 'http://localhost:5173/',
    failureMessage: 'Token Invalid',
  })
)

// Get Login status
router.get('/login/status', (req, res) => {
  //console.log(req.headers)
  req.user ? res.send(req.user) : res.send({ error: 'You are not logged in 2!' })
})

//logout
router.post('/logout', function (req, res, next) {
 
  req.logout(function (err) {
    if (err) {
      return res.send({ error: err })
    }
    return res.send({ msg: 'Logged out!' })
  })
})
export default router
