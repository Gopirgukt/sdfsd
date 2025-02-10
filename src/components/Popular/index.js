import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Pagination from '../Pagination'
import Footer from '../Footer'
import './index.css'

const apiStateContent = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  isFailed: 'ISfAILED',
}

const Popular = () => {
  const [isResponse, setResponse] = useState({
    state: apiStateContent.initial,
    data: 'initial',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(8)

  const getpopularDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
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
  }

  useEffect(() => {
    setResponse({state: apiStateContent.inProgress})
    getpopularDetails()
  }, [])

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  let currentPosts
  if (isResponse.data !== undefined && isResponse.data !== null) {
    currentPosts = isResponse.data.slice(firstPostIndex, lastPostIndex)
  }

  const onClicktryAgainPopular = () => {
    getpopularDetails()
  }

  const renderLoading = () => (
    <div className="popularBodyContainerfailed">
      <div className="popular-loader-container" data-testid="loader">
        <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
      </div>
    </div>
  )

  const renderIsFailed = () => (
    <div className="popularBodyContainerfailed">
      <div className="failedDiv">
        <img
          src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1735038588/alert-triangle_bljuev.png"
          alt="failure view"
        />
        <p className="paraFailure">Something went wrong. Please try again</p>
        <button
          type="button"
          className="tryButtonFailure"
          onClick={onClicktryAgainPopular}
        >
          Try Again
        </button>
      </div>
    </div>
  )

  const renderSuccess = () => (
    <>
      <div className="popularBodyContainer">
        {currentPosts.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <img
              className="popularimage"
              src={each.posterPath}
              alt={each.title}
              key={each.id}
            />
          </Link>
        ))}
      </div>
      <Pagination
        totalposts={isResponse.data.length}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  )

  const renderResponse = () => {
    const {state} = isResponse
    switch (state) {
      case apiStateContent.inProgress:
        return renderLoading()
      case apiStateContent.success:
        return renderSuccess()
      case apiStateContent.isFailed:
        return renderIsFailed()
      default:
        return null
    }
  }

  return (
    <div className="popularContainer">
      <Header />
      {renderResponse()}
      <Footer />
    </div>
  )
}
export default Popular
