import { useState } from 'react'
import { View } from 'react-native'
import CarouselSnap, { Pagination } from "react-native-snap-carousel"
import { Image } from '@rneui/base'
import { styles } from './Carousel.styles'

type CarouselProps = {
    arrayImages: string[]
    height: number
    width: number
    hideDots?: boolean
}

export const Carousel = ({arrayImages, width, height, hideDots}: CarouselProps) => {

    const [activeDotIndex, setActiveDotIndex] = useState(0)

    const renderItem =  ({ item }: { item: string }) => (
        <Image source={{uri: item}} style={{height, width}}  />
    )

    const pagination = () => {
      return (
        <Pagination 
          dotsLength={arrayImages.length}
          activeDotIndex={activeDotIndex}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          containerStyle={styles.dotContainer}
          dotStyle={styles.dot}
        />
      )
    }

  return (
    <View style={styles.content}>
      <CarouselSnap 
        layout="default"
        data={arrayImages}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveDotIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  )
}