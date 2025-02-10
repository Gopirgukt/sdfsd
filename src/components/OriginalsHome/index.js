import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  isFailed: 'ISFAILED',
}

const OriginalsHome = () => {
  const [isResponse, setResponse] = useState({
    state: apiStatusContent.initial,
    dataOriganals: null,
  })

  const getOriginalsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const urlOrigin = 'https://apis.ccbp.in/movies-app/originals'
    const optionsOrigin = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(urlOrigin, optionsOrigin)
    if (response.ok) {
      const data = await response.json()
      const origin = data.results
      setResponse({
        state: apiStatusContent.success,
        dataOriganals: origin,
      })
    } else {
      setResponse({state: apiStatusContent.isFailed})
    }
  }

  useEffect(() => {
    setResponse({state: apiStatusContent.inProgress})
    getOriginalsData()
  }, [])

  const onClickedTryAgainTrending = () => {
    getOriginalsData()
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const renderLoading = () => (
    <div className="loader-HomeBodySection1">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={30} width={30} />
      </div>
    </div>
  )

  const renderIsFailed = () => (
    <div className="loader-HomeBodySection1">
      <div className="loader-container">
        <img
          src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1735038588/alert-triangle_bljuev.png"
          alt="failure view"
        />
        <p className="paraFailure">Something went wrong. Please try again</p>
        <button
          type="button"
          className="tryButtonFailure"
          onClick={onClickedTryAgainTrending}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderSuccess = () => (
    <Slider {...settings}>
      {isResponse.dataOriganals.map(eachLogo => (
        <div className="slick-item" key={eachLogo.id}>
          <Link to={`/movies/${eachLogo.id}`}>
            <img
              className="logo-image"
              src={eachLogo.poster_path}
              alt={eachLogo.title}
            />
          </Link>
        </div>
      ))}
    </Slider>
  )

  const renderResponse = () => {
    const {state} = isResponse
    switch (state) {
      case apiStatusContent.inProgress:
        return renderLoading()
      case apiStatusContent.isFailed:
        return renderIsFailed()
      case apiStatusContent.success:
        return renderSuccess()
      default:
        return null
    }
  }

  return <>{renderResponse()}</>
}

export default OriginalsHome
