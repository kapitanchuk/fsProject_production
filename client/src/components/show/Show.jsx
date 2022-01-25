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
                <div className='slider photos'>
                    <MySlider photos={family.photos} />
                </div>
                <div className='main-info'>
                    <div className='members'>
                        <div className='title title-show'>Members:</div>
                        <ul>
                            {family.members.map(member => <li key={member} className='member'>{member}</li>)}

                        </ul>
                    </div>
                    <div className='descriptions'>
                        <div className='title title-show'>Description:</div>
                        {family.description}
                    </div>
                    <div className="living_conditions">
                        <div className='title title-show'>Conditions that are provided:</div>
                        {family.living_conditions}
                    </div>
                    <div className='adress'>
                        <div className='title title-show'>Location: </div>
                        {family.adress}

                    </div>
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
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d35825.96584895187!2d11.585656865518873!3d48.13374962846394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1642517522714!5m2!1sru!2sua" width='100%' height="500px" style={{border:0}}  loading="lazy"></iframe> */}

                        <div>Also here should be a map and route to school</div>
                        </div>
                    
                </div>

            </div>

        </div>
    )
}

export default Show
