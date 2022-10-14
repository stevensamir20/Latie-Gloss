import React from "react"
import { faFacebookF, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const FooterSocialData = [
    {
        title: 'Instagram',
        path: 'https://www.instagram.com',
        icon: <FontAwesomeIcon className="footer-social-list-icon" size="xl" icon={faInstagram} />
    },
    {
        title: 'Facebook',
        path: 'https://www.facebook.com',
        icon: <FontAwesomeIcon className="footer-social-list-icon" size="xl" icon={faFacebookF} />
    },
    {
        title: 'Tiktok',
        path: 'https://www.tiktok.com',
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