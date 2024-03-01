const videoCardContent = document.getElementById('video_area');
const itemErrorContent= document.getElementById('item_not_found');

const loadCatagoris = async () => {
  const url = " https://openapi.programming-hero.com/api/videos/categories";
  let res = await fetch(url);
  let data = await res.json();
  const catagoris = data.data;
  const buttonContainer = document.getElementById("search-item-btn");
  catagoris.forEach((data) => {
    let button = document.createElement("button");

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
      videoCardContent.innerHTML ='';
      LoadVideo(data.category_id)
      const allBtn = document.getElementsByClassName('categoryBtn');
      for(let btn of allBtn){
        btn.classList.remove('bg-red-600')
      }
      button.classList.add('bg-red-600')
      
    })
  });
};


let selectedCategory =1000;
const LoadVideo = async (id) => {
  selectedCategory = id;
  const url = ` https://openapi.programming-hero.com/api/videos/category/${id}`;
  let res = await fetch(url);
  let data = await res.json();
  const videoData = data.data;
  if(videoData.length ===0){
    itemErrorContent.classList.remove('hidden')
  }else{
    itemErrorContent.classList.add('hidden')

  }
  videoData.forEach((item)=>{
    let verifiedBatch = '';
    if(item.authors[0].verified){
      verifiedBatch = `<img class="w-7" src="images/social-media.png" alt="" />`
    }
      videoCardContent.innerHTML +=`
      <div class="card card-compact w-full bg-base-100 shadow-xl">
            <div>
              <img class="w-full h-[200px]" src="${item.thumbnail}" alt="Shoes" />
            </div>
            <div class="flex  flex-row gap-3 my-4">
              <div class="w-9 h-9 rounded-full">
                <img class="h-9 w-9 rounded-full" src=" ${item.authors[0].profile_picture}" alt="" />
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
                <h5>${item.others.views} viwes</h5>
              </div>
              </div>
            </div>
              
          </div>
      `
  });

};


loadCatagoris();
LoadVideo(selectedCategory)