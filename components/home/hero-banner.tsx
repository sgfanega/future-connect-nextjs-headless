import Image from 'next/image';
import heroBannerImage from '../../public/images/hero-banner.webp';

export default function HeroBanner({title, tagline}) {
  return (    
    <section className="home__hero-banner">
      <Image  
        className="hero-banner-image"
        src={heroBannerImage}
        alt="Picture of Student's back walking forward."
        quality={50}
        fill
        priority
      />
      <h1 className="display-1 hero-banner-title">{title}</h1>
      <p className="fs-4 hero-banner-text">{tagline}</p>
    </section>
  )
}