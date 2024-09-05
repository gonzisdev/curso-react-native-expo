import { useState } from 'react'
import { View } from 'react-native'
import { Input, Button } from '@rneui/base'
import { styles } from './ChangePasswordForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangePasswordForm.data'
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import Toast from 'react-native-toast-message'

type ChangePasswordForm = {
    onClose: () => void
    onReload: () => void
}

export const ChangePasswordForm = ({onClose, onReload}: ChangePasswordForm) => {

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
                  await updatePassword(currentUser, formValue.newPassword)
                  onReload()
                  onClose()        
                }
            } catch (error) {
              console.log(error)
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar la contraseña"
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
        placeholder='Contraseña actual' 
        secureTextEntry={!showPassword}
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline" : "eye-outline", color: "#c2c2c2", onPress: onShowPassword}} 
        onChangeText={text => formik.setFieldValue('password', text)}
        errorMessage={formik.errors.password}
      />
      <Input 
        placeholder='Nueva contraseña' 
        secureTextEntry={!showPassword}
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline" : "eye-outline", color: "#c2c2c2", onPress: onShowPassword}} 
        onChangeText={text => formik.setFieldValue('newPassword', text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input 
        placeholder='Repetir nueva contraseña' 
        secureTextEntry={!showPassword}
        rightIcon={{type: "material-community", name: showPassword ? "eye-off-outline" : "eye-outline", color: "#c2c2c2", onPress: onShowPassword}} 
        onChangeText={text => formik.setFieldValue('confirmNewPassword', text)}
        errorMessage={formik.errors.confirmNewPassword}
      />
      <Button 
        title="Cambiar contraseña" 
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn} 
        onPress={handleSubmit} 
        loading={formik.isSubmitting} 
      />
    </View>
  )
}