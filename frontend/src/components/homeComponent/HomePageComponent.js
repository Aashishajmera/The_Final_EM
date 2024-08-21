import AllEventList from "../EventListComponent/AllEventList";
import FooterComponent from "../footerComponent/FooterComponent";
import HeaderComponent from "../headerComponent/HeaderComponent";

export default function HomePage(){
    return(
        <>
            <HeaderComponent/>
            <AllEventList/>
            <FooterComponent/>
        </>
    )
}