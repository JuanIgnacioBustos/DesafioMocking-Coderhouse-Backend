import passport from "passport";
import jwt from "passport-jwt";
import config from "../config.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// Cuando usamos una ruta que no sea login, se debe utilizar el token

export const initializePassportJWT = () => {
    passport.use(
        "jwt",
        new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: config.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
            return done(null, jwtPayload);
            } catch (e) {
            return done(e);
            }
        }
        )
    );
};

const cookieExtractor = (req) => {
        let token = null;
        if (req && req.cookies) {
        token = req.cookies["authToken"];
        }
        return token
    };