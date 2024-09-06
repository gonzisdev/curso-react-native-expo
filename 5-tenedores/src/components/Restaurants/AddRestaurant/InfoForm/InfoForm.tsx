import { useState } from 'react'
import { View } from 'react-native'
import { Input } from '@rneui/base'
import { styles } from './InfoForm.styles'
import { FormikProps } from 'formik'
import { MapForm } from '../MapForm/MapForm'

type InfoFormProps = {
    formik: FormikProps<any>
}

export const InfoForm = ({formik}: InfoFormProps) => {

    const [showMap, setShowMap] = useState(false)

    const onOpenCloseMap = () => {
      setShowMap(prevState => !prevState)
    }

  return (
    <>
      <View style={styles.content}>
        <Input 
          placeholder='Nombre del restaurante'
          onChangeText={text => formik.setFieldValue('name', text)}
          errorMessage={formik.errors.name?.toString()}
        />
        <Input 
          placeholder='Dirección'
          rightIcon={{
              type: "material-community",
              name: "map-marker-radius",
              color: getColorIconMap(formik),
              onPress: onOpenCloseMap
          }}
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
      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  )
}

const getColorIconMap = (formik: FormikProps<any>) => {
  if(formik.errors.location) return "#ff0000"
  if(formik.values.location) return "#00a680"
  return "#c2c2c2"
}