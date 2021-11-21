import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import MapProvider from '../context/mapProvider'
import FoodProvider from '../context/foodProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FoodProvider>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </FoodProvider>
   
  )
}

export default MyApp
