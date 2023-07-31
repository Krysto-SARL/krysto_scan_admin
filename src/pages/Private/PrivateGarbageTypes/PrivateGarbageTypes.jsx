import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Spinner from '../../../components/shared/spinner/Spinner'
import { BackButton } from '../../../components/shared/BackButton'

import { Link } from 'react-router-dom'
import Ticket from '../../../components/shared/ticket/Ticket'
import { getGarbageTypes } from '../../../features/garbageType/garbageTypeSlice'


function PrivateGarbagesTypes() {
  const { garbageTypes, isLoading, isError, message } = useSelector(
    (state) => state.garbageType,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    dispatch(getGarbageTypes())
  }, [dispatch, isError, message])

  console.log(garbageTypes)

  if (isLoading || !garbageTypes.data) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Une erreur est survenue, merci de réessayer.</h3>
  }

  return (
    <>
        
      <section className="headings">
        <BackButton url={'/private/home'} />
        <h1>Gestion des catégories de produits</h1>
      </section>
      
      <div className="ticket-headings">
        <div>Id</div>
        <div>Nom</div>
        <div>Couleur</div>
        <div>détails</div>
        <div>Créé le</div>
   
      </div>

      {garbageTypes.data.map((garbage) => (
        <Link key={garbage.id} to={`/private/produit-categorie/${garbage.id}`}>
          <Ticket>
        
            <div>{garbage.id}</div>

            <div>{garbage.name}</div>
            <div>{garbage.containerColor}</div>
            <div>{garbage.details}</div>
            <div>{new Date(garbage.createdAt).toLocaleDateString()}</div>

          </Ticket>
        </Link>
      ))}

      

    </>
  )
}

export default PrivateGarbagesTypes
