document.addEventListener('DOMContentLoaded', function () {
    const textFile = "/actualities/text/source.txt";
    const mainContent = document.getElementsByClassName("main-content");
    const articles = [];

    fetch(textFile)
        .then(response => response.text())
        .then(text => {
            const rawArticles = text.split("<start>");
            rawArticles.shift();
            rawArticles.forEach(article => {
                articles.push(article.slice(0, article.indexOf("<end>")));
            });
            articles.forEach(article => {
                const articleDiv = document.createElement("div");
                articleDiv.classList.add("article");

                if (article.includes('<i "')) {
                    const articleImage = document.createElement("img");
                    articleImage.classList.add("article-image");
                    articleImage.src = "/actualities/images/" + article.slice(article.indexOf('<i "') + 4, article.indexOf('" i>'));
                    articleDiv.appendChild(articleImage);
                }

                const articleDetails = document.createElement("div");
                articleDetails.classList.add("article-details");

                const articleHeader = document.createElement("div");
                articleHeader.classList.add("article-header");

                const articleTitle = document.createElement("div");
                articleTitle.classList.add("article-title");
                articleTitle.innerHTML = article.slice(article.indexOf('<h "') + 4, article.indexOf('" h>'));

                const articleDate = document.createElement("div");
                articleDate.classList.add("article-date");
                articleDate.innerHTML = article.slice(article.indexOf('<d "') + 4, article.indexOf('" d>'));

                const articleContent = document.createElement("div");
                articleContent.classList.add("article-content");
                let content = article.slice(article.indexOf('<c "') + 4, article.indexOf('" c>'));

                // Replace <l "name" "url" l> with <a href="url">name</a>
                content = content.replace(/<l "([^"]+)" "([^"]+)" l>/g, '<a href="$2">$1</a>');
                articleContent.innerHTML = content;

                articleHeader.appendChild(articleTitle);
                articleHeader.appendChild(articleDate);
                articleDetails.appendChild(articleHeader);
                articleDetails.appendChild(articleContent);
                articleDiv.appendChild(articleDetails);
                mainContent[0].appendChild(articleDiv);
            });
        });
});