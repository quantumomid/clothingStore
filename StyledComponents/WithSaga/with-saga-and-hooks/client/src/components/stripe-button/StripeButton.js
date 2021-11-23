import StripeCheckout from "react-stripe-checkout";
import crownLogo from "../../assets/crown.svg";
import axios from "axios";

const StripeButton = ({ price }) => {
    //Stripe needs value to be provided in smallest units of the currency i..e., pence for british pounds 
    //or cents for US dollars
    const priceForStripe = price*100;
    const publishableKey = "pk_test_51JxR6iI31TOr1s6tKQVipqKunoTNMFXw92raFPZjKMxOYKAdgvZJUVNK6Rdy9nj7U7S0w3OsoGoiTAzwTswTrlJN00nsGQe3lV";

    const handleToken = (token) => {
        // console.log(token);
        // console.alert("Payment Successful");
        axios({ 
            url: "payment",
            method: "post",
            data: {
                amount: priceForStripe,
                token
            }
         }).then(response => {
             alert("Payment successful")
         }).catch(error => {
             console.log("Payment error: ", JSON.parse(error))
             alert("There was an issue with your payment. Please make sure you use the provided test credit card.")
         })
    }

    return(
        <StripeCheckout 
            label="Pay Now"
            name="Clothing Store Ltd."
            billingAddress
            shippingAddress
            image={crownLogo}
            description={`Your total is £${price}`}
            currency="GBP"
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={handleToken}
            stripeKey={publishableKey}
            bitcoin
        />
    );
}

export default StripeButton;