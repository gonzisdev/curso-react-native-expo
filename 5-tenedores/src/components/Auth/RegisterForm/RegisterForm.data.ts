import * as Yup from "yup"

export const initialValues = () => {
    return {
        email: '',
        password: '',
        repeatPassword: ''
    }
}

export const validationSchema = () => {
    return Yup.object({
        email: Yup.string()
            .email("El email no es válido")
            .required("El email es obligatorio"),
        password: Yup.string()
            .required("La contraseña es obligatoria"),
        repeatPassword: Yup.string()
            .required("La contraseña es obligatoria")
            .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
    })
}
