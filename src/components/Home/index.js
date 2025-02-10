import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import TrendingHome from '../TrendingHome'
import OriginalsHome from '../OriginalsHome'
import TopRatedHome from '../TopRatedHome'
import './index.css'

const apiStatusContent = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  isFailed: 'ISFAILED',
}

const Home = () => {
  const [isResponse, setResponse] = useState({
    state: apiStatusContent.initial,
    dataHead: null,
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
        dataHead: origin,
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

  const renderLoading = () => (
    <div className="loader-HomeSection1">
      <div className="loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={30} width={30} />
      </div>
    </div>
  )

  const renderIsFailed = () => (
    <div className="loader-HomeSection1">
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

  const renderSuccess = order => (
    <div className="HomeSection1">
      <h1 className="Home-main-heading">{isResponse.dataHead[order].title}</h1>
      <p className="Home-description">{isResponse.dataHead[order].overview}</p>
      <button type="button" className="PlayButton">
        Play
      </button>
    </div>
  )

  const order =
    isResponse.state === 'SUCCESS'
      ? Math.floor(Math.random() * isResponse.dataHead.length)
      : null

  const background =
    isResponse.state === 'SUCCESS'
      ? {
          backgroundImage: `url(${isResponse.dataHead[order].backdrop_path})`,
          backgroundSize: 'cover',
        }
      : null

  const renderResponse = () => {
    const {state} = isResponse
    switch (state) {
      case apiStatusContent.inProgress:
        return renderLoading()
      case apiStatusContent.isFailed:
        return renderIsFailed()
      case apiStatusContent.success:
        return renderSuccess(order)
      default:
        return null
    }
  }

  return (
    <div className="HomeContainer">
      <div className="HomeSection" style={background}>
        <Header />
        {renderResponse()}
      </div>
      <div className="HomeSectionBody">
        <div className="HomeBodySection1">
          <h1 className="HomeTrending">Trending Now</h1>
          <TrendingHome />
        </div>
        <div className="HomeBodySection1">
          <h1 className="HomeTrending">Top Rated</h1>
          <TopRatedHome />
        </div>
        <div className="HomeBodySection2">
          <h1 className="HomeOriginal">Originals</h1>
          <OriginalsHome />
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Home
