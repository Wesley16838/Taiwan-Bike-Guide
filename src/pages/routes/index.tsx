import type { NextPage } from 'next'
import dynamic from "next/dynamic"
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import styles from '../../styles/pages/Home.module.scss'
import Layout from '../../components/layout/layout'
import Dropdowns from '../../components/dropdown/dropdown'
import Lists from '../../components/lists/lists'
import { CityData, AreaData } from '../../constants'
import { availableBike, station } from '../../constants/mock-date'
import API from '../../api/transport'
import GEOAPI from '../../api/geocode'
import { useBike } from "../../context/bikeProvider";

const MyMap = dynamic(() => import('../../components/map/map'), { ssr:false })

const RoutePage: NextPage = () => {
  console.log('RoutePage')
  const [load, setLoad] = useState(false)
  const [routes, setRoutes] = useState({
    routes: [],
    center: []
  })

  const [search, setSearch] = useState({
    city: "",
  })
  
  // todo list promise all available and all regoin station
  useEffect(()=> {
    const loadData = async() => {
        const city = search.city === 'Taoyuan' ? 'Taoyuan City' : search.city === 'NewTaipei' ? 'new taipei': search.city
        try{ 
            const resultOne = await GEOAPI.get(encodeURI(`/${city}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`))
            const center = resultOne.data.features[0].center
            const resultTwo = await API.get(encodeURI(`/Cycling/Shape/${search.city}?$format=JSON`))
            setRoutes({
              center,
              routes: resultTwo.data
          })
        }catch(err){
            // Handle Error Message here
            console.log('err,', err)
        }
    }
    if(search.city !== '') loadData()
  }, [search])

  const handleOnChange = (name: string, value: string) => {
    setSearch({city: value})
  }

  let number = routes.routes.length

  return (
    <Layout pageTitle={`自行車道地圖資訊整合網`} description={"全台自行車道報你知，自行車道和車站通通有！"} previewImage={"/images/preview_image.png"}>
        <div className={styles['main-block']}>
          <div className={styles['search-block']}>
            <p className={styles['search-result']}>收尋結果<span className={styles['search-result-count']}>{search.city === '' ? "尚未收尋" : `共${number}筆`}</span></p>
            <div className={styles['dropdown-wrapper']}>
              <Dropdowns data={CityData} defaultLabel={CityData.defaultValue.label} defaultValue={CityData.defaultValue.value} onClick={(val: string) => handleOnChange('city', val)}/>
            </div>
            <Lists data={routes.routes} type="route"/>
          </div>
          <MyMap data={routes} center={routes.center} type="route"/>
        </div>
    </Layout>
  )
}

export default RoutePage;
