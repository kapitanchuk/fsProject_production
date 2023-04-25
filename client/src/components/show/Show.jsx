import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { $axios } from '../../http(axios)'
import MySlider from './MySlider'
import GoogleMapReact from 'google-map-react'
import './Show.scss'

const Show = () => {

    const params = useParams()

    const [family, setFamily] = useState({})

    useEffect(() => {
        // eslint-disable-line react-hooks/exhaustive-deps
        $axios.get(`/family/getFamily?id=${params.id}`).then(response => setFamily(response.data.family))
    }, [])


    if (!family._id) {
        return <div></div>
    }

    return (
        <div className='show_family'>


            <div className='show_family__inner'>
                <div className='title main_title'>Family in {family.district}</div>
                <div className='show_family__inner__container'>
                    {/* <div>Another div</div> */}

                    <div className='slider photos'>
                        <MySlider photos={family.photos} />
                    </div>


                    <div className='main-info'>
                        <div className='map'>
                            {/* <GoogleMapReact
                                
                                zoom={12}
                                center= {
                                    {lat: 10.99835602,
                                    lng: 77.01502627}
                                }
                                
                            // center={coordinates}
                            // defaultCenter={coordinates}
                            >

                            </GoogleMapReact> */}
                            <iframe className="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35825.96584895187!2d11.585656865518873!3d48.13374962846394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1642517522714!5m2!1sru!2sua" width='100%' style={{ border: 0 }} loading="lazy"></iframe>
                        </div>
                        <div className="properties"></div>
                        <div className='conditions'>
                            <div className="title-conditions">Conditions:</div>
                            <ul>
                                {family.conditions.wifi ? <li> Wifi available</li> : <div></div>}
                                {family.conditions.separate_bath ? <li> Separate bath</li> : <div></div>}
                                {family.conditions.food.half_board ? <li> We can provide breakfast or half-board nutrition</li> :
                                    family.conditions.food.only_breakfast ? <li>We can provide breakfasts</li> : <div></div>}
                                {family.conditions.kitchen ? <li> You can use our kitchen to cook</li> : <div></div>}
                            </ul>
                        </div>
                        <div className='property_type'>
                            <div className='title'>Property and accommodation type</div>
                            <div>{family.property_type}</div>
                            <div>{family.accommodation_type}</div>
                        </div>



                    </div>


                </div>

                <div className='description'>
                    <div className="title description-title">Description:</div>
                    {family.description}
                </div>
            </div>
        </div>


    )
}

export default Show
