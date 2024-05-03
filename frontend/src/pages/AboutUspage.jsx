import Header from "../components/Header"
import { getSubscriptionData } from "../services/operations/subscriptionService"
import { validateSubscriptionToken } from "../services/operations/subscriptionService"
import { useSelector, useDispatch } from "react-redux"


function AboutUspage() {

  const { subscriptionToken } = useSelector(state => state.subscription);
  const { authUserId, userEmail } = useSelector(state => state.auth)

  const dispatch = useDispatch();

  async function handlebutton() {

   await validateSubscriptionToken({ token: subscriptionToken, email: userEmail, userId: authUserId, dispatch })
    const data = await getSubscriptionData({ token: subscriptionToken });
    console.log(" Subscription data of User is -> ", data);

  }
  return (

    <>

      <Header val={3} />
      <div className="flex justify-center items-center">
        <h2>About us</h2>
        <br />
        <button onClick={handlebutton}> GetuserData </button>
      </div>

    </>
  )
}
export default AboutUspage
