import React, { useEffect } from "react";
import { apiConnector } from "../services/apiConnector";
import { unrememberEndpoints, rememberEndpoints } from "../services/apis";
import { useSelector, useDispatch } from "react-redux";
import { setIsremember, setIsunremember } from "../slices/remember_unrememberSlice";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";


//This component fetches the stautus of unremember button and does the necessary job to update it
function UnrememberButton({ itemId, type, name = "" }) {

    const { authUserId } = useSelector((state) => state.auth);
    const { isunremember } = useSelector((state) => state.remember_unremember);

    const userId = authUserId;
    const dispatch = useDispatch();

    const { GET_UNREMEMBER_STATUS_API, REMOVE_UNREMEMBER_API, ADD_UNREMEMBER_API } = unrememberEndpoints;
    const { REMOVE_REMEMBER_API } = rememberEndpoints;

    useEffect(() => {
        const fetchStatus = async () => {
            if (userId === null) {
                dispatch(setIsunremember(false));
                return;
            }
            const response = await apiConnector(
                "GET",
                GET_UNREMEMBER_STATUS_API,
                null,
                null,
                { itemId: String(itemId), type, userId }
            );
            dispatch(setIsunremember(response.data.isUnremember));
            return;
        };
        fetchStatus();
    }, [itemId, type, userId, dispatch, GET_UNREMEMBER_STATUS_API]);

    // Function to remove the word from unremember list
    const removeFromunremember = async (itemId, type, userId, event) => {
        if (userId === null) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();

        dispatch(setIsunremember(false));

        try {
            await apiConnector("POST", REMOVE_UNREMEMBER_API, {
                itemId,
                type,
                userId,
            });

            return;
        } catch (error) {
            console.log("There is some error to remove the word from unremember list -", error);
        }
    };

    const addTounremember = async (itemId, type, userId, name, event) => {
        if (userId === null) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        dispatch(setIsremember(false));
        dispatch(setIsunremember(true));
        try {
            await apiConnector("POST", ADD_UNREMEMBER_API, {
                itemId,
                type,
                userId,
                name,
            });
            await apiConnector("POST", REMOVE_REMEMBER_API, {
                itemId,
                type,
                userId,
            });

            return;
        } catch (error) {
            console.log("There is some error to add the word from remember list -", error);
        }
    };


    return (
        <>
            {
                isunremember ? (
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
                )
            }
        </>
    );
}

export default UnrememberButton;
