
const getData = async () => {
    const accessKey = "81464f18ce8e258b81ed0a8a7584e5a3";
    let response = await fetch(`http://api.coinlayer.com/api/live?access_key=${accessKey}`);
    let data = await response.json();
    return data;
}


const DOMElements = {
    cryptoList : ".crypto-card-div",
    subtitle : ".subtitle"
}


const createList = ( name, rate ) => {
    const html = `
        <div class="card col-lg-12 col-md-6 col-sm-3 bg-danger text-white">
            <div class="card-body">
                <h5 class="title">${name}</h5>
                <p class="text">${rate}</p>
            </div>
        </div>
    `;
    document.querySelector(DOMElements.cryptoList).insertAdjacentHTML('beforeend', html);
}

const updateSubtitle = ( count ) => {
    const html = `
        <h6 class="lead">Current rates on ${count} crypto currencies</h6>
    `;
    document.querySelector(DOMElements.subtitle).insertAdjacentHTML('beforeend', html);
}


const loadData = async () => {
    const cryptos = await getData();
    let count = 0;
    let cryptoList = cryptos['rates'];
    for (const crypto in cryptoList) {
        createList(crypto, cryptoList[crypto]);
        count ++;
    }

    updateSubtitle(count);
}

const clearData = () => {
    document.querySelector(DOMElements.cryptoList).innerHTML = '';
}

loadData();