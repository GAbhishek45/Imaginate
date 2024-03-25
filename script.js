const grid = document.querySelector(".grid");
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");

const macyInstance = Macy({
  container: grid,
});

const key = "A8XsxjuI1KzRmtIlZ53FD3t-yWMLUP4AqATPjJicrTw";
const api_url = "https://api.unsplash.com";


const addImages = (images)=>{
    images.forEach(image=>{
        const container = document.createElement("div");
        const img = document.createElement("img");

        img.src = image
        container.appendChild(img);


        grid.appendChild(container);
    })
}

const initializeImgs = async () => {
  let {data: images} = await axios.get(
    `${api_url}/photos/?client_id=${key}&per_page=50`
  );

  images = images.map((item,index)=> item.urls.regular)
  addImages(images)
//   console.log(images);
};
initializeImgs();


const searchImgs = async(query)=>{
    let {data:{results:images}} = await axios.get(`${api_url}/search/photos/?client_id=${key}&query=${query}&per_page=50`)


    images = images.map((item,index)=> item.urls.regular)

    return images
}
const removeAllChild = parent =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

const handleSubmit = async event=>{
    event.preventDefault();
    const query = input.value;
    const images = await searchImgs(query);
    addImages(images)
    input.value = "";
    removeAllChild(grid);

    addImages(images);
}


submit.addEventListener("click",handleSubmit);