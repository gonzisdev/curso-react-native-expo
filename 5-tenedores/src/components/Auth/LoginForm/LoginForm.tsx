import { useState } from 'react'
import { View } from 'react-native'
import { Input, Icon, Button } from '@rneui/base'
import { styles } from './LoginForm.styles'

export const LoginForm = () => {
    
    const [showPassword, setShowPassword] = useState(false)

    const showHiddenPassword = () => setShowPassword(prevState => !showPassword)

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
        secureTextEntry={showPassword ? false : true} 
        rightIcon={<Icon type='material-community' name={showPassword ? 'eye-off-outline' : 'eye-outline'} iconStyle={styles.icon} onPress={showHiddenPassword} />} 
      />
      <Button title='Iniciar sesión' containerStyle={styles.btnContainer} buttonStyle={styles.btn} />
    </View>
  )
}