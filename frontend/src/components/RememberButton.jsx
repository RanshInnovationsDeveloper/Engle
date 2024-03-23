import React, { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { rememberEndpoints } from "../services/apis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";


//This component fetches the stautus of remember button and does the necessary job to update it
function RememberButton({ itemId, type, name = "" }) {

    const { authUserId } = useSelector((state) => state.auth);
    const userId = authUserId;
    const [isremember, setIsremember] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { GET_REMEMBER_STATUS_API, REMOVE_REMEMBER_API, ADD_REMEMBER_API } =
        rememberEndpoints;

    useEffect(() => {
        const fetchStatus = async () => {
            if (!userId) {
                setIsremember(false);
                setIsLoading(false);
                return;
            }
            const response = await apiConnector(
                "GET",
                GET_REMEMBER_STATUS_API,
                null,
                null,
                { itemId: String(itemId), type, userId }
            );
            setIsremember(response.data.isRemember);
            setIsLoading(false);
            return;
        };
        fetchStatus();
    });

    // Function to remove the word from remember list
    const removeFromremember = async (itemId, type, userId, event) => {
        if (!userId) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        setIsLoading(true);
        try {
            const response = await apiConnector("POST", REMOVE_REMEMBER_API, {
                itemId,
                type,
                userId,
            });
            setIsLoading(false);
            setIsremember(false);
            return;
        } catch (error) {
            console.log(error);
        }
    };

    const addToremember = async (itemId, type, userId, name, event) => {
        if (!userId) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        setIsLoading(true);

        try {
            const response = await apiConnector("POST", ADD_REMEMBER_API, {
                itemId,
                type,
                userId,
                name,
            });
            setIsLoading(false);
            setIsremember(true);
            return;
        } catch (error) {
            console.log(error);
        }
    };
    return (
       
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : isremember ? (
                <button onClick={(event) => removeFromremember(itemId, type, userId, event)} className='items-center  bg-green-500 gap-2 border-2 border-green-600 border-green flex flex-row justify-center rounded-md px-20'>
                    <div className='flex flex-row'>
                        <TiTick className='h-6 w-6 text-green-900' />
                        <span className="text-green-900">Remembered</span>
                    </div>

                </button>
            ) : (
                <button onClick={(event) => addToremember(itemId, type, userId, name, event)} className='items-center  bg-green-200 gap-2 border-2 border-green-400 border-green flex flex-row justify-center rounded-md px-20'>
                    <div className='flex flex-row'>
                        <TiTick className='h-6 w-6 text-green-600' />
                        <span className="text-green-600">Remembered</span>
                    </div>

                </button>
            )}
        </>

    );
}

export default RememberButton;
