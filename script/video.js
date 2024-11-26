function getTime(time) {
    let hour = parseInt(time / 3600);          
    let minute = parseInt((time % 3600) / 60); 
    let second = time % 60;   
    
    return `${hour} hour ${minute} min ${second} sec ago`;
}
const removeActiveClass =() =>{
    const buttons = document.getElementsByClassName("category-btn")
    console.log(buttons)
     for(let btn of buttons){
        btn.classList.remove("active")
    }
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
const loadVideos = (searchText ="") => {
    // fetch the data
// create load
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};
const loadCatagoryVideos= (id) =>{
    // alert (id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`)
        activeBtn.classList.add("active")
        displayVideos(data.category)
    })
    .catch((error) => console.log(error));
}
const loadDetails = async (videoId) => {
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    const res = await fetch(uri)
    const data = await res.json();
    displayDetails(data.video)
}
const displayDetails = (video) =>{
    console.log(video)
    const modalContainer = document.getElementById("modal-content")
    modalContainer.innerHTML=`
    <img src=${video.thumbnail}/>
    <p>${video.description}</p>
    `
    document.getElementById("customModal").showModal()
}
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML= "";
    if(videos.length == 0){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML=`
        <div class = "min-h-screen flex flex-col justify-center items-center">
        <img class ="h-20 w-20 object-contain " src="asset/Icon.png" />
        <h2 class ="text-center text-xl font-bold">
        No Video Here In This Category
        </h2>
        </div>
        `
        return
    }
    else{
        videoContainer.classList.add("grid")
    }
    videos.forEach((video) =>{
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
        ` <span class="absolute right-2 bottom-2 bg-black text-xs text-white rounded p-1 " >
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
            
            <p><btn onclick="loadDetails('${video.video_id}')" class ="btn btn-sm btn-error">Details</btn> </p>
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
    const buttonContainer = document.createElement("div")
    buttonContainer.innerHTML=
    `
    <button id="btn-${item.category_id}" onclick = "loadCatagoryVideos(${item.category_id})" class="btn category-btn">
    ${item.category}
    </button>
    `
    // add button to categoryContainer
    categoryContainer.appendChild(buttonContainer)
    });
};
document.getElementById("search-input").addEventListener("keyup", (e) =>{
    loadVideos(e.target.value)
})
loadCatagories();
loadVideos();
