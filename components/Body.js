import React, { useEffect, useState } from 'react';
import RestCard, { withPromotedLabel } from './RestCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';

const Body = () => {

    const [listOfRest, setListOfRest] = useState([]); 
    const [searchText, setSearchText] = useState("");
    const [filteredRest, setFilteredRest] = useState([]);

    const RestaurantCardPromoted = withPromotedLabel(RestCard);

    useEffect(() => {
        console.log("use effect called");
        fetchData();
    }, [])

    console.log("use effect before");

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const json = await data.json();
        console.log(json);
        setListOfRest(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRest(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) return <h1>You are OFFLINE!</h1>
    return listOfRest.length === 0 ? (
         <Shimmer/>
    ) : (
        <div className='body'>
            <div className='flex'>
                <div className="m-4 p-4">
                    <input type="text"  className="border border-solid border-black" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}></input>
                    <button className='px-4 bg-blue-100 m-4 py-2 rounded-lg'
                    onClick={() => {
                        const filteredRest = listOfRest.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        )
                        setFilteredRest(filteredRest);
                    }}>Search</button>
                </div>
                <div className='m-4 p-4'>
                    <button 
                    className='px-4 bg-blue-100 m-4 py-2 rounded-lg'
                    onClick={() => {
                        console.log("Button clicked");
                        const filterlistOfRest = listOfRest.filter((res) => res.info.avgRating > 4);
                        console.log(listOfRest);
                        setFilteredRest(filterlistOfRest);
                    }}
                    >
                        Top Rated Restaurants</button>
                </div>
            </div>
            <div className='flex flex-wrap'>
                {filteredRest.map((rest, index) => 
                    <Link to={"/restaurants/"+ rest.info.id} key={rest.info.id}>
                        {
                            rest.info.promoted 
                                ? (<RestaurantCardPromoted resData={rest}/>) 
                                : (<RestCard resData={rest}/>)
                        }
                        
                    </Link>)}
            </div>
        </div>
    )
}

export default Body;