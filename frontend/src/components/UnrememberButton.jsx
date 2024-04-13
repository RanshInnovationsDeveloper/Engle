import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { unrememberEndpoints, rememberEndpoints } from "../services/apis";
import { useSelector, useDispatch } from "react-redux";
import { setIsremember, setIsunremember } from "../slices/remember_unrememberSlice";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";


//This component fetches the stautus of unremember button and does the necessary job to update it
function UnrememberButton({ itemId, type, name = "",isFlipped, side }) {

    const { authUserId } = useSelector((state) => state.auth);
    const { isunremember } = useSelector((state) => state.remember_unremember);

    const userId = authUserId;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { GET_UNREMEMBER_STATUS_API, REMOVE_UNREMEMBER_API, ADD_UNREMEMBER_API } = unrememberEndpoints;
    const { REMOVE_REMEMBER_API } = rememberEndpoints;

    useEffect(() => {
        const fetchStatus = async () => {
            if (userId === null) {
                dispatch(setIsunremember(false));
                localStorage.setItem("isunremember", false);
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
            localStorage.setItem("isunremember", response.data.isUnremember);
            return;
        };
        fetchStatus();
    }, [itemId, type, userId, dispatch, GET_UNREMEMBER_STATUS_API,isFlipped]);

    // Function to remove the word from unremember list
    const removeFromunremember = async (itemId, type, userId, event) => {
        if (!userId) {
            localStorage.setItem("path","/flashcards");
            navigate("/login");
            return ;
        }

        dispatch(setIsunremember(false));
        localStorage.setItem("isunremember", false);

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
        if (!userId) {
            localStorage.setItem("path","/flashcards");
            navigate("/login");
            return ;
        }

        dispatch(setIsremember(false));
        dispatch(setIsunremember(true));
        localStorage.setItem("isremember", false);
        localStorage.setItem("isunremember", true);
        
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
            <button onClick={(event) =>{
                    if(isunremember){
                    removeFromunremember(itemId, type, userId, event)}
                    else {
                        addTounremember(itemId, type, userId, name, event)
                    }}}
                    className={`items-center w-[17.5rem] h-[3.125rem] ${isunremember? "bg-green-500  border-green-600":"border-[#D80000] bg-[#FFE1DB]"}  border flex flex-row justify-center rounded-[0.6125rem] `}>
                    <div className={`flex flex-row ${isunremember? "text-green-900":"text-[#E53935]"} gap-2 items-center `}>
                        <RxCross1 className='h-5 w-5 ' />
                        <span className=" font-normal text-base">{side === "front" ? "I don't know this word" : "Not Remembered"}</span>
                    </div>

                </button>
        </>
    );
}

export default UnrememberButton;
