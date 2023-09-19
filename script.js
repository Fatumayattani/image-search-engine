const accessKey = "v37zn5qYHfoJalVN3ceBrtBQXD-GYQxShVmRUmm7JFg";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const viewMoreBtn = document.getElementById("View-more-btn"); 

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = ""; 
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });

        viewMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

viewMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
