function getTime(time){
    let hour = parseInt(time / 3600);          
    let minute = parseInt((time % 3600) / 60); 
    let second = time % 60;   
    
    return `${hour} hour ${minute} min ${second} sec ago`;
}

// create loadCatagories
const loadCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
        if (data.categories && data.categories.length > 0) {
            displayCatagories(data.categories);
        } else {
            console.log("No categories found");
        }
    })
    .catch((error) => console.log(error));
};

// create loadVideos
const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => {
        if (data.videos && data.videos.length > 0) {
            displayVideos(data.videos);
        } else {
            console.log("No videos found");
        }
    })
    .catch((error) => console.log(error));
};

// Load Category Videos
const loadCatagoryVideos = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/categories/${id}`)
    .then((res) => res.json())
    .then((data) => {
        if (data.category && data.category.length > 0) {
            displayVideos(data.category);
        } else {
            console.log("No videos found in this category");
        }
    })
    .catch((error) => console.log(error));
};

// Display Videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
    
    videos.forEach((video) => {
        console.log(video);

        const card = document.createElement("div");
        card.classList = "card card-compact";
        
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img src="${video.thumbnail}" class="h-full w-full object-cover relative" alt="Shoes" />
                ${video.others.posted_date && video.others.posted_date.length == 0 ? "" : 
                    `<span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1">
                        ${getTime(video.others.posted_date)}
                    </span>`
                }
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                    <img class="w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}" />
                </div>
                <div>
                    <h2 class="font-bold">${video.title}</h2>
                    <div class="flex items-center gap-2">
                        <p class="text-gray-400">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified ? 
                            `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` 
                            : ""
                        }
                    </div>
                </div>
            </div>
        `;
        
        videoContainer.append(card);
    });
};

// Display Categories
const displayCatagories = (categories) => {
    const categoryContainer = document.getElementById("categories");
    
    categories.forEach((item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
            <button onclick="loadCatagoryVideos(${item.category_id})" class="btn">
                ${item.category}
            </button>
        `;
        categoryContainer.appendChild(buttonContainer);
    });
};

// Initial Data Load
loadCatagories();
loadVideos();
