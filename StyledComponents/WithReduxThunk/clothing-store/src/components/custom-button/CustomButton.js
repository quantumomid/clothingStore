import { CustomButtonContainer } from "./customButtonStyles";

export default function CustomButton({ children, ...props }){
    return(
        <CustomButtonContainer { ...props }>
            { children }
        </CustomButtonContainer>
    )
}