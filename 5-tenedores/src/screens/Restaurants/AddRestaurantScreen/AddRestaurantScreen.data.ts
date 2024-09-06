import * as Yup from "yup"

export const initialValues = () => {
    return{
        name: "",
        address: "",
        phone: "",
        email: "",
        description: ""
    }
}

export const validationSchema = () => {
    return Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().email("Email no válido").required("Campo obligatorio"),
        email: Yup.string().required("Campo obligatorio"),
        description: Yup.string().required("Campo obligatorio"),
    })
}