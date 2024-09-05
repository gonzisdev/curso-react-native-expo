import { View } from 'react-native'
import { Input, Button } from '@rneui/base'
import { styles } from './ChangeDisplayNameForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeDisplayNameForm.data'

type ChangeDisplayNameFormProps = {
    onClose: () => void
}

export const ChangeDisplayNameForm = ({onClose}: ChangeDisplayNameFormProps) => {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: (formValue) => {

        }
    })

    const handleSubmit = () => {
        formik.handleSubmit();
      }

  return (
    <View style={styles.content}>
      <Input 
        placeholder='Nombre y apellidos' 
        rightIcon={{type: "material-community", name:"account-circle-outline", color: "#c2c2c2"}} 
        onChange={text => formik.setFieldValue('displayName', text)}
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