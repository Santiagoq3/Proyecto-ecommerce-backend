
import passport from "passport"
import fbStrategy from "passport-facebook"
import Usuario from "./models/usuario.js";


const facebookStrategy = fbStrategy.Strategy;



const initializePassportConfig = ()=>{

    passport.use("facebook", new facebookStrategy({

        clientID: "660671848623637",
        clientSecret: "3b6cdd30e1396445b0630d949406c36f",
        callbackURL: "https://2cad-190-230-167-54.ngrok.io/api/auth/facebook/callback",


    },async(accesToken,refreshToken, profile, done)=>{

        try {
            console.log(accesToken)
            console.log(profile)

            let user = await Usuario.findOne({correo: profile.email})
            console.log(user)
            done(null,user)
        } catch (error) {
            done(error)
        }

    } ))


}

passport.serializeUser((user,done)=>{
    done(null,user._id)
})


passport.deserializeUser(async(id,done)=>{
   await Usuario.findById(id,done)
})

export default initializePassportConfig;

