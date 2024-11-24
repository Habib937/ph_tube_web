function getTime(time) {
    let hour = parseInt(time / 3600);          
    let minute = parseInt((time % 3600) / 60); 
    let second = time % 60;   
    
    return `${hour} hour ${minute} min ${second} sec ago`;
}






// create loadCatagories
const loadCatagories = () => {
    // fetch the data
// create load
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = () => {
    // fetch the data
// create load
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }



 const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videos.forEach((video) =>{
        console.log(video)
        
        let date= video.others.posted_date

        let post=date.slice(0,4)
        if(!post){
            post="no viewer"
            
        }
        

        const card = document.createElement("div")
        card.classList = "card card-compact"
        card.innerHTML=
        `<figure class= "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class = "h-full w-full object-cover relative" 
      alt="Shoes" />
      ${video.others.posted_date?.length==0 ? ""
        :
        ` <span class="absolute right-2 bottom-2 bg-black text-white rounded p-1 " >
    ${getTime(video.others.posted_date)}
      </span>`}
      
   
  </figure>
  <div class="px-0 py-2 flex gap-2">
        <div>
            <img class = "w-10 h-10 rounded-full object-cover " src = ${video.authors[0].profile_picture} />
        </div>
        <div>
            <h2 class="font-bold">${video.title} </h2>
            <div class="flex items-center gap-2">
            <p class="text-gray-400">${video.authors[0].profile_name} </p>
            ${video.authors[0].verified == true ?
                `<img class="w-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""}
            
            </div>
            
            <p> </p>
        </div>
  </div>
        `
        videoContainer.append(card)
    })
}
// create displayCatagories
// {category_id: '1001', category: 'Music'}
const displayCatagories = (categories) => {
    // add data in html
    const categoryContainer = document.getElementById("categories")
 categories.forEach((item) => {
    console.log(item)
    // create btn
    const button = document.createElement("button")
    button.classList = 'btn';
    button.innerText = item.category;
    // add button to categoryContainer
    categoryContainer.appendChild(button)
    
 });

};
loadCatagories();
loadVideos();
