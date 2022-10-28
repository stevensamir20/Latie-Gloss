import React from "react"
import { faFacebookF, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const FooterSocialData = [
    {
        title: 'Instagram',
        path: 'https://instagram.com/latie_gloss?igshid=YmMyMTA2M2Y=',
        icon: <FontAwesomeIcon className="footer-social-list-icon" size="xl" icon={faInstagram} />
    },
    {
        title: 'Facebook',
        path: 'https://www.facebook.com/groups/128609392442462/?ref=share',
        icon: <FontAwesomeIcon className="footer-social-list-icon" size="xl" icon={faFacebookF} />
    },
    {
        title: 'Tiktok',
        path: 'https://www.tiktok.com/@latiegloss?_t=8Wsx5VGRDeP&_r=1',
        icon: <FontAwesomeIcon className="footer-social-list-icon" size="xl" icon={faTiktok} />
    }
]

export const FooterLinksData = [
    {
        title: 'HOME',
        path: '/',
        cName: 'footer-navigation-list-text'
    },
    {
        title: 'PRODUCTS',
        path: '/products',
        cName: 'footer-navigation-list-text'
    },
    {
        title: 'SHIPPING',
        path: '/shipping',
        cName: 'footer-navigation-list-text'
    },
    {
        title: 'ABOUT US',
        path: '/about',
        cName: 'footer-navigation-list-text'
    },
    {
        title: 'CONTACT US',
        path: '/contact',
        cName: 'footer-navigation-list-text'
    }
] 