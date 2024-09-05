import { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './LoginForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.data'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

export const LoginForm = () => {
    
    const [showPassword, setShowPassword] = useState(false)

    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                await signInWithEmailAndPassword(auth, formValue.email, formValue.password)
                navigation.navigate(screen.account.account as never) // No hacer esto xD Tipar correctamente
            } catch (error) {
                console.log(error)
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Usuario o contraseña incorrectos"
                })
                
            }
        }
    })

    const showHiddenPassword = () => setShowPassword(prevState => !showPassword)

    const handleSubmit = () => {
        formik.handleSubmit()
    }

  return (
    <View style={styles.content}>
      <Input 
        placeholder='Email' 
        containerStyle={styles.input} 
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>} 
        onChangeText={text => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input 
        placeholder='Contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={showPassword ? false : true} 
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
        onChangeText={text => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button 
        title='Iniciar sesión' 
        containerStyle={styles.btnContainer} buttonStyle={styles.btn}         
        onPress={handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}