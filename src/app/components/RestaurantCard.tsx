
import { Restaurant } from '../../types'
import Link from 'next/link'
import {DynamicFavoriteButton} from './FavoriteButton'
export default function RestaurantCard(restaurant: Restaurant) {

  return (
    <article key={restaurant.id} className="rounded-xl border border-gray-200 p-2" >
      <img
        alt={restaurant.name}
        className="mb-3 h-[350px] w-full object-cover border border-gray-200 rounded-md"
        src={restaurant.image}
      />
      <h2 className="inline-flex gap-2 text-lg font-bold">
        <Link href={`/${restaurant.id}`}>
          {restaurant.name}
        </Link>
        <small className="inline-flex gap-1">
          <span>⭐</span>
          <span>{restaurant.score}</span>
          <span className="font-normal opacity-75">({restaurant.ratings})</span>
        </small>
        <DynamicFavoriteButton restaurant={restaurant} />
      </h2>
      <p className="opacity-90">{restaurant.description}</p>
    </article>
  )
}
