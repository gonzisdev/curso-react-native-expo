import { View } from 'react-native'
import { Input } from '@rneui/base'
import { styles } from './InfoForm.styles'
import { FormikProps } from 'formik'

type InfoFormProps = {
    formik: FormikProps<any>
}

export const InfoForm = ({formik}: InfoFormProps) => {
  return (
    <View style={styles.content}>
      <Input 
        placeholder='Nombre del restaurante'
        onChangeText={text => formik.setFieldValue('name', text)}
        errorMessage={formik.errors.name?.toString()}
      />
      <Input 
        placeholder='Dirección'
        onChangeText={text => formik.setFieldValue('address', text)}
        errorMessage={formik.errors.address?.toString()}
      />
      <Input 
        placeholder='Teléfono'
        onChangeText={text => formik.setFieldValue('phone', text)}
        errorMessage={formik.errors.phone?.toString()}
      />
      <Input 
        placeholder='Email'
        onChangeText={text => formik.setFieldValue('email', text)}
        errorMessage={formik.errors.email?.toString()}
      />
      <Input 
        placeholder='Descripción del restaurante'
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={text => formik.setFieldValue('description', text)}
        errorMessage={formik.errors.description?.toString()}
      />
    </View>
  )
}