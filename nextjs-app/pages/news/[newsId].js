// our-domain.com/news/details
import {useRouter} from "next/router"


function DetailsPage (){
    const router = useRouter()

    const newsID = router.query.newsId
    return <h1> {newsID} </h1>
}

export default DetailsPage