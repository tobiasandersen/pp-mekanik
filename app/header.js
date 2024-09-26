'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const SECTIONS = {
  header: { se: 'Start', en: 'Start' },
  customers: { se: 'Uppdragsgivare', en: 'Customers' },
  'job-types': { se: 'Vad vi gör', en: 'What we do' },
  images: { se: 'Bilder', en: 'Images' },
  contact: { se: 'Kontakt/Om', en: 'Contact/About' },
}

export function Header({ lang, se }) {
  const [scrollTop, setScrollTop] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('header')

  useEffect(() => {
    function getActiveSection() {
      const scrollY = window.scrollY
      setScrollTop(scrollY)

      let closestSection = null
      let closestDistance = Infinity

      for (const id of Object.keys(SECTIONS)) {
        const el = document.getElementById(id)

        if (!el) {
          return
        }

        const sectionTop = el.offsetTop
        const distanceFromViewportTop = Math.abs(sectionTop - scrollY)

        // Check if the current section is closer to the top than the previously tracked one
        if (distanceFromViewportTop < closestDistance) {
          closestSection = id
          closestDistance = distanceFromViewportTop
        }
      }

      // Set the section closest to the top of the viewport as active
      if (closestSection) {
        setActiveSection(closestSection)
      }
    }

    const handleScroll = () => {
      window.requestAnimationFrame(getActiveSection)
    }

    window.addEventListener('scroll', handleScroll)
    getActiveSection()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={'Header' + (scrollTop > 20 ? ' is-scrolled' : '')}
      id='header'
    >
      <div className='wrap'>
        <h1 className='Header-logo'>
          <Link href='/'>PP Mekanik AB</Link>
        </h1>

        <button
          className='Menu-openButton'
          style={{ opacity: isOpen ? 0 : 1 }}
          onClick={() => {
            setIsOpen(true)
          }}
        >
          <svg
            className='Menu-hamburgerIcon'
            width='28px'
            height='20px'
            viewBox='0 0 28 20'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <path
                d='M0,1.0093689 C0,0.451909848 0.439813137,0 0.996534824,0 L27.0034652,0 C27.5538362,0 28,0.443353176 28,1.0093689 L28,2.9906311 C28,3.54809015 27.5601869,4 27.0034652,4 L0.996534824,4 C0.446163838,4 0,3.55664682 0,2.9906311 L0,1.0093689 Z M0,9.0093689 C0,8.45190985 0.439813137,8 0.996534824,8 L27.0034652,8 C27.5538362,8 28,8.44335318 28,9.0093689 L28,10.9906311 C28,11.5480902 27.5601869,12 27.0034652,12 L0.996534824,12 C0.446163838,12 0,11.5566468 0,10.9906311 L0,9.0093689 Z M0,17.0093689 C0,16.4519098 0.439813137,16 0.996534824,16 L27.0034652,16 C27.5538362,16 28,16.4433532 28,17.0093689 L28,18.9906311 C28,19.5480902 27.5601869,20 27.0034652,20 L0.996534824,20 C0.446163838,20 0,19.5566468 0,18.9906311 L0,17.0093689 Z'
                id='hamburger'
                fill='currentColor'
              />
            </g>
          </svg>
        </button>

        <div className={'Menu u-group' + (isOpen ? ' is-open' : '')}>
          <button
            type='button'
            className='Menu-closeButton'
            style={{ opacity: isOpen ? 1 : 0 }}
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Close
          </button>
          <nav>
            <ul className='Menu-list u-group'>
              {Object.entries(SECTIONS).map(([id, title]) => (
                <li key={id}>
                  <a
                    className={
                      'Menu-link' + (id === activeSection ? ' current' : '')
                    }
                    id={`link-${id}`}
                    href={`#${id}`}
                    onClick={(evt) => {
                      evt.preventDefault()
                      setIsOpen(false)
                      const header =
                        document.getElementById('header').offsetHeight
                      const element = document.getElementById(id).offsetTop
                      window.scrollTo({
                        top: id === 'header' ? 0 : element - header + 2,
                        behavior: 'smooth',
                      })
                    }}
                  >
                    {title[lang]}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  className='change-language-button'
                  href={se ? '/en' : '/'}
                >
                  <img
                    className='flag-icon'
                    src={`/img/svg/${se ? 'en' : 'se'}.svg`}
                  />
                  {se ? 'English' : 'Svenska'}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
