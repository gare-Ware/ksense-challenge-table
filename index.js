const mainContent = document.getElementById("main-content")
const postsContainer = document.getElementById("posts-container")


async function getUsers() {
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    let users = await response.json()
    return users
}

async function getPosts(userName, userID) {
    let response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userID}`)
    let posts = await response.json()
    return posts.map(post => ({
        username: userName,
        title: post.title,
        body: post.body
    }))
}

function getUserHtml(userData) {
    const { name, username, email, website, id } = userData
    return  `
        <tr>
            <td id=${`user-${id}`}><a href="#posts-container">${name}</a></td>
            <td>@${username}</td>
            <td>${email}</td>
            <td>${website}</td>
        </tr>
    `
}

function displayUsers(users) {
    mainContent.innerHTML = `
        <h1 class="main-header">Ksense</h1>
        <table>
            <tr class="table__headers">
                <th>User</th>
                <th>Username</th>
                <th>Email</th>
                <th>Website</th>
            </tr>
                ${users.map(getUserHtml).join('')}
        </table>
    `
    for(let i of users){
        document.getElementById(`user-${i.id}`).onclick = () => {
            getPosts(i.name,i.id)
                .then(displayPosts)
                .catch(e => console.log(`Error: ${e}`))
        }
    }

    getPosts(users[0].name, users[0].id)
        .then(displayPosts)
        .catch(e => console.log(`Error: ${e}`))
}

function getPostHtml(posts){
    const { username, title, body } = posts
    return `
        <div class="card">
            <h1>${title}</h1>
            <h3>by ${username}</h3>
            <p>${body}<p>
        </div>
    `
}

function displayPosts(posts) {
    postsContainer.innerHTML = posts.map(getPostHtml).join('')
}

getUsers()
    .then(displayUsers)
    .catch(e => console.log(`Error: ${e}`))

