import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'
import { getVoluntaryDropPoints } from '../../../features/voluntaryDropPoint/voluntaryDropPointSlice'


function PrivateVoluntaryDropPoints() {
  const { voluntaryDropPoints, isLoading, isError, message } = useSelector(
    (state) => state.voluntaryDropPoint,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getVoluntaryDropPoints())
  }, [dispatch, isError, message])

  console.log(voluntaryDropPoints)

  if (isLoading || !voluntaryDropPoints.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des points d'apport volontaire</h1>
      </section>
    </>
  )
}

export default PrivateVoluntaryDropPoints
