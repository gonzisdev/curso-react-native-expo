import { AppNavigation } from "./src/navigation/AppNavigation"
import { NavigationContainer } from "@react-navigation/native"
import { initFirebase } from "./src/utils/firebase"
import { useEffect } from "react"

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

