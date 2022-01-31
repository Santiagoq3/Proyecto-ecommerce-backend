import passport from "passport"
import fbStrategy from "passport-facebook"
import usuario from "./models/usuario.js";

const facebookStrategy = fbStrategy.Strategy;

const initializePassportConfig = ()=>{

    passport.use("facebook", new facebookStrategy({

        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        callbackURL: process.env.FACEBOOK_CALLBACKURL,
        profileFields: [
            "id",
            "picture.type(large)",
            "emails",
            "name",
            "age_range",
            "displayName",
          ],

    },async(accesToken,refreshToken, profile, done)=>{

        try {
           
            let user = await usuario.find({correo: profile.emails[0].value}).clone()
            
            done(null,user)
        } catch (error) {
            done(error)
        }

    } ))

}

passport.serializeUser((user,done)=>{
    done(null,user)
})

passport.deserializeUser(async(id,done)=>{
    done(null,id)
})

export default initializePassportConfig;
