import React, { useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import { rememberEndpoints,unrememberEndpoints } from "../services/apis";
import { useDispatch, useSelector } from "react-redux"
import { setIsremember,setIsunremember } from "../slices/remember_unrememberSlice";
import { toast } from "react-toastify";
import { MdCheck } from "react-icons/md";


//This component fetches the stautus of remember button and does the necessary job to update it
function RememberButton({ itemId, type, name = "" ,isFlipped, side }) {

    const { authUserId } = useSelector((state) => state.auth);
    const {isremember}=useSelector((state)=>state.remember_unremember);

    const userId = authUserId;
    const dispatch = useDispatch();
    const navigate=useNavigate();
    
    const { GET_REMEMBER_STATUS_API, REMOVE_REMEMBER_API, ADD_REMEMBER_API } =  rememberEndpoints;
    const {REMOVE_UNREMEMBER_API}=unrememberEndpoints ;

    useEffect(() => {
        const fetchStatus = async () => {
            if (!userId) {
                dispatch(setIsremember(false));
                localStorage.setItem("isremember",false);
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
            localStorage.setItem("isremember",response?.data?.isRemember);
            return;
        };
        fetchStatus();
    },[itemId, type, userId, dispatch, GET_REMEMBER_STATUS_API,isFlipped]);

    // Function to remove the word from remember list
    const removeFromremember = async (itemId, type, userId, event) => {
        if (!userId) {
            localStorage.setItem("path","/flashcards");
            navigate("/login");
            return ;
        }
        dispatch(setIsremember(false));
        localStorage.setItem("isremember",false);
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
            localStorage.setItem("path","/flashcards");
            navigate("/login");
            return ;
        }
        // event.stopPropagation();
        dispatch(setIsremember(true));
        dispatch(setIsunremember(false));
        localStorage.setItem("isremember",true);
        localStorage.setItem("isunremember",false);

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
                <button onClick={(event) =>{
                    if(isremember){
                    removeFromremember(itemId, type, userId, event)}
                    else {
                        addToremember(itemId, type, userId, name, event)
                    }}}
                    className={`items-center w-[17.5rem] h-[3.125rem] ${isremember? "text-white bg-[#23AD00]":"border-[#23AD00] bg-[#D7FFCD]"}     border flex flex-row justify-center rounded-[0.6125rem] `}>
                    <div className={`flex flex-row ${isremember? "text-white":"text-[#43A047]"} gap-2 `}>
                        <MdCheck className='h-6 w-6 ' />
                        <span className=" font-normal text-base">{side === "front" ? "I know this word" : "Remembered"}</span>
                    </div>

                </button>
 
        </>

    );
}

export default RememberButton;
