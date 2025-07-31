import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';
import facebookIcon from '../../../public/images/icons/facebook-icon.png';
import instagramIcon from '../../../public/images/icons/instagram-icon.png';
import whatsappIcon from '../../../public/images/icons/whatsapp-icon.png';
import youtubeIcon from '../../../public/images/icons/youtube-icon.png';

const socialMidiaLinks = [
  { name: 'Facebook', url: 'https://www.facebook.com/iasddiadema', icon: facebookIcon },
  { name: 'Instagram', url: 'https://www.instagram.com/jovens.dacentral?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', icon: instagramIcon },
  { name: 'WhatsApp', url: 'https://api.whatsapp.com/send?phone=%2B5511996189403&context=AffTiS9xZ4l9VlMdiJ_UEkX5lb0N6txfqYb7nDwsxSs3Q_DVO1fBljCcA6OmjY6CMD0nnazjS2pgeNBpiVm1zUfS_PjqV3kFGsSHVDRu_2ysEzl4nFePBXFYW6IfC29_NiDUkrpi95xIX5o9n8U4e50qfg&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwY2xjawLo1xpleHRuA2FlbQIxMABicmlkETBlbDN3STdyQlVGN21UTG4wAR6q9yAritxjfrVLYH6xFzwAY8xFD_hEuzUfVQDK9e_6LfjMmyHUnAa5zyTEuQ_aem_mM-DP1zcmYNB0wvhuCjajQ', icon: whatsappIcon },
  { name: 'YouTube', url: 'https://youtube.com/@iasdcentraldediadema?si=F-1y1xnlSND7jb4r', icon: youtubeIcon }
]

const footerLinks = [{
    label: "Home",
    href: "/"
}, {
    label: "Sermões",
    href: "/sermons"
}, {
    label: "Eventos",
    href: "/events"
}]

const Footer = () => {
    return<footer className={styles.footer}>      
          <div className={styles.footerContent}>
              {socialMidiaLinks.map((link,) => (
              <Link key={link.name} href={link.url} className={styles.footerLink} target="_blank" rel="noopener noreferrer">
                <Image src={link.icon} alt={link.name} width={40} height={40} />
              </Link>
              ))}
          </div>

          <div className={styles.footerLinks}>
            <ul className={styles.footerContent}>
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <hr style={{ width: '100%', borderColor: 'var(--emphasis-color1)'}} />
          <div className={styles.footerTextContainer}>
            <p>Desenvolvido com ❤️ por <Link href={"https://dev-portfolio-nine-kohl.vercel.app/"} className={styles.footerLink}>Richard Carvalho</Link></p>
            <p className={styles.footerText}>© 2025 Jovens Central De Diadema.</p>
          </div>
    </footer>
}

export default Footer;