import Topbar from './topbar';
import Header from './header';
import Footer from './footer';

export default function Layout({ menuLinks, children, footerLinks }) {
  return (
    <>
      <Topbar/>
      <Header menuLinks={menuLinks}/>
      {children}
      <Footer footerLinks={footerLinks}/>
    </>
  )
}
