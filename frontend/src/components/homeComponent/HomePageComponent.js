import AllEventList from "../EventListComponent/AllEventList";
import FooterComponent from "../FooterComponent/FooterComponent";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

export default function HomePage(){
    return(
        <>
            <HeaderComponent/>
            <AllEventList/>
            <FooterComponent/>
        </>
    )
}