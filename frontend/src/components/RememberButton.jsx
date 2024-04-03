import React, { useEffect } from "react";
import { apiConnector } from "../services/apiConnector";
import { rememberEndpoints,unrememberEndpoints } from "../services/apis";
import { useDispatch, useSelector } from "react-redux"
import { setIsremember,setIsunremember } from "../slices/remember_unrememberSlice";
import { toast } from "react-toastify";
import { TiTick } from "react-icons/ti";


//This component fetches the stautus of remember button and does the necessary job to update it
function RememberButton({ itemId, type, name = "" }) {

    const { authUserId } = useSelector((state) => state.auth);
    const {isremember}=useSelector((state)=>state.remember_unremember);

    const userId = authUserId;
    const dispatch = useDispatch();
    
    const { GET_REMEMBER_STATUS_API, REMOVE_REMEMBER_API, ADD_REMEMBER_API } =  rememberEndpoints;
    const {REMOVE_UNREMEMBER_API}=unrememberEndpoints ;

    useEffect(() => {
        const fetchStatus = async () => {
            if (!userId) {
                dispatch(setIsremember(false));
                return;
            }
            const response = await apiConnector(
                "GET",
                GET_REMEMBER_STATUS_API,
                null,
                null,
                { itemId: String(itemId), type, userId }
            );
            dispatch(setIsremember(response?.data?.isRemember));
            return;
        };
        fetchStatus();
    },[itemId, type, userId, dispatch, GET_REMEMBER_STATUS_API]);

    // Function to remove the word from remember list
    const removeFromremember = async (itemId, type, userId, event) => {
        if (!userId) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        dispatch(setIsremember(false));
        try {
            await apiConnector("POST", REMOVE_REMEMBER_API, {
                itemId,
                type,
                userId,
            });
          
            return;
        } catch (error) {
            console.log("There is some error to remove the word from remember list -",error);
        }
    };

    const addToremember = async (itemId, type, userId, name, event) => {
        if (!userId) {
            toast.error("Please Login !");
            return;
        }
        event.stopPropagation();
        dispatch(setIsremember(true));
        dispatch(setIsunremember(false));

        try {
            await apiConnector("POST", ADD_REMEMBER_API, {
                itemId,
                type,
                userId,
                name,
            });

            await apiConnector("POST", REMOVE_UNREMEMBER_API, {
                itemId,
                type,
                userId,
            });


            return;
        } catch (error) {
            console.log("There is some error to add the word from remember list -",error);
        }
    };
    return (
       
        <>
            { isremember ? (
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
