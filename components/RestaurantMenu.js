import React from 'react'
import { useEffect, useState } from 'react';
import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from '../components/RestaurantCategory'

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantMenu(resId);
    const [showIndex, setShowIndex] = useState(0);

    if ( resInfo === null) return <Shimmer />

    const {name, cuisines} = resInfo?.cards[0]?.card?.card?.info;    
    const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (cat) => 
               cat?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    console.log(categories);
    
    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(', ')}
            </p>
            {categories.map((category, index) => 
                <RestaurantCategory 
                    data={category?.card?.card} 
                    key={category?.card?.card.title}
                    showItems={index === showIndex ? true : false}
                    setShowIndex={() => setShowIndex(prevIndex => prevIndex === index ? null : index)}
                />
            )}
        </div>
      )
}

export default RestaurantMenu;