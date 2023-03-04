const loadData = async () => {
    loadSpinner(true);
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    dispayItems(data.data.tools.slice(0, 6))
}

const dispayItems = (tools) => {
    tools.innerHTML = ''
    console.log(tools)
    const mainId = document.getElementById('main-id');

    tools.forEach(tool => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML = `
    <div class="card h-100">
        <img src="${tool.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Features</h5>
            <div class="ms-1">
                <p>1. ${tool.features[0]}</p>
                <p>2. ${tool.features[1]}</p>
                <p>3. ${tool.features[0]}</p>
            </div>
        </div>

        <!-- card-footer  -->
        <div class="card-footer">
            <div class="d-flex justify-content-between align-items-center p-2">
                <div>
                    <h5>${tool.name}</h5>
                    <p><i class="fa-regular fa-calendar-days"></i> ${tool.published_in}</p>
                </div>
                <div>
                    <div style="width:35px; height:35px;"
                        class="bg-danger bg-opacity-10 rounded-5 d-flex justify-content-center align-items-center">
                        <button onclick="toolsInfo('${tool.id}')"
                            class="border border-0 rounded-5 btn btn-outline-danger bg-opacity-10 "
                            data-bs-toggle="modal" data-bs-target="#toolsmodal"><i
                                class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `

        mainId.appendChild(aiDiv);

    })
    loadSpinner(false)

}
const loadSpinner = isLoad => {
    const spinner = document.getElementById('loader');
    if (isLoad) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none')
    }
}
const toolsInfo = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data)
}
const displayDetails = tools => {
    console.log(tools)
    const loadDetails = document.getElementById('details-add');
    const parent = document.getElementById('parent');
    parent.innerHTML = '';
    const addedChild = document.createElement('div');
    addedChild.innerHTML = `
    <h4>${tools.description}</h4>
    <div class="d-flex justify-content-between align-items-center gap-2 mb-3">
        <div style="height:80px;" class="w-100 bg-white border text-success rounded-3 p-2 m-auto">
            ${tools?.pricing?.[0].price ? tools?.pricing?.[0]?.price : 'No data found'} <br> ${tools?.pricing?.[0].plan
            ? tools?.pricing?.[0].plan : 'no data found'}</div>

        <div style="height:80px;" class="w-100  bg-white border text-success rounded-3 p-2 m-auto">
            ${tools?.pricing?.[1].price ? tools?.pricing?.[1].price : 'No data Found'} <br> ${tools?.pricing?.[1].plan ?
            tools?.pricing?.[1].plan : 'no data Found'}</div>

        <div style="height:80px;" class="w-100 bg-white border text-success rounded-3 p-2 m-auto">
            ${tools?.pricing?.[2].price ? tools?.pricing?.[2].price : 'no data Found'} <br> ${tools?.pricing?.[2].plan ?
            tools?.pricing?.[2].plan : 'no data found'}</div>
    </div>

    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h5>Features</h5>
            <p>1. ${tools?.features?.[1]?.feature_name}</p>
            <p>2. ${tools?.features?.[2]?.feature_name}</p>
            <p>3. ${tools?.features?.[3]?.feature_name}</p>
        </div>
        <div>
            <h5>Integrations</h5>
            <ul class="list-unstyled">
                <li>${tools?.integrations?.[0] ? tools.integrations[0] : ''}</li>
                <li>${tools?.integrations?.[1] ? tools.integrations[1] : ''}</li>
                <li>${tools?.integrations?.[2] ? tools.integrations[2] : ''}</li>
                <li>${tools?.integrations?.[3] ? tools.integrations[3] : ''}</li>
                <li class="list-unstyled">${tools?.integrations?.[4] ? tools.integrations[4] : ''}</li>
            </ul>
        </div>
     
    `
    parent.appendChild(addedChild);

    const detailsContainer = document.getElementById('image-add');
    detailsContainer.innerHTML = `

    <div>
    <img class="img-fluid w-100 rounded-3 mb-3 accuracy-p" src="${tools?.image_link?.[0] ? tools?.image_link?.[0] : 'no image found'}">
    
    <p style="width:50px;" class="text-center bg-danger rounded-3 text-white terimaka">${tools?.accuracy?.score ? tools.accuracy.score : ''}</p>
    </div>
    <h3 class="text-center mb-3">${tools?.input_output_examples[0]?.input ? tools?.input_output_examples[0]?.input : 'comming soon'}</h3>
    <p class="text-center mb-3">${tools?.input_output_examples[0]?.output ? tools?.input_output_examples[0]?.output : 'no data found'}</p>
    `
}

const displayAllData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            dispayItems(data.data.tools)
        });
    const loadBtn = document.getElementById("show-btn");
    loadBtn.style.display = 'none'
    parent.style.display = 'none'
};

loadData();