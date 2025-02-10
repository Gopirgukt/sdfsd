import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import format from 'date-fns/format'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  isFailed: 'ISFAILED',
}

const MovieItemDetails = props => {
  const [isResponse, setResponse] = useState({
    state: apiStatusConstants.initial,
    data: null,
    similarMoviesList: null,
    spokenLanguagesList: null,
    genresList: null,
    error: null,
  })

  const getMovieDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedDetailsid = {
        id: data.movie_details.id,
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }
      const similarMovieDetails = data.movie_details.similar_movies.map(
        each => ({
          id: each.id,
          backdropPath: each.backdrop_path,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }),
      )
      const genresDetails = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))

      const spokenLanguagesDetails = data.movie_details.spoken_languages.map(
        each => ({
          id: each.id,
          englishName: each.english_name,
        }),
      )

      setResponse({
        state: apiStatusConstants.success,
        data: updatedDetailsid,
        similarMoviesList: similarMovieDetails,
        spokenLanguagesList: spokenLanguagesDetails,
        genresList: genresDetails,
      })
    } else {
      setResponse({state: apiStatusConstants.isFailed})
    }
  }

  useEffect(() => {
    setResponse({state: apiStatusConstants.inProgress})
    getMovieDetails()
  }, [])

  const renderLoadingView = () => (
    <div className="loader-moviesBody">
      <div data-testid="loader" className="loader">
        <Loader type="ThreeDots" height={50} weight={50} />
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="loader-moviesBody">
      <img
        src="https://res.cloudinary.com/dfgdjrtc1/image/upload/v1735038588/alert-triangle_bljuev.png"
        alt="failure view"
      />
      <p className="paraFailure">Something went wrong. Please try again</p>
      <button
        type="button"
        className="tryButtonFailure"
        onClick={getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  const renderHeadMovieSuccess = () => {
    const onRunTime = () => {
      const {runtime} = isResponse.data
      const hours = Math.floor(runtime / 60)
      const minutes = runtime - hours * 60
      const time = `${hours}h ${minutes}m`
      return time
    }
    return (
      <div className="MovieItemDetailsSection1">
        <h1 className="movieItem-Main-heading">{isResponse.data.title}</h1>
        <div className="movieItem-paraDiv">
          <p>{onRunTime()}</p>
          <p className="para2">{isResponse.adult ? 'adult' : 'U/A'}</p>
          <p>{format(new Date(isResponse.data.releaseDate), 'yyyy-MM-dd')}</p>
        </div>
        <p className="description">{isResponse.data.overview}</p>
        <button type="button" className="movieItemplayButton">
          Play
        </button>
      </div>
    )
  }

  const renderSuccessView = () => (
    <>
      <div className="MovieItemDetailsSection2">
        <div>
          <h1 className="setion2paraHead">genres</h1>
          {isResponse.genresList.map(each => (
            <p key={each.id} className="section2paratext">
              {each.name}
            </p>
          ))}
        </div>
        <div>
          <h1 className="setion2paraHead">Audio Available</h1>
          {isResponse.spokenLanguagesList.map(each => (
            <p key={each.id} className="section2paratext">
              {each.englishName}
            </p>
          ))}
        </div>
        <div>
          <h1 className="setion2paraHead">Rating Count</h1>
          <p className="section2paratext">{isResponse.data.voteCount}</p>
          <h1 className="setion2paraHead">Rating Average</h1>
          <p className="section2paratext">{isResponse.data.voteAverage}</p>
        </div>
        <div>
          <h1 className="setion2paraHead">Budget</h1>
          <p className="section2paratext">{isResponse.data.budget}</p>
          <h1 className="setion2paraHead">Release Date</h1>
          <p className="section2paratext">
            {format(new Date(isResponse.data.releaseDate), 'do MMM yyyy')}
          </p>
        </div>
      </div>
      <div className="MovieItemDetailsSection3">
        <h1 className="MoreLikeSecrtion3head">More like this</h1>
        <div className="MoreLikeThisContainer">
          {isResponse.similarMoviesList.map(each => (
            <img
              className="moreLikeImage"
              src={each.posterPath}
              alt={each.title}
              key={each.id}
            />
          ))}
        </div>
      </div>
    </>
  )

  const renderStatusDetails = () => {
    const {state} = isResponse
    switch (state) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.isFailed:
        return renderFailureView()
      default:
        return null
    }
  }

  const background =
    isResponse.state === 'SUCCESS'
      ? {
          backgroundImage: `url(${isResponse.data.backdropPath})`,
          backgroundSize: 'cover',
        }
      : null

  return (
    <div className="MovieItemDetailsContainer">
      <div className="MovieItemDetailsSection" style={background}>
        <Header />
        {isResponse.state === 'SUCCESS' ? renderHeadMovieSuccess() : null}
      </div>
      {renderStatusDetails()}
      <Footer />
    </div>
  )
}

export default MovieItemDetails
