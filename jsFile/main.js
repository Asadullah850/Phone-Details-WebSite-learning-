
const loadData = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res =await fetch(url);
    const data =await res.json();
    displayData(data.data, dataLimit);
}

const displayData = (phones, dataLimit) =>{
    // console.log(phones);

    const container = document.getElementById('phoneContainer');
    container.textContent = '';
    // card conut 
    const showAll = document.getElementById('showAllPhoneDiv');

    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0,12);
        
        // showAll.classList.remove('hidden')
        showAll.classList.remove('hidden')
    }
    else{
        showAll.classList.add('hidden')
    }
    
    const noPhone = document.getElementById('noElement');
    if(phones.length === 0){
        noPhone.classList.remove('hidden')
    }
    else{
        noPhone.classList.add('hidden')
    }

    phones.forEach(element => {
        const phoneDiv = document.createElement('div');
        phoneDiv.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure><img class="" src="${element.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">
                ${element.phone_name}
                <div class="badge badge-secondary">NEW</div>
            </h2>
            <p>${element.brand}</p>
            <p>${element.slug}</p>
            <div class="card-actions justify-end">
            <!-- The button to open modal -->
            <label onclick="loadePhoneDetails('${element.slug}')" for="modal" class="btn btn-secondary">Details</label>
            </div>
        </div>
    </div>
`; container.appendChild(phoneDiv)
    });
    toggleSpinner(false)

}

const searchProcess = (dataLimit) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('searchInput');
    const searchText = searchField.value;
   
    loadData(searchText, dataLimit)
}


document.getElementById('searchButt').addEventListener('click',function() {
    // toggleSpinner(true)
    searchProcess(10)  
    
})

// search field
document.getElementById('searchInput').addEventListener('keyup',function(e){
    // console.log(e.key);
    if (e.key === "Enter") {
        searchProcess(10)
    }
})

// spinner function
const toggleSpinner = isLoading => {
    const id = document.getElementById('progress');
    if (isLoading) {
        id.classList.remove('hidden')
    }
    else{
        id.classList.add('hidden')
    }
}
// not best way
document.getElementById('show-all-Butt').addEventListener('click',function(){
searchProcess()
})

const loadePhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    phoneModalDeatils(data.data)
}

const phoneModalDeatils = (phone) =>{
    console.log(phone);

    // const modalTital = document.getElementById('modatTital');
    // modalTital.innerText = phone.name;
    // const modalImg = document.getElementById('modalImg');
    // modalImg.src = phone.image;
  

    const modalBody = document.getElementById('modataContain');
    modalBody.innerHTML =`
    <label for="modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <h3 id="modatTital" class="text-lg font-bold py-2">Phone Name: ${phone.name}</h3>
    <img id="modalImg" class="w-[50%] mx-auto" src="${phone.image}" alt="Shoes" />
    <p id="modalBrand" class="py-2 mx-2 text-lg font-bold">${phone.brand}</p>
    <div class="flex justify-evenly ">
      <p id="releaseDate" class="mx-2">Release ${phone.releaseDate ? phone.releaseDate : "no Release Date Found"}</p>
      <p id="modalSlug" class="mx-2">${phone.slug}</p>
    </div>
    <p class="mx-2 mt-4">Display ${phone.mainFeatures.displaySize} Memory: ${phone.mainFeatures.memory} 
    Storage: ${phone.mainFeatures.storage}</p>

    `

    console.log(phone);
}

loadData('apple',10)



