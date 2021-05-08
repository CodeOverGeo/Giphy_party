//hard code beta api key
const apiKey = 'bqLZsFZg6F00D4glflHXjgzuFWRrF73j';

//create async function to retreive gif from giphy api
async function getGif(q, api_key) {
  try {
    //make sure to match params names with params listed in api
    const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: { q, api_key },
    });

    //drill down to desired image style
    return res.data.data[0].images.fixed_height.url;
  } catch (e) {
    const query = document.querySelector('#gif-query');
    query.placeholder = 'try again';
  }
}

const form = document.querySelector('#search');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const input = document.querySelector('#gif-query');
  //prevent empty submissions
  if (input.value === '') {
    return;
  }
  //call api retrieve function and pass it into append function
  appendGif(getGif(input.value, apiKey));
  input.value = '';
});

async function appendGif(url) {
  if ((await url) == undefined) {
    return;
  }
  const imgDiv = document.querySelector('#images');
  newImg = document.createElement('img');
  //wait for url to be returned before assigning value
  newImg.src = await url;
  imgDiv.append(newImg);
}

const clear = document.querySelector('#clear');

//clear the div that holds the images
clear.addEventListener('click', function (e) {
  const imgDiv = document.querySelector('#images');
  imgDiv.innerHTML = '';
});
