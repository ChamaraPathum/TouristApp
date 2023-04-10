import axios from "axios";

export const getPlaceData = async(bl_lat,bl_lng,tr_lat,tr_lng,type)=>{
    try {
      const {data :{data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
     {   params: {
            bl_latitude: bl_lat ? bl_lat : '6.862390698218086',
            tr_latitude: tr_lat ? tr_lat : '6.981286626403076',
            bl_longitude: bl_lng ? bl_lng : '79.8223257782813',
            tr_longitude: tr_lng ? tr_lng : '79.8900851565532',
            limit: '30',
            currency: 'USD',
            lunit: 'km',
            lang: 'en_US'
          },
          headers: {
            'X-RapidAPI-Key': '8674ff2c65msh35ea2d95a39f4bep193b6ajsn2473dd88b072',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
          }
        }
        )
        return data;
    } catch (error) {
        return null
        
    }
}