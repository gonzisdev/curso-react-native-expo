import { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from '@rneui/base'
import { styles } from './ChangeEmailForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeEmailForm.data'
import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import Toast from 'react-native-toast-message'

type ChangeEmailFormProps = {
    onClose: () => void
    onReload: () => void
}

export const ChangeEmailForm = ({onClose, onReload}: ChangeEmailFormProps) => {

  const [showPassword, setShowPassword] = useState(false)

  const onShowPassword = () => setShowPassword(prevState => !prevState)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser
                if (currentUser && typeof currentUser.email === "string") {
                  const credentials = EmailAuthProvider.credential(
                    currentUser.email, formValue.password
                  )
                  reauthenticateWithCredential(currentUser, credentials)
                  await updateEmail(currentUser, formValue.email)
                  onReload()
                  onClose()        
                }
            } catch (error) {
              console.log(error)
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el email"
                })
            }
        }
    })

    const handleSubmit = () => {
        formik.handleSubmit()
      }

  return (
    <View style={styles.content}>
      <Input 
        placeholder='Email' 
        rightIcon={{type: "material-community", name:"at", color: "#c2c2c2"}} 
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email}
      />
      <Input 
        placeholder='Contraseña' 
        secureTextEntry={!showPassword}
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline" : "eye-outline", color: "#c2c2c2", onPress: onShowPassword}} 
        onChangeText={text => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Button 
        title="Cambiar email" 
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn} 
        onPress={handleSubmit} 
        loading={formik.isSubmitting} 
      />
    </View>
  )
}