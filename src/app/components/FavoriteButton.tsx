'use client'

import dynamic from "next/dynamic";
import { Restaurant } from '../../types';
import { useState } from "react";

function FavoriteButton({restaurant}: {
  restaurant: Restaurant
}) {
  
    const isFavoriteLocal = window.localStorage.getItem('favorites')?.includes(restaurant.id);

    const [isFavorite, setIsFavorite] = useState(isFavoriteLocal);

    function handleFavorite() {
        const favorites = window.localStorage.getItem('favorites')?.split(',') || [];
        const index = favorites.indexOf(restaurant.id);
    
        if (index === -1) {
        favorites.push(restaurant.id);
        } else {
        favorites.splice(index, 1);
        }
    
        window.localStorage.setItem('favorites', favorites.join(','));
        setIsFavorite(!isFavorite);
    }


  return (
    <button type="button" 
    className={`text-red-500 text-xl ${isFavorite ? 'opacity-100' : 'opacity-20'}`} 
    onClick={handleFavorite}>♥</button>
  )
}

// Creamos un componente dinámico para que no se renderice en el servidor
export const DynamicFavoriteButton = dynamic(async () => FavoriteButton, { ssr: false });