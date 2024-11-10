const postContainer = document.getElementById("post-cont");
const pervPage = document.getElementById("perv");
const nextPage = document.getElementById("nxt");
const userSearch = document.getElementById('userId')
let postData = [];
let currentPage = 1;
let userPerPage = 10;



userSearch.addEventListener('change',()=>{
    if(userSearch.value === '#'){
        postsRender(postData)
    }
    else{
        
        let filterUser = postData.filter(post=>post.id == userSearch.value)
        PostFilterByUser(filterUser)
    }
    
})

function pervButton() {
  if (currentPage > 1) {
    currentPage--;
    console.log(currentPage);
    fetchPostData();
  }
}

function nextButton() {
  currentPage++;
  console.log(currentPage);
  fetchPostData();
}

function postsRender(posts) {
  postContainer.innerHTML = "";

  posts.forEach((post) => {
    postContainer.append(createCard(post));
  });
}

function createCard({ title, body }) {
  let div = document.createElement("div");
  let heading = document.createElement("h1");
  let paragraph = document.createElement("p");

  div.classList.add("items");
  heading.textContent = `${title}`;
  paragraph.textContent = body;

  div.append(heading, paragraph);

  return div;
}

function userRender(users){
    users.forEach(user=>{
        userSearch.append(drowDownUsers(user))
    })
    
}


function PostFilterByUser(posts){
    postContainer.innerHTML = ''

    posts.forEach(post=>{
        postContainer.append(createCard(post));
    })

}

function drowDownUsers({id,name}){

    let option = document.createElement('option')
    option.textContent = name
    option.value = id


    return option
}

function fetchPostData() {
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&limit=${userPerPage}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Post: Fatching Failed");
      }
      return res.json();
    })
    .then((data) => {
      postData = data;
      postsRender(data);
    })
    .catch((err) => console.log(err.message));
}


function fetchUserData(){
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res=>{
            if(!res.ok){
                throw new Error ('User : Fetching Failed')
            }
            return res.json()
        })
        .then(data=>{
            userRender(data)
        })
        .catch(err=>console.log(err.message))
}

fetchPostData();

fetchUserData()
