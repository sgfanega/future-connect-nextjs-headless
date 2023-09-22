import { getFrontPageContent } from '../lib/api';
import HeroBanner from '../components/home/hero-banner';
import WhatWeDo from '../components/home/what-we-do';
import Services from '../components/home/services';
import ContactUs from '../components/contact-form';
import { getMenuLinks } from '../lib/api';
import Layout from '../components/layout';
import { FrontPageContent, MenuLinks } from '../types/types';

export default function Index({ 
  menuLinks, 
  frontPageContent, 
  footerLinks 
}) {
  return (
    <>
    <Layout menuLinks={menuLinks} footerLinks={footerLinks}>
      <HeroBanner title={frontPageContent.title} tagline={frontPageContent.tagline}/>
      <WhatWeDo whatWeDoDescription={frontPageContent.whatWeDoDescription} 
                missionStatement={frontPageContent.missionStatement}
                collegeFund={frontPageContent.collegeFund}
                collegesAndUniversities={frontPageContent.collegesAndUniversities}
                countries={frontPageContent.countries}/>
      <Services healthcareDescription={frontPageContent.healthcareDescription} intlAdmissionDescription={frontPageContent.intlAdmissionDescription}/>
      <ContactUs/>
    </Layout>
    </>
  )
}

export async function getStaticProps() {
  const menuLinks = await getMenuLinks(true);
  const footerLinks  = await getMenuLinks();
  const frontPageContent = await getFrontPageContent();

  return {
    props: { menuLinks, frontPageContent, footerLinks }
  }
}