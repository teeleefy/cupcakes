//Show cupcakes on page load
$(window).on( "load", getCupcakes);

const BASE_URL = "/api";

async function getCupcakes(){
    const resp = await axios.get(BASE_URL + '/cupcakes');
    for (let cupcake of resp.data.cupcakes){
        let new_cupcake = makeCupcakeHTML(cupcake);
        $('#cupcakes').append(new_cupcake);
    }
    
}


//===========================================
//Create html for a passed in cupcake object
function makeCupcakeHTML(cupcake){
    return `<div class="pic_section" data-cupcake-id="${cupcake.id}"><li>${cupcake.flavor.toUpperCase()} | Size: ${cupcake.size} | Rating: ${cupcake.rating}<button class="delete_btn">X</button>  </li> <img class="pic" src="${cupcake.image}" alt="image of a cupcake"></div>`
}




//============================================
//Handle deleting cupcake through ajax
$('#cupcakes').on("click", ".delete_btn", deleteCupcake)

async function deleteCupcake(evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.data('cupcake-id');
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
    $cupcake.remove();
}

//================================================
//Handle adding cupcake through ajax

$('#add').on("submit", addCupcake)

async function addCupcake (evt){
    evt.preventDefault();
    let flavor= $("#flavor").val();
    let size=$("#size").val();
    let rating=$("#rating").val();
    let image=$("#image").val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, { flavor , size , rating , image });

    const cupcakeFromData = newCupcakeResponse.data.cupcake;
    let newCupcakeHTML = makeCupcakeHTML(cupcakeFromData);
    $('#cupcakes').append(newCupcakeHTML);
    $('#flavor').val("");
    $('#size').val("");
    $('#rating').val("");
    $('#image').val("");
}
