import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './RegisterForm.styles'
import { useFormik } from 'formik'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { initialValues, validationSchema } from './RegisterForm.data'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { screen } from '../../../utils/screenName'

export const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, formValue.email, formValue.password)
        navigation.navigate(screen.account.account as never) // No hacer esto xD Tipar correctamente
      } catch (error) {
        console.log(error)
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, inténtelo más tarde"
        })
      }
    }
  })

  const showHiddenPassword = () => setShowPassword(prevState => !showPassword)
  
  const handleSubmit = () => {
    formik.handleSubmit();
  }

  return (
    <View style={styles.content}>
      <Input 
        placeholder='Email' 
        containerStyle={styles.input}  
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon} />} 
        onChangeText={text => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input 
        placeholder='Contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={showPassword ? false : true} 
        onChangeText={text => formik.setFieldValue("password", text)}
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
        errorMessage={formik.errors.password}
      />
      <Input 
        placeholder='Repetir contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={showPassword ? false : true} 
        onChangeText={text => formik.setFieldValue("repeatPassword", text)}
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
        errorMessage={formik.errors.repeatPassword}
        />
      <Button 
        title="Unirse" 
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn} 
        onPress={handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}