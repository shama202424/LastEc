import img1 from '../../assets/1.png'
import img2 from '../../assets/2.png'
import img3 from '../../assets/3.png'
import Slider from "react-slick";

export default function MainSlider() {


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    
  }

  return (
<>
<div className="row p-2">
<div className="w-3/4">
<Slider className="" {...settings}>

<img className='h-[400px] w-full' src={img2} alt="" />
<img className='h-[400px] w-full' src={img2} alt="" />
<img className='h-[400px] w-full' src={img2} alt="" />
</Slider>
</div>
<div className="w-1/4">
<img className='h-[200px] w-full' src={img1} alt="" />
<img className='h-[200px] w-full' src={img3} alt="" />
</div>
</div>



</>
  )
}
