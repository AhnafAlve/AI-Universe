const loadAi = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    dispayItems(data.data.tools);
}

const dispayItems = items =>{
    const aiContainer = document.getElementById('AI-container');
    items.forEach(item => {
        const aiDiv = document.createElement('div');
        aiDiv.classList.add('col');
        aiDiv.innerHTML=`
        <div class="card p-4">
        <img src="${item.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
    </div>
        `
        aiContainer.appendChild(aiDiv);
    });
    
}

loadAi();

