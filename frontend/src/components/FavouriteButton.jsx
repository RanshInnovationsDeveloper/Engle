import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/FlashCard.css"


function FavouriteButton({ itemId, type, name = "",isFlipped }) {

  const { authUserId } = useSelector((state) => state.auth);
  const userId = authUserId;

  const [isFavourite, setIsFavourite] = useState(false);

  const { GET_FAVOURITE_STATUS_API, REMOVE_FAVOURITE_API, ADD_FAVOURITE_API } =
    favouriteEndpoints;

  useEffect(() => {
    const fetchStatus = async () => {
      if (userId === null) {
        setIsFavourite(false);
        return;
      }
      const response = await apiConnector(
        "GET",
        GET_FAVOURITE_STATUS_API,
        null,
        null,
        { itemId: String(itemId), type, userId }
      );
      setIsFavourite(response.data.isFavourite);
      return;
    };
    fetchStatus();
  },[itemId,userId,type,GET_FAVOURITE_STATUS_API,isFlipped]);

  // Function to handle add item to favourite call
  const removeFromFavourite = async (itemId, type, userId, event) => {
    if (userId === null) {
      toast.error("Please Login !");
      return;
    }

    event.stopPropagation();
    setIsFavourite(false);

    try {
      await apiConnector("POST", REMOVE_FAVOURITE_API, {
        itemId,
        type,
        userId,
      });

      return;
    } catch (error) {
      console.log("error to remove word from the favourite list -",error);
    }
  };

  const addToFavourite = async (itemId, type, userId, name, event) => {
    if (userId === null) {
      toast.error("Please Login !");
      return;
    }
    event.stopPropagation();
    setIsFavourite(true);

    try {
      await apiConnector("POST", ADD_FAVOURITE_API, {
        itemId,
        type,
        userId,
        name,
      });

      return;
    } catch (error) {
      console.log("Error to add the word in favourite list -",error);
    }
  };

  return (
    <div className="relative inline-block w-">

      {isFavourite ? (
        <div className="p-3">
          <FaHeart
            className={`text-red-600 w-[1.5rem] h-[1.5rem] heart-icon`}
            onClick={(event) => removeFromFavourite(itemId, type, userId, event)}
          />
        </div>

      ) : (
        <div className="p-[0.6rem]">
          <CiHeart
            className={`text-red-600 w-[1.7rem] h-[1.7rem] heart-icon `}
            onClick={(event) => addToFavourite(itemId, type, userId, name, event)}
          />
        </div>

      )}
    </div>
  );
}

export default FavouriteButton;
