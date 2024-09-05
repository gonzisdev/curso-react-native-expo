import { View, Text } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './LoginForm.styles'

export const LoginForm = () => {
  return (
    <View style={styles.content}>
      <Input 
        placeholder='Email' 
        containerStyle={styles.input} 
        rightIcon={<Icon type='material-community' name='at' iconStyle={styles.icon}/>} 
      />
      <Input 
        placeholder='Contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={true} 
        rightIcon={<Icon type='material-community' name='eye-outline' iconStyle={styles.icon}/>} 
      />
      <Button title='Iniciar sesión' containerStyle={styles.btnContainer} buttonStyle={styles.btn} />
    </View>
  )
}