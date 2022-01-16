import moongose from "mongoose"

const {Schema,model} = moongose

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "el nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "el correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "la contrasela es obligatoria"]
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        emun: ["ADMIN_ROLE","USER_ROLE"],
        default: "ADMIN_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});



export default model('Usuario', usuarioSchema);