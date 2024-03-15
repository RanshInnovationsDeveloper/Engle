import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
//This component fetches the stautus of favourite button and does the necessary job to update it
function FavouriteButton({ itemId, type, name = "" }) {
  const userId = "qEMYBI4erFNruO1L0iHQknbxXdD2"; //TODO: replace with "useSelector" from redux store
  //   const { authUserId } = useSelector((state) => state.auth);
  //   const userId = authUserId;
  const [isFavourite, setIsFavourite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { GET_FAVOURITE_STATUS_API, REMOVE_FAVOURITE_API, ADD_FAVOURITE_API } =
    favouriteEndpoints;
  useEffect(() => {
    const fetchStatus = async () => {
      const response = await apiConnector(
        "GET",
        GET_FAVOURITE_STATUS_API,
        null,
        null,
        { itemId: String(itemId), type, userId }
      );
      setIsFavourite(response.data.isFavourite);
      setIsLoading(false);
    };
    fetchStatus();
  });

  const removeFromFavourite = async (itemId, type, userId) => {
    try {
      const response = await apiConnector("POST", REMOVE_FAVOURITE_API, {
        itemId,
        type,
        userId,
      });
      setIsFavourite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavourite = async (itemId, type, userId, name) => {
    try {
      const response = await apiConnector("POST", ADD_FAVOURITE_API, {
        itemId,
        type,
        userId,
        name,
      });
      setIsFavourite(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isLoading ? (
        <button className="bg-red-500">Loading...</button>
      ) : isFavourite ? (
        <button
          className="bg-red-500"
          onClick={() => removeFromFavourite(itemId, type, userId)}
        >
          Remove from Favourite
        </button>
      ) : (
        <button
          className="bg-red-500"
          onClick={() => addToFavourite(itemId, type, userId, name)}
        >
          Add to Favourite
        </button>
      )}
    </div>
  );
}

export default FavouriteButton;
