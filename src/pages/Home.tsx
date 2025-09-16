import HeroSection from '@/components/modules/Home/HeroSection'
import Services from '@/components/modules/Home/Services'
import Banner from '../components/modules/Home/Banner';
import WhyChooseUs from '@/components/modules/Home/WhyChooseUs';
import Testimonials from '@/components/modules/Home/Testimonials';

function Home() {
  return (
    <div>
        <HeroSection/>
        <Services/>
        <WhyChooseUs/>
        <Testimonials/>
        <Banner/>
    </div>
  )
}

export default Home