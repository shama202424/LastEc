import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import RecentProduct from "../RecentProduct/RecentProduct";



export default function Home() {

  return (
    <>
    <div className="pt-20">
      <MainSlider/>
      <CategorySlider/>
            <RecentProduct/>
      <h1>Home</h1>
    </div>


    </>
  )
}
