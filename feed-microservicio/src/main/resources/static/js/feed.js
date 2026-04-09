function abrirModal(){
document.getElementById("modal").style.display="flex"
}

function cerrarModal(){
document.getElementById("modal").style.display="none"
}

let zoom = 1

function abrirImagen(src){

const viewer=document.getElementById("imageViewer")
const img=document.getElementById("imagenGrande")

zoom = 1
img.style.transform="scale(1)"

img.src=src
viewer.style.display="flex"

}

function cerrarImagen(){

const viewer=document.getElementById("imageViewer")
viewer.style.display="none"

}

async function publicar(){

const texto=document.getElementById("texto").value
const imagen=document.getElementById("imagen").files[0]

const formData=new FormData()

formData.append("texto",texto)

if(imagen){
formData.append("imagen",imagen)
}

await fetch("/api/feed/post",{
method:"POST",
body:formData
})

cerrarModal()

document.getElementById("texto").value=""
document.getElementById("imagen").value=""

cargarPosts()

}

async function cargarPosts(){

const response=await fetch("/api/feed/posts")

const posts=await response.json()

const feed=document.getElementById("feed")

feed.innerHTML=""

posts.forEach(post=>{

const card=document.createElement("div")

card.className="post"

card.innerHTML=`
<div class="post-text">${post.texto ?? ""}</div>

${post.imagenUrl ? `<img src="${post.imagenUrl}?t=${Date.now()}" class="post-img" onclick="abrirImagen('${post.imagenUrl}')">` : ""}

<div class="post-date">${post.fechaPublicacion}</div>
`

feed.appendChild(card)

})

}

document.addEventListener("wheel",function(e){

const viewer=document.getElementById("imageViewer")

if(viewer.style.display!=="flex") return

const img=document.getElementById("imagenGrande")

if(e.deltaY < 0){
zoom += 0.1
}else{
zoom -= 0.1
}

if(zoom < 1) zoom = 1
if(zoom > 5) zoom = 5

img.style.transform=`scale(${zoom})`

})

window.onload=cargarPosts