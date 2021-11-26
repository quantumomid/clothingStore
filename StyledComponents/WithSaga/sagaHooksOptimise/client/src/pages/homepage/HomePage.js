import { Profiler } from "react";
import Directory from "../../components/directory/Directory";
import { HomePageContainer } from "./homepageStyles";

export default function HomePage(){
    return(
        <HomePageContainer>
            <Profiler id="Directory" onRender={(id, phase, actualDuration) => console.log({ id, phase, actualDuration })}>
                <Directory />
            </Profiler>
        </HomePageContainer>
    )
}