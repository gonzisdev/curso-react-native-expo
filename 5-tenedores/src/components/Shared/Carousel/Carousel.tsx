import { View } from 'react-native'
import CarouselSnap from "react-native-snap-carousel"
import { Image } from '@rneui/base'
import { styles } from './Carousel.styles'

type CarouselProps = {
    arrayImages: string[]
    height: number
    width: number
}

export const Carousel = ({arrayImages, width, height}: CarouselProps) => {

    const renderItem =  ({ item }: { item: string }) => (
        <Image source={{uri: item}} style={{height, width}}  />
    )

  return (
    <View style={styles.content}>
      <CarouselSnap 
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </View>
  )
}