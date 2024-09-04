import { useEffect } from "react"
import { AppNavigation } from "./src/navigation/AppNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { initFirebase } from "./src/utils/firebase"
import { LogBox } from "react-native"

LogBox.ignoreAllLogs()

export default function App() {
  useEffect(() => {
    initFirebase()
  }, [])
  return (
    <>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
    </>
  )
}

