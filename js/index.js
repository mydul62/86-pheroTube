const videoCardContent = document.getElementById('video_area'); // Video content area
const itemErrorContent = document.getElementById('item_not_found'); // Item not found error message

// Function to load categories
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/videos/categories";
  let res = await fetch(url);
  let data = await res.json();
  const categories = data.data;
  const buttonContainer = document.getElementById("search-item-btn"); // Button container
  categories.forEach((data) => {
    let button = document.createElement("button");
// Category button
    button.innerText = data.category;
    button.classList.add(
      "categoryBtn", 
      "bg-[#cccccca0]",
      "btn-primary",
      "py-2",
      "px-5",
      "rounded-md",
      "text-black"
    );
    buttonContainer.appendChild(button);
    button.addEventListener('click' ,()=>{
      videoCardContent.innerHTML =''; // Clear video content
      LoadVideo(data.category_id)
      const allBtn = document.getElementsByClassName('categoryBtn'); // All category buttons
      for(let btn of allBtn){
        btn.classList.remove('bg-red-600')
      }
      button.classList.add('bg-red-600')
      
    })
  });
};



let selectedCategory =1000;
let sorted = false;
//  video sort handlar fanction 
const handleSort=()=>{
  sorted =true;
  LoadVideo(selectedCategory,sorted)
}
// Function to load videos
const LoadVideo = async (id,sorted) => {
  selectedCategory = id;
  const url = `https://openapi.programming-hero.com/api/videos/category/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  const videoData = data.data;

  // sort video by view 
  if(sorted){
        videoData.sort((a,b)=>{
          const firstVideo = a.others?.views;
          const secondVideo = b.others?.views;
          firstVideoView = parseFloat(firstVideo.replace('K', '')) || 0;
          secondVideoView = parseFloat(secondVideo.replace('K', '')) || 0;
          return secondVideoView - firstVideoView;
        })
  }
  if(videoData.length ===0){
    itemErrorContent.classList.remove('hidden') // Remove hidden class if no videos found
  }else{
    itemErrorContent.classList.add('hidden') // Add hidden class if videos found
  }
  let innerHTML = [];
  videoData?.forEach((item)=>{
    let verifiedBatch = '';
    if(item?.authors[0].verified){
      verifiedBatch = `<img class="w-7" src="images/social-media.png" alt="" />`
    }
      innerHTML +=`
      <div class="card card-compact  w-full bg-base-100 shadow-xl box-border">
            <div>
              <img class="w-full h-[200px]" src="${item.thumbnail}" alt="Shoes" /> 
            </div>
            <div class="flex  flex-row gap-3 pl-2 my-4"> 
              <div class="w-9 h-9 rounded-full"> 
                <img class="h-9 w-9 rounded-full" src="${item.authors[0].profile_picture}" alt="" /> 
              </div>
              <div class="flex-1 space-y-4">
                <h2 class="card-title text-[18px] lg:text-2xl "> 
                 ${item.title}
                </h2>
                <div class=""> 
                <div class=" flex gap-3">
                  <h5>${item.authors[0].profile_name}</h5>
                  <div class="verified"> 
                    ${verifiedBatch}
                  </div>
                </div>
                <h5>${item.others.views} views</h5> 
              </div>
              </div>
            </div>
          </div>
      `
  });
  videoCardContent.innerHTML = innerHTML;
};


loadCategories();
LoadVideo(selectedCategory)
