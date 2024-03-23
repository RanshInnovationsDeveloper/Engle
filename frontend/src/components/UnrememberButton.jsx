import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { unrememberEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";


//This component fetches the stautus of unremember button and does the necessary job to update it
function UnrememberButton({ itemId, type, name = "" }) {

    const { authUserId } = useSelector((state) => state.auth);
    const userId = authUserId;
    const [isunremember, setIsunremember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { GET_UNREMEMBER_STATUS_API, REMOVE_UNREMEMBER_API, ADD_UNREMEMBER_API } =
        unrememberEndpoints;

    useEffect(() => {
        const fetchStatus = async () => {
            if (userId === null) {
                setIsunremember(false);
                setIsLoading(false);
                return;
            }
            const response = await apiConnector(
                "GET",
                GET_UNREMEMBER_STATUS_API,
                null,
                null,
                { itemId: String(itemId), type, userId }
            );
            setIsunremember(response.data.isUnremember);
            setIsLoading(false);
            return;
        };
        fetchStatus();
    });

    // Function to remove the word from unremember list
    const removeFromunremember = async (itemId, type, userId, event) => {
        if (userId === null) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        setIsLoading(true);
        try {
            const response = await apiConnector("POST", REMOVE_UNREMEMBER_API, {
                itemId,
                type,
                userId,
            });
            setIsLoading(false);
            setIsunremember(false);
            return;
        } catch (error) {
            console.log(error);
        }
    };

    const addTounremember = async (itemId, type, userId, name, event) => {
        if (userId === null) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        setIsLoading(true);

        try {
            const response = await apiConnector("POST", ADD_UNREMEMBER_API, {
                itemId,
                type,
                userId,
                name,
            });
            setIsLoading(false);
            setIsunremember(true);
            return;
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : isunremember ? (
                <button onClick={(event) => removeFromunremember(itemId, type, userId, event)} className='items-center  bg-green-500 gap-2 border-2 border-green-600 border-green flex flex-row justify-center rounded-md px-20'>
                    <div className='flex flex-row'>
                        <ImCross className='h-6 w-6 text-green-700' />
                        <span className="text-green-700">Not Remembered</span>
                    </div>

                </button>
            ) : (
                <button onClick={(event) => addTounremember(itemId, type, userId, name, event)} className='items-center  bg-green-200 gap-2 border-2 border-green-400 border-green flex flex-row justify-center rounded-md px-20'>
                    <div className='flex flex-row'>
                        <ImCross className='h-6 w-6 text-green-600' />
                        <span className="text-green-600">Not Remembered</span>
                    </div>

                </button>
            )}
        </>
    );
}

export default UnrememberButton;
