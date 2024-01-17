import React from 'react'
import { Link } from 'react-router-dom'
import * as Scroll from "react-scroll"

const Navbar = () => {

  let LinkScroll = Scroll.Link

  return (
    <div className='flex justify-between px-[2%] sm:px-[5%] mt-[2rem]'>
      <Link to="/">
        Home
      </Link>
        <nav className='hidden sm:block'>
          <ul className='flex xl:gap-12 gap-5 transition-all ease-in-out visby'>
            <LinkScroll activeClass="active" to="mobile" spy={true} smooth={true} offset={-10} duration={500}>
              Get App
            </LinkScroll>

            <LinkScroll activeClass="active" to="about" spy={true} smooth={true} offset={50} duration={500}>
              About
            </LinkScroll>

            <LinkScroll activeClass="active" to="contact" spy={true} smooth={true} offset={50} duration={500}>
              Contact
            </LinkScroll>
          </ul>
        </nav>
    </div>
  )
}

export default Navbar
