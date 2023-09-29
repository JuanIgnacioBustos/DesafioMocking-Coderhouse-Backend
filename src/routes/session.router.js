import { Router } from "express";
import passport from "passport";
import sessionController from "../controllers/session.controller.js";

const router = Router()

// local routes

router.post(
    '/register',
    passport.authenticate('register', {session: false, failureRedirect: 'registerFail'}),
    sessionController.register
)

router.get('/registerFail', sessionController.registerFail)

router.post(
    '/login',
    passport.authenticate('login', {session: false, failureRedirect: 'loginFail'}),
    sessionController.login
)

router.get('/loginFail', sessionController.loginFail)

router.post('/logout', sessionController.logout)

router.post('/resetPassword', sessionController.resetPassword)

// github routes

router.get(
    '/github',
    passport.authenticate('github', { scope: 'user:email', session: false}),
    sessionController.github
);

router.get(
    '/githubcallback',
    passport.authenticate('github', {failureRedirect: '/login', session: false}),
    sessionController.githubcallback
);

// current

router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    sessionController.current
);

export default router