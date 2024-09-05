import { View, Text } from 'react-native'
import { ListItem, Icon } from '@rneui/base'

export const AccountOptions = () => {

    const menuOptions = getMenuOptions()

  return (
    <View>
      {menuOptions.map((option, index) => (
        <ListItem key={index} bottomDivider onPress={option.onPress}>
            <Icon type={option.iconType} name={option.iconNameLeft} color={option.iconColorLeft} />
            <ListItem.Content>
                <ListItem.Title>{option.title}</ListItem.Title>
            </ListItem.Content>
            <Icon type={option.iconType} name={option.iconNameRight} color={option.iconColorRight} />
        </ListItem>
      ))}
    </View>
  )
}

const getMenuOptions= () => {
    return [
        {
            title: "Cambiar nombre y apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => console.log('cambiar nombre y apellido')
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => console.log('cambiar email')
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => console.log('cambiar contraseña')
        }
    ]
}