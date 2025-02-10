import {useState} from 'react'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoCloseCircleSharp} from 'react-icons/io5'
import './index.css'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)

  const onClickedMenuIcon = () => {
    setOpenMenu(prev => !prev)
  }

  const onClickCloseIcon = () => {
    setOpenMenu(prev => !prev)
  }

  return (
    <>
      <div className="HeaderContainer">
        <div className="HeaderSection1">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1734851396/Group_7399_v9hdrd.png"
              alt="website logo"
              className="HeaderImageLogo"
            />
          </Link>
          <ul className="HeaderUlText">
            <li>
              <Link to="/" className="HeaderHome">
                Home
              </Link>
            </li>
            <li className="PopularButton">
              <Link to="/popular" className="HeaderPopular">
                Popular
              </Link>
            </li>
          </ul>
        </div>
        <div className="HeaderSection2">
          <ul className="HeaderUl">
            <li>
              <Link to="/search" className="HeaderSearch">
                <button
                  type="button"
                  className="SearchButton"
                  data-testid="searchButton"
                >
                  <HiOutlineSearch color="#ffffff" size={20} />
                </button>
              </Link>
            </li>
            <li className="AccountSectionBig">
              <Link to="/account">
                <img
                  src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1734876955/Avatar_rthhrw.png"
                  alt="profile"
                />
              </Link>
            </li>
            <li onClick={onClickedMenuIcon} className="MenuIconButton">
              <img
                src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1735062483/add-to-queue_1_hlas7f.png"
                alt="MenuIcon"
              />
            </li>
          </ul>
        </div>
      </div>
      {openMenu && (
        <div className="HeaderSmallLinks">
          <ul className="HeaderUlSmall">
            <li>
              <Link to="/" className="HeaderHome">
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" className="HeaderPopular">
                Popular
              </Link>
            </li>
            <li>
              <Link to="/account" className="HeaderPopular">
                Account
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="SearchButton"
                onClick={onClickCloseIcon}
              >
                <IoCloseCircleSharp color="#ffffff" size={20} />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
export default Header
