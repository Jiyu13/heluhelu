import Document from "./Document";
import {Link} from "react-router-dom";

function Documents( {articles} ) {
    return (
        <main>
            <ul className='articles'>
                {articles?.map(article =>
                    <Link exact to='/documents/:article.id'>
                        Article {article.id}
                        <Document
                            key={article.id}
                            article={article.text}
                        />
                    </Link>

                )}
            </ul>
        </main>
    )
}

export default Documents;