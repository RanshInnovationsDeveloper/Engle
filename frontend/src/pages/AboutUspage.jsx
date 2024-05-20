import Header from "../components/Header"
import { getSubscriptionData, validateSubscriptionToken } from "../services/operations/subscriptionService"
import { useSelector, useDispatch } from "react-redux"
import { handlePayment } from "../services/operations/paymentService"
import { createReferral, verifyReferralCode, updateReferralData, updateWalletAmount } from "../services/operations/referralService"
import { onSignupSendOTP,onOTPVerify,setUserEmailAndSendVerificationLink,setUserPassword } from "../services/operations/authServices"

function AboutUspage() {

  const { subscriptionToken } = useSelector(state => state.subscription);
  const { authUserId, userEmail, userName } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  async function handlebutton() {

    await handlePayment({ amount: 13, userId: authUserId, userName, userEmail, noOfDaysInSubscription: 30, dispatch });
    const newtoken = await validateSubscriptionToken(subscriptionToken, userEmail, authUserId, dispatch);
    let data;
    if (newtoken != null)
      data = await getSubscriptionData({ token: newtoken });
    else
      data = await getSubscriptionData({ token: subscriptionToken });
    console.log(" Subscription data of User is -> ", data);

  }


  async function referralCodeAPIHandler() {
    console.log("Referral code API is called");
    //  await createReferral(authUserId,30);

    // const {value,count,isValid}=await verifyReferralCode("xj4dfi5l");    // here count means how many number of times this referral code has been used.
    // console.log("Referral code is valid -> ",isValid," value is -> ",value," count is -> ",count);

    // await updateReferralData("xj4dfi5l", 1);             // means we increase the count of the referral code by 1(used 1 more time)

    // updateWalletAmount(authUserId, 30, 2);                // means we add 2 referral code of 30% discount in the wallet of the user
  }

  async function fnc1() {
onSignupSendOTP('+918295515499');
  }

  async function fnc2(){
onOTPVerify('123456');
  }
  async function fnc3(){
    setUserEmailAndSendVerificationLink('parjapatsumit104@gmail.com');
  }
  async function fnc4(){
    setUserPassword('123456');
  }
  return (

    <>

      <Header val={3} />
      <div className="flex justify-center items-center">
        <h2>About us</h2>
      </div>
      <button onClick={handlebutton} className="text-2xl"> Check Payment and Subscription APIs</button>
      <br />
      <button onClick={referralCodeAPIHandler} className="text-2xl">Check ReferralCode APIs</button>
      <br />
      <div id="recaptcha-container"></div>
      <button onClick={fnc1} className="text-2xl">send otp</button>
      <br />
      <button onClick={fnc2} className="text-2xl">verify otp</button>
      <br />
      <button onClick={fnc3} className="text-2xl">set email</button>
      <br />
      <button onClick={fnc4} className="text-2xl">set password</button>
      


    </>
  )
}
export default AboutUspage
