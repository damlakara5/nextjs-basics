//our-domain.com/
import Link from "next/link"
import { Fragment } from "react"

function HomePage (){
    return (
        
        <Fragment>
            <h1>Home Page</h1>
            <ul>
                <li>
                <Link href="/news/damla">Damla</Link>
            </li>
            <li>
                <Link href="/news/something-else">Something Else</Link>
            </li>
        </ul>
    </Fragment>
    )
}

export default HomePage