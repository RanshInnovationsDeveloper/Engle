import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { VscHeartFilled } from "react-icons/vsc";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/FlashCard.css"


function FavouriteButton({ itemId, type, name = "", isFlipped }) {

  const { authUserId } = useSelector((state) => state.auth);
  const userId = authUserId;
  const navigate = useNavigate();

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
  }, [itemId, userId, type, GET_FAVOURITE_STATUS_API, isFlipped]);

  // Function to handle add item to favourite call
  const removeFromFavourite = async (itemId, type, userId, event) => {
    if (!userId) {
      localStorage.setItem("path", "/flashcards");
      navigate("/login");
      return ;
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
      console.log("error to remove word from the favourite list -", error);
    }
  };

  const addToFavourite = async (itemId, type, userId, name, event) => {
    if (!userId) {
      localStorage.setItem("path", "/flashcards");
      navigate("/login");
      return ;
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
    <div className="relative inline-block">

      {isFavourite ? (
        <div className="">
          <VscHeartFilled 
            className={`text-[#F44336] w-[2rem] h-[2rem] `}
            onClick={(event) => removeFromFavourite(itemId, type, userId, event)}
          />
        </div>

      ) : (
        <div className="">
          <IoMdHeartEmpty 
            className={`text-[#F44336] w-[2rem] h-[2rem]   `}
            onClick={(event) => addToFavourite(itemId, type, userId, name, event)}
          />
        </div>

      )}
    </div>
  );
}

export default FavouriteButton;
