import { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './LoginForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.data'

export const LoginForm = () => {
    
    const [showPassword, setShowPassword] = useState(false)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: (formValue) => {

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