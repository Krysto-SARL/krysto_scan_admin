import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { getEnseigne } from '../../../features/enseigne/enseigneSlice'


function PrivateEnseigne() {
  const { enseigne, isLoading, isError, message } = useSelector(
    (state) => state.enseigne,
  )
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getEnseigne(params.id))
  }, [dispatch, isError, message, params.id])

  console.log(enseigne.data)
  if (isLoading || !enseigne.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <section className="headings">
      <h1>{enseigne.data.name}</h1>
      <div className="container_img">
        <img
          src={`${process.env.REACT_APP_BASE_API_URL_IMAGE}${enseigne.data.photo}`}
          alt=""
        />
      </div>
    </section>
  )
}

export default PrivateEnseigne
