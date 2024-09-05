import * as Yup from "yup"

export const initialValues = () => {
    return {
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    }
}

export const validationSchema = () => {
    return Yup.object({
        password: Yup.string()
            .required("La contraseña es obligatoria"),
        newPassword: Yup.string()
            .required("La nueva contraseña es obligatoria"),
        confirmNewPassword: Yup.string()
            .required("La nueva contraseña es obligatoria")
            .oneOf([Yup.ref("newPassword")], "Las contraseñas tienen que ser iguales")
    })
}
