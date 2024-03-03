import React from 'react';
import { CDN_URL } from '../utils/constants'

const RestCard = (props) => {
    const {resData} = props;
    const {name, cuisines, costForTwo, cloudinaryImageId, avgRating} = resData?.info
    return (
        <div className='m-4 p-4 w-[250px] rounded-lg hover:bg-gray-200'>
            <img 
            className='rounded-md'
            alt="res-logo"
            src={CDN_URL+cloudinaryImageId} />
            <h3 className="font-bold py-2 text-lg">{name}</h3>
            <h4>{cuisines.join(',')}</h4>
            <h4>{costForTwo}</h4>
            <h4>{avgRating}</h4>
        </div>
    )
}

export const withPromotedLabel = (RestCard) => {
    return (props) => {
        return (
            <div>
                <label>Promoted</label>
                <RestCard {...props}></RestCard>
            </div>
        )
    }
}

export default RestCard;