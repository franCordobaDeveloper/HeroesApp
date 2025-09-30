import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    // State
    favorites: Hero[];
    favoriteCount: number;

    // Method
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext<FavoriteHeroContext>({} as FavoriteHeroContext);


// Persistencia
const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}


export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggoleFavorite = (hero: Hero) => {
        const heroExist = favorites.find((h) => h.id === hero.id);

        if (heroExist) {
            const newFavorites = favorites.filter((h) => h.id !== hero.id);
            setFavorites(newFavorites);
            return;
        }

        setFavorites([...favorites, hero]);
    }

    const isFavorite = (hero: Hero) => {
        return favorites.some((h) => h.id === hero.id)
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])


    return (
        <FavoriteHeroContext
            value={{
                // State
                favoriteCount: favorites.length,
                favorites: favorites,

                // Methods
                isFavorite: isFavorite,
                toggleFavorite: toggoleFavorite,
            }}
        >
            {children}
        </FavoriteHeroContext>
    )
}
