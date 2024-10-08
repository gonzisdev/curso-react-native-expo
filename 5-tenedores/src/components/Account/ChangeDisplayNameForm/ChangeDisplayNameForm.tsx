import { View } from 'react-native'
import { Input, Button } from '@rneui/base'
import { styles } from './ChangeDisplayNameForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeDisplayNameForm.data'
import { getAuth, updateProfile } from 'firebase/auth'
import Toast from 'react-native-toast-message'

type ChangeDisplayNameFormProps = {
    onClose: () => void
    onReload: () => void
}

export const ChangeDisplayNameForm = ({onClose, onReload}: ChangeDisplayNameFormProps) => {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { displayName } = formValue
                const user = getAuth().currentUser
                if (user) {
                    await updateProfile(user, {displayName})
                    onReload()
                    onClose()
                }
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al cambiar el nombre y apellidos"
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
        placeholder='Nombre y apellidos' 
        rightIcon={{type: "material-community", name:"account-circle-outline", color: "#c2c2c2"}} 
        onChangeText={text => formik.setFieldValue('displayName', text)}
        errorMessage={formik.errors.displayName}
      />
      <Button 
        title="Cambiar nombre y apellidos" 
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn} 
        onPress={handleSubmit} 
        loading={formik.isSubmitting} 
      />
    </View>
  )
}