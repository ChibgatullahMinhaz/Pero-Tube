console.log('connected');
// api urls
const videoApiUrl = 'https://openapi.programming-hero.com/api/phero-tube/videos';
const categoryApiUrl = 'https://openapi.programming-hero.com/api/phero-tube/categories';
const searchQuary = 'https://openapi.programming-hero.com/api/phero-tube/videos?title=shape';
const videDetails = 'https://openapi.programming-hero.com/api/phero-tube/video/aaac';

const activebuttons = () => {
    const allActivebtns =document.querySelectorAll('.active');
allActivebtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        allActivebtns.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    });
});
}

// display category
const displayCategory = (datas) => {
    const Allcategories = datas.categories
    const buttonsContainer = document.getElementById('categoryBtns');
    buttonsContainer.innerHTML = '';
    Allcategories.forEach(category => {
        const div = document.createElement('div');
        activebuttons()

        div.innerHTML = `
                    <button class="btn cursor-pointer  p-4">${category.category}</button>
        `;
        buttonsContainer.appendChild(div);
    });
}
fetchData(categoryApiUrl, displayCategory);


// display videos
const displayVideos = (videos) => {
const allVideos = videos.videos;
console.log(allVideos);
const videoContainer = document.getElementById('cardContainer');
videoContainer.innerHTML = '';
    allVideos.forEach(video => {
        const div = document.createElement('div');
        div.classList.add('card','bg-base-100', 'shadow-sm');
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
                        <h1 class="font-bold text-xl">Building a Winning UX Strategy Using the Kano Model</h1>
                        <p> ${video.authors[0].profile_name}
                            <img src="assets/verified.png" alt="" class="w-4 h-4 inline-block" />
                        </p>
                        <p>${video.others.views} views
                        </p>
                    </div>
                </div>
        `;
        videoContainer.appendChild(div);
    });
} 
fetchData(videoApiUrl, displayVideos);
