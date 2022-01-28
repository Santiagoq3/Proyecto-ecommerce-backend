
import passport from "passport"
import fbStrategy from "passport-facebook"
import usuario from "./models/usuario.js";



const facebookStrategy = fbStrategy.Strategy;



const initializePassportConfig = ()=>{

    passport.use("facebook", new facebookStrategy({

        clientID: "660671848623637",
        clientSecret: "3b6cdd30e1396445b0630d949406c36f",
        callbackURL: "https://cc35-190-230-167-54.ngrok.io/api/auth/facebook/callback",
        profileFields: ["emails"]

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
//    await usuario.findById(id,done)
    console.log("este es el id",id)
    done(null,id)
})

export default initializePassportConfig;

