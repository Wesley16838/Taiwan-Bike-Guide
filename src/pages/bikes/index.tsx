import type { NextPage } from 'next'
import dynamic from "next/dynamic"
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import styles from '../../styles/pages/Home.module.scss'
import Layout from '../../components/layout/layout'
import Dropdowns from '../../components/dropdown/dropdown'
import Lists from '../../components/lists/lists'
import Switch from '../../components/switch/switch'
import { CityData, AreaData } from '../../constants'
import API from '../../api/transport'
import GEOAPI from '../../api/geocode'

const MyMap = dynamic(() => import('../../components/map/map'), { ssr:false })

const BikePage: NextPage = () => {
  console.log('BikePage')
  const [load, setLoad] = useState(false)
  const [bikes, setBikes] = useState({
    stations: [],
    available: [],
    center: []
  })

  const [search, setSearch] = useState({
    city: "",
    area: "",
  })
  const [option, setOption] = useState('rent')
  // todo list promise all available and all regoin station
  useEffect(()=> {
    const loadData = async() => {
        try{ 
            const city = search.city === 'Taoyuan' ? 'Taoyuan City' : search.city === 'NewTaipei' ? 'new taipei': search.city
            const result = await GEOAPI.get(encodeURI(`/${city} ${search.area}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`))
            const center = result.data.features[0].center

            Promise.all([
                API.get(encodeURI(`/Bike/Station/${search.city}?$spatialFilter=nearby(${result.data.features[0].center[1]},${result.data.features[0].center[0]},1000)&$format=JSON`)),
                API.get(encodeURI(`/Bike/Availability/${search.city}?$format=JSON`)),
            ])
            .then((data: any) => {
                setBikes({
                    center,
                    stations: data[0].data,
                    available: data[1].data
                })
            })
            .catch(err => {
                console.log('err,', err)
            })
        }catch(err){
            // Handle Error Message here
            console.log('err,', err)
        }
    }
    if(search.area !== '') loadData()
  }, [search])

  const handleOnChange = (name: string, value: string) => {
    if(name === 'area'){
        setSearch({...search, area: value})
    } else {
        setSearch({city: value, area: ''})
    }
  }

  let number = bikes.stations.length
  return (
    <Layout pageTitle={`自行車道地圖資訊整合網`} description={"全台自行車道報你知，自行車道和車站通通有！"} previewImage={"/images/preview_image.png"}>
        <div className={styles['main-block']}>
          <div className={styles['search-block']}>
            <p className={styles['search-result']}>收尋結果<span className={styles['search-result-count']}>{bikes.center.length === 0 ? "尚未收尋" : `共${number}筆`}</span></p>
            <div className={styles['dropdown-wrapper']}>
              <Dropdowns data={CityData} defaultLabel={CityData.defaultValue.label} defaultValue={CityData.defaultValue.value} onClick={(val: string) => handleOnChange('city', val)}/>
              <Dropdowns arrayData={AreaData.get(search.city) || []} defaultLabel={search.area === '' ? '選擇鄉鎮' : search.area} defaultValue={search.area === '' ? '' : search.area} onClick={(val: string) => handleOnChange('area', val)}/>
            </div>
            <Switch isToggle={option!=='rent'} onToggle={() => setOption(option==='rent' ? 'return' : 'rent')} data={['租借','停車']}/>
            <Lists data={bikes.available} stationData={bikes.stations} type="bike"/>
          </div>
          <MyMap option={option} data={bikes.available} stationData={bikes.stations} center={bikes.center} type="bike"/>
        </div>
    </Layout>
  )
}

export default BikePage
