import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
//This component fetches the stautus of favourite button and does the necessary job to update it

function FavouriteButton({ itemId, type, name = "" }) {
  //TODO:This Commented to do is here to aid the developmet of favourite page uncomment it and use it while development and later remove it
  // const userId = "qEMYBI4erFNruO1L0iHQknbxXdD2"; //TODO: replace with "useSelector" from redux store Remove this user id from production code
  const { authUserId } = useSelector((state) => state.auth);
  const userId = authUserId;
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { GET_FAVOURITE_STATUS_API, REMOVE_FAVOURITE_API, ADD_FAVOURITE_API } =
    favouriteEndpoints;

  useEffect(() => {
    const fetchStatus = async () => {
      if(userId===null)
      {
        setIsFavourite(false);
        setIsLoading(false);
        return ;
      }
      const response = await apiConnector(
        "GET",
        GET_FAVOURITE_STATUS_API,
        null,
        null,
        { itemId: String(itemId), type, userId }
      );
      setIsFavourite(response.data.isFavourite);
      setIsLoading(false);
      return ;
    };
    fetchStatus();
  });

  // Function to handle add item to favourite call
  const removeFromFavourite = async (itemId, type, userId, event) => {
    if(userId===null)
    {
      toast.error("Please Login !");
      return ;
    }
    event.stopPropagation();
    setIsLoading(true);
    try {
      const response = await apiConnector("POST", REMOVE_FAVOURITE_API, {
        itemId,
        type,
        userId,
      });
      setIsLoading(false);
      setIsFavourite(false);
      return ;
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavourite = async (itemId, type, userId, name, event) => {
    if(userId===null)
    {
      toast.error("Please Login !");
      return ;
    }
    event.stopPropagation();
    setIsLoading(true);

    try {
      const response = await apiConnector("POST", ADD_FAVOURITE_API, {
        itemId,
        type,
        userId,
        name,
      });
      setIsLoading(false);
      setIsFavourite(true);
      return ;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isFavourite ? (
        <FaHeart
          className="text-red-600 w-[1.5rem] h-[1.5rem]"
          onClick={(event) => removeFromFavourite(itemId, type, userId, event)}
        />
      ) : (
        <CiHeart
          className="text-red-600 w-[1.5rem] h-[1.5rem]"
          onClick={(event) => addToFavourite(itemId, type, userId, name, event)}
        />
      )}
    </div>
  );
}

export default FavouriteButton;
