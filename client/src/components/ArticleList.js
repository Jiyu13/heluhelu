import Article from "./Article";
import {Link} from "react-router-dom";

function ArticleList( {articles} ) {
    return (
        <main>
            <ul className='articles'>
                {articles?.map(article =>
                    <Link exact to='/documents/:article.id'>
                        Article {article.id}
                        <Article
                            key={article.id}
                            article={article.text}
                        />
                    </Link>

                )}
            </ul>
        </main>
    )
}

export default ArticleList;