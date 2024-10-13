//    json-server --watch backend/videos.json

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostraVideo() {
  try {
    const busca = await fetch("http://localhost:3000/videos"); // chamando API, E AWait eseprando retorno do video
    const videos = await busca.json();

    videos.forEach((video) => {
      if (video.url == "") {
        throw new Error(" Video não tem categoria :( ");
      }
      containerVideos.innerHTML += `
                        <li class="videos__item">
                            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                            <div class="descricao-video">
                                <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
                                <h3 class="titulo-video">${video.titulo}</h3>
                                <p class="titulo-canal">${video.descricao}</p>
                                <p class="categoria"hidden> ${video.categoria}</p>
                            </div> 
                        </li>
                    `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p style="color: red; " > color: red Houver um erro ao carregar os videos ${error} </p>`; // apresenta msg de erro ao ususario se api da pau
  }
}

buscarEMostraVideo();

const BarraDePesquisa = document.querySelector(".pesquisar__input");

BarraDePesquisa.addEventListener("input", filtrarPesquisar);

function filtrarPesquisar() {
    const videos = document.querySelectorAll(".videos__item");

    if(BarraDePesquisa.value != ""){
        for(let video of videos){
          let titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
          let valorFiltro = BarraDePesquisa.value.toLowerCase()

          if(!titulo.includes(valorFiltro)){
            video.style.display = "none"
          }else{
            video.style.display = "block"
          }
        }
    } else{
      video.style.display = "block"
    }
      
}    





const BotaoCategoria = document.querySelectorAll('.superior__item')

BotaoCategoria.forEach((botao)=>{
  let nomeCategoria = botao.getAttribute("name")
  botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria))
})

function filtrarPorCategoria(filtro){
  const videos = document.querySelectorAll(".videos__item")

  for(let video of videos){
    let categoria = video.querySelector(".categoria").textContent.toLowerCase()
    let valorFiltro = filtro.toLowerCase()

    if(! categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
        video.style.display = "none";
    }else{
      video.style.display = "block"
    }
  }
}
