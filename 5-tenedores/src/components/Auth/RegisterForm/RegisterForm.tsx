import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './RegisterForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.data'

export const RegisterForm = () => {

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      console.log('formulario')
    }
  })

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
        secureTextEntry={true} 
        rightIcon={<Icon type='material-community' name='eye-outline' iconStyle={styles.icon} />} 
        errorMessage={formik.errors.password}
      />
      <Input 
        placeholder='Repetir contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={true} 
        rightIcon={<Icon type='material-community' name='eye-outline' iconStyle={styles.icon} />} 
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