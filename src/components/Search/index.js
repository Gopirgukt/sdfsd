import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {IoCloseCircleSharp} from 'react-icons/io5'
import Pagination from '../Pagination'
import './index.css'

const apiStateContent = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  isFailed: 'ISFAILED',
}

const Search = () => {
  const [searchValue, setSearchInput] = useState('')
  const [input, setInput] = useState('')
  const [openMenu, setOpenMenu] = useState(false)
  const [isResponse, setResponse] = useState({
    state: apiStateContent.initial,
    data: 'initial',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(15)

  useEffect(() => {
    setResponse({state: apiStateContent.initial})
  }, [])

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  let currentPosts
  if (isResponse.data !== undefined && isResponse.data !== null) {
    currentPosts = isResponse.data.slice(firstPostIndex, lastPostIndex)
  }

  const onClickedMenuIcon = () => {
    setOpenMenu(prev => !prev)
  }

  const onClickCloseIcon = () => {
    setOpenMenu(prev => !prev)
  }

  const onChangeinput = event => {
    setInput(event.target.value)
  }

  const onClickIcon = async () => {
    setResponse({state: apiStateContent.inProgress})
    if (input.length !== 0) {
      const jwtToken = Cookies.get('jwt_token')
      const url = `https://apis.ccbp.in/movies-app/movies-search?search=${input}`
      setSearchInput(input)
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      // console.log(response)
      if (response.ok) {
        const data = await response.json()
        // console.log(data)
        const updatedDetails = data.results.map(each => ({
          id: each.id,
          title: each.title,
          posterPath: each.poster_path,
          backdropPath: each.backdrop_path,
        }))
        setResponse({state: apiStateContent.success, data: updatedDetails})
      } else {
        setResponse({state: apiStateContent.isFailed})
      }
    } else {
      setResponse({state: apiStateContent.success})
      setSearchInput('{Nothing}')
    }
  }

  const onClickedtryAgainSearch = () => {
    onClickIcon()
  }

  const renderInitial = () => <></>

  const renderLoading = () => (
    <div className="SearchBodyContainerLoading">
      <div className="Search-loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  const totalpostsLength = () => {
    if (
      isResponse.data === null ||
      isResponse.data === undefined ||
      isResponse.data.length === 0
    ) {
      return 1
    }
    return isResponse.data.length
  }

  const renderSuccess = () => (
    <div className="SearchBodyContainer">
      {currentPosts === undefined ? (
        <div data-testid="searchButton">
          <img
            src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1735016398/Group_7394_kxn0ij.png"
            alt="no movies"
            className="failureLogo"
          />
          <p className="paranotFind">
            Your search for {searchValue} did not find any matches.
          </p>
        </div>
      ) : (
        <ul className="SearchBodyContainerul">
          {currentPosts.map(each => (
            <li className="Searchli" key={each.id}>
              <Link to={`/movies/${each.id}`}>
                <img
                  className="SearchedImage"
                  src={each.posterPath}
                  alt={each.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {currentPosts === undefined ? null : (
        <Pagination
          totalposts={totalpostsLength()}
          postPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  )

  const renderIsFailed = () => (
    <div className="SearchBodyContainerLoading">
      <div className="Search-loader-container" data-testid="searchButton">
        <img
          src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1735020169/Group_vtnqr1.png"
          alt="failure view"
          className="failureLogo"
        />
        <p className="paraFailure">Something went wrong. Please try again</p>
        <button
          type="button"
          className="tryButtonFailure"
          onClick={onClickedtryAgainSearch}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderStateResponse = () => {
    const {state} = isResponse
    switch (state) {
      case apiStateContent.inProgress:
        return renderLoading()
      case apiStateContent.initial:
        return renderInitial()
      case apiStateContent.isFailed:
        return renderIsFailed()
      case apiStateContent.success:
        return renderSuccess()
      default:
        return renderLoading()
    }
  }

  return (
    <div className="SearchContainer">
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
            <li className="SearchInputDiv">
              <input type="search" value={input} onChange={onChangeinput} />
              <button
                type="button"
                className="SearchButton"
                data-testid="searchButton"
                onClick={onClickIcon}
              >
                <HiOutlineSearch color="#ffffff" size={20} />
              </button>
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
      {renderStateResponse()}
    </div>
  )
}
export default Search
