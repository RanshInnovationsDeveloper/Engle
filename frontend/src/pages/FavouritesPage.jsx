import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { MdOutlineFilterAlt } from "react-icons/md";
import Header from "../components/Header";
import CategoryHeader from "../components/CategoryHeader";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/apiConnector";
import { favouriteEndpoints } from "../services/apis";
import FavouriteButton from "../components/FavouriteButton";

const { GET_FAVOURITE_API, REMOVE_FAVOURITE_API } = favouriteEndpoints;

function FavouritesPage() {
  // AuthUserId to be sent to backend for API purpose from Redux Store
  const { authUserId } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiConnector(
          "GET",
          GET_FAVOURITE_API,
          null,
          null,
          {
            userId: String(authUserId), // Use authUserId in production
          }
        );
        setData(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [authUserId]);

  if (isLoading) return <div>Loading.....</div>;

  if (data.data.length === 0) {
    return <>No Item Favourite Items Added For this user </>;
  }

  const groupedData = data.data.reduce((acc, item) => {
    const date = item.createdAt.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      val: item?.val,
      name: item?.name,
      type: item?.type,
      itemId: item?.itemId,
    });
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedData).map((dateKey) => (
        <React.Fragment key={dateKey}>
          <p>Date: {dateKey}</p>
          <ul>
            {groupedData[dateKey].map((value, index) => (
              <div key={index}>
                <li>Type: {value.type}</li>
                {value.type === "words" && (
                  <>
                    <li>Word: {value.val.word}</li>
                    <li>Definition: {value.val.definitions[0]}</li>
                    <FavouriteButton
                      type={value?.type}
                      itemId={value?.itemId}
                      name={value?.name}
                    />
                  </>
                )}
                {value.type === "sampleStory" && (
                  <>
                    <li>Title: {value.val.title}</li>
                    <li>Content: {value.val.content}</li>
                    <FavouriteButton
                      type={value?.type}
                      itemId={value?.itemId}
                      name={value?.name}
                    />
                  </>
                )}
              </div>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </div>
  );
}

export default FavouritesPage;
