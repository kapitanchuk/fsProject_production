import React from "react";
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './MySlider.scss'

export default function MySlider({photos}){
    console.log(photos)
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay:true,
        // autoplaySpeed:8000
      };
    return(
        <Slider {...settings}>
            {photos.map(photo=><img className='photo' key={photo} src={photo}></img>)}
        </Slider>
    )
}