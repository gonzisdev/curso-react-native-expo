import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './RegisterForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.data'
import { useState } from 'react'

export const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log('formulario')
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
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
        errorMessage={formik.errors.password}
      />
      <Input 
        placeholder='Repetir contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={showPassword ? false : true} 
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
        errorMessage={formik.errors.repeatPassword}
        />
      <Button 
        title="Unirse" 
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn} 
        onPress={handleSubmit}
      />
    </View>
  )
}