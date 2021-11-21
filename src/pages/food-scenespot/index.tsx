import type { NextPage } from 'next'
import dynamic from "next/dynamic"
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie';
import styles from '../../styles/pages/Home.module.scss'
import Layout from '../../components/layout/layout'
import Dropdowns from '../../components/dropdown/dropdown'
import Switch from '../../components/switch/switch'
import Lists from '../../components/lists/lists'
import Modal from '../../components/modal/modal'
import { CityData, AreaData, postcal } from '../../constants'
import API from '../../api/transport'
import GEOAPI from '../../api/geocode'
import { useFood } from "../../context/foodProvider"

const MyMap = dynamic(() => import('../../components/map/map'), { ssr:false })

const FoodScenespotPage: NextPage = () => {
  console.log('FoodScenespotPage')
  const [load, setLoad] = useState(false)
  const [select, setSelected] = useState({
    name:'',
    address:'',
    time:'',
    phone:'',
    description:'',
    image:'',
    imageAlt:''
  })
  const [foods, setFoods] = useState({
    food:[],
    center: []
  })
  const [scenespots, setScenespot] = useState({
    scenespot:[],
    center: []
  })

  const [search, setSearch] = useState({
    city: "",
    area:"",
    option: "Restaurant"
  })
  
  const [isShow, setIsShow] = useState(false)

  // todo list could add filter for food and scene
  useEffect(()=> {
    const loadData = async() => {
        try{ 
           const city = search.city === 'Taoyuan' ? 'Taoyuan City' : search.city === 'NewTaipei' ? 'new taipei': search.city
            const result = await GEOAPI.get(encodeURI(`/${city} ${search.area}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`))
            const center = result.data.features[0].center
            
            API.get(encodeURI(`/Tourism/${search.option}/${search.city}?$spatialFilter=nearby(${center[1]},${center[0]},3000)&$format=JSON)`))
            .then((data: any) => {
                if(search.option === 'Restaurant'){
                    setFoods({food: data.data, center})
                } else {
                    setScenespot({scenespot: data.data, center})
                }
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
  }, [search.area, search.option])

  const handleOnChange = (name: string, value: string) => {
    if(name === 'city'){
      setSearch({...search, city: value, area: ''})
    } else {
      setSearch({...search, [name]: value})
    }
    setIsShow(false)
  }

  const handleOnListClick = (val: any) => {
    //search.option
    const selected: any = search.option === 'Restaurant' ? foods.food[val] : scenespots.scenespot[val];
    const name = selected.Name;
    const address = selected?.Address ? selected.Address : postcal.get(selected.ZipCode)
    const time = selected.OpenTime ? selected.OpenTime : "--"
    const phone = selected.Phone ? selected.Phone : "--"
    const description = selected.DescriptionDetail ? selected.DescriptionDetail : selected.Description
    const image = selected.Picture?.PictureUrl1 ? selected.Picture.PictureUrl1 : "/images/image_not_available.jpeg"
    const imageAlt = selected.Picture.PictureDescription1 === undefined ? "Picture" : selected.Picture.PictureDescription1
    setSelected({
      name,
      address,
      time,
      phone,
      description,
      image,
      imageAlt
    });
    setIsShow(true)
  }

  let number = search.option ==='Restaurant' ? foods.food.length : scenespots.scenespot.length
  return (
    <Layout pageTitle={`自行車道地圖資訊整合網`} description={"全台自行車道報你知，自行車道和車站通通有！"} previewImage={"/images/preview_image.png"}>
        <div className={styles['main-block']}>
          <div className={styles['search-block']}>
            <p className={styles['search-result']}>收尋結果<span className={styles['search-result-count']}>{search.city === '' ? "尚未收尋" : `共${number}筆`}</span></p>
            <div className={styles['dropdown-wrapper']}>
              <Dropdowns data={CityData} defaultLabel={CityData.defaultValue.label} defaultValue={CityData.defaultValue.value} onClick={(val: string) => handleOnChange('city', val)}/>
              <Dropdowns arrayData={AreaData.get(search.city) || []} defaultLabel={search.area === '' ? '選擇鄉鎮' : search.area} defaultValue={search.area === '' ? '' : search.area} onClick={(val: string) => handleOnChange('area', val)}/>             
            </div>
            <Switch isToggle={search.option !== 'Restaurant'} onToggle={() => setSearch({...search, option: search.option === 'Restaurant' ? 'ScenicSpot': 'Restaurant'})} data={['美食', '景點']}/>
            <Lists data={search.option==='Restaurant' ? foods.food : scenespots.scenespot } type="food" onClick={(val: any)=>handleOnListClick(val)}/>
          </div>
          <Modal select={select} onClick={setIsShow} isShow={isShow}/>
          <MyMap data={search.option==='Restaurant' ? foods.food : scenespots.scenespot } center={search.option==='Restaurant' ? foods.center : scenespots.center} type="food"/>
        </div>
    </Layout>
  )
}

export default FoodScenespotPage
