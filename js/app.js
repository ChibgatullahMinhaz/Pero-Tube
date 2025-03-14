// api urls
const videoApiUrl = 'https://openapi.programming-hero.com/api/phero-tube/videos';
const categoryApiUrl = 'https://openapi.programming-hero.com/api/phero-tube/categories';

const removeActiveClass = () => {
    const allActivebtns = document.querySelectorAll('.active');
    allActivebtns.forEach(btn => {
        btn.classList.remove('active')
    });
}
    document.getElementById('all_btn').addEventListener('click', (e)=>{
        removeActiveClass()
       e.target.classList.add('active')
       fetchData(videoApiUrl, displayVideos)
    })
// filter by cateogries 
const loadCategoryVideos = (id)=>{
    const categoryApiUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    fetchData(categoryApiUrl, displayCategoryVieos)
    removeActiveClass()
    const clickedButton = document.getElementById(`btn_${id}`);
    clickedButton.classList.add("active");
}

// display category videos
const displayCategoryVieos = (videos)=>{
    const video = videos.category
    const videoContainer = document.getElementById('cardContainer');
    videoContainer.innerHTML = '';
    if (video.length == 0) {
        videoContainer.innerHTML = `
        <div
            class="py-20 col-span-full flex flex-col justify-center items-center text-center"
          >
            <img class="w-[120px]" src="./assets/Icon.png" alt="" />
            <h2 class="text-2xl font-bold">
              Oops!! Sorry, There is no content here
            </h2>
          </div>
        `;

        return;
    }
    video.forEach(video => {
        const div = document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'shadow-sm');
        div.innerHTML = `
        <figure class="relative">
                    <img class="w-full h-[200px] object-cover"
                        src="${video.thumbnail}" alt="${video.title}" />
                    <span class="bg-black text-sm text-white absolute right-2 bottom-2 p-2 rounded">3hrs 56 min
                        ago</span>
                </figure>
                <div class=" flex gap-4 p-0  ">
                    <div class="profile py-2">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 class="font-bold text-xl">${video.title}</h1>
                        <p> ${video.authors[0].profile_name}
                           ${video.authors[0].verified == true ?
                ` <img src="assets/verified.png" alt="" class="w-4 h-4 inline-block" />`
                : ''}
                        </p>
                        <p>${video.others.views} views
                        </p>
                    </div>
                </div>
        `;
        div.addEventListener('click', (e) => {
            showModal(video.video_id);
        })
        videoContainer.appendChild(div);
    });
}
// display category
const displayCategory = (datas) => {
    const Allcategories = datas.categories
    const buttonsContainer = document.getElementById('categoryBtns');
    buttonsContainer.innerHTML = '';
    Allcategories.forEach(category => {
        const div = document.createElement('div');
        removeActiveClass()

        div.innerHTML = `
                    <button id="btn_${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn cursor-pointer p-4">${category.category}</button>
        `;
        buttonsContainer.appendChild(div);
    });
}
fetchData(categoryApiUrl, displayCategory);

// show modal or video details 
const showModal = async(id = '') => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
   const response = await fetch(url);
   const videoDetails = await response.json();
   console.log(videoDetails);

    document.getElementById("video_details").showModal();
    const detailsContainer = document.getElementById("details-container");
  
    detailsContainer.innerHTML = `
     <div class="card bg-base-100 image-full shadow-sm">
    <figure>
      <img
        src="${videoDetails.video.thumbnail}"
        alt="Shoes" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">${videoDetails.video.title}</h2>
      <p class="card-title">${videoDetails.video.description}</p>
      <div class="card-actions justify-end">
        
      </div>
    </div>
  </div>
    `;
}

// display videos
const displayVideos = (videos) => {
    const allVideos = videos.videos;
    const videoContainer = document.getElementById('cardContainer');
    videoContainer.innerHTML = '';
    if (allVideos.length == 0) {
        videoContainer.innerHTML = `
        <div
            class="py-20 col-span-full flex flex-col justify-center items-center text-center"
          >
            <img class="w-[120px]" src="./assets/Icon.png" alt="" />
            <h2 class="text-2xl font-bold">
              Oops!! Sorry, There is no content here
            </h2>
          </div>
        `;

        return;
    }
    allVideos.forEach(video => {
        const div = document.createElement('div');
        div.classList.add('card', 'bg-base-100', 'shadow-sm');
        div.innerHTML = `
        <figure class="relative">
                    <img class="w-full h-[200px] object-cover"
                        src="${video.thumbnail}" alt="${video.title}" />
                    <span class="bg-black text-sm text-white absolute right-2 bottom-2 p-2 rounded">3hrs 56 min
                        ago</span>
                </figure>
                <div class=" flex gap-4 p-0  ">
                    <div class="profile py-2">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 class="font-bold text-xl">${video.title}</h1>
                        <p> ${video.authors[0].profile_name}
                           ${video.authors[0].verified == true ?
                ` <img src="assets/verified.png" alt="" class="w-4 h-4 inline-block" />`
                : ''}
                        </p>
                        <p>${video.others.views} views
                        </p>
                    </div>
                </div>
        `;
        div.addEventListener('click', (e) => {
            showModal(video.video_id);
        })
        videoContainer.appendChild(div);
    });
}
fetchData(videoApiUrl, displayVideos);


const Searching = () => {
    document.getElementById('search').addEventListener('input', (e) => {
        const searchQuary = e.target.value;
        const searchUrl = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchQuary}`;
        fetchData(searchUrl, displayVideos);
    });

}

Searching();