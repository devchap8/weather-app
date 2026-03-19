import "./style.css";
import { ApiManager } from "./apiManager.js";
import { IconImports } from "./iconImports.js";
import { DataHandling } from "./dataHandling.js";
import { DomManager } from "./domManager.js";

const citySearchForm = document.querySelector(".citySearchForm");
const dailyHourlyButton = document.querySelector(".dailyHourlyButton");
const tempFormatButton = document.querySelector(".tempFormatButton");
const searchScreenButton = document.querySelector(".searchScreenButton");
const homepageTop = document.querySelector(".homepageTop");
const homepageMiddle = document.querySelector(".homepageMiddle");
const homepageBottom = document.querySelector(".homepageBottom");
const errorMessage = document.querySelector(".errorMessage");

// Event Listeners / Init Functions

const displayCityInfoFromSearch = async (event) => {
    event.preventDefault();
    const citySearchFormData = new FormData(citySearchForm);
    const newCityName = citySearchFormData.get("addressInput");
    if(displayCityInfo(newCityName)) {
        hideSearchScreen();
        DomManager.hideErrorMessage();
    } else {
        DomManager.showErrorMessage();
    }
}

const displayCityInfo = async (newCityName) => {
    let weatherData;
    DomManager.toggleLoadingScreen();
    try {
        weatherData = await ApiManager.fetchWeatherInfo(newCityName);
    } catch (err) {
        return false;
    } finally {
        DomManager.toggleLoadingScreen();
    }
    const extractedData = DataHandling.extractWeatherData(weatherData);
    DataHandling.currentData.currentData = extractedData;
    DomManager.showWeatherInfo(extractedData);
    DataHandling.currentData.dailyBool
        ? DomManager.displayDailyDivs(extractedData) 
        : DomManager.displayHourlyDivs(extractedData);
    return true;
}  

const toggleDailyHourly = () => {
    const data = DataHandling.currentData.currentData;
    if(DataHandling.currentData.dailyBool) {
        DataHandling.currentData.dailyBool = false;
        DomManager.displayHourlyDivs(data);
    } else {
        DataHandling.currentData.dailyBool = true;
        DomManager.displayDailyDivs(data);
    }
}

const toggleFarCel = () => {
    DataHandling.convertTemps();
    const data = DataHandling.currentData.currentData;
    DataHandling.currentData.tempInF = !DataHandling.currentData.tempInF;
    DomManager.changeTempFormatButtonContents(DataHandling.currentData.tempInF);
    DomManager.showWeatherInfo(DataHandling.currentData.currentData);
    DataHandling.currentData.dailyBool
        ? DomManager.displayDailyDivs(data)
        : DomManager.displayHourlyDivs(data);
}

const showSearchScreen = () => {
    DomManager.toggleHomepageBlur();
    removeHomescreenElementEventListeners();
    DomManager.toggleSearchScreen();
    setTimeout(() => {
        addFullHomescreenEventListener();
    }, 300);
}

const hideSearchScreen = () => {
    DomManager.toggleHomepageBlur();
    addHomescreenElementEventListeners();
    DomManager.toggleSearchScreen();
    removeFullHomescreenEventListener();
    addressInput.value = "";
}

const displayDefaultInfo = () => {
    displayCityInfo("New York City");
}

const addHomescreenElementEventListeners = () => {
    dailyHourlyButton.addEventListener("click", toggleDailyHourly);
    tempFormatButton.addEventListener("click", toggleFarCel);
    searchScreenButton.addEventListener("click", showSearchScreen);
}
const removeHomescreenElementEventListeners = () => {
    dailyHourlyButton.removeEventListener("click", toggleDailyHourly);
    tempFormatButton.removeEventListener("click", toggleFarCel);
    searchScreenButton.removeEventListener("click", showSearchScreen);
}

const addFullHomescreenEventListener = () => {
    homepageTop.addEventListener("click", hideSearchScreen);
    homepageMiddle.addEventListener("click", hideSearchScreen);
    homepageBottom.addEventListener("click", hideSearchScreen);
}
const removeFullHomescreenEventListener = () => {
    homepageTop.removeEventListener("click", hideSearchScreen);
    homepageMiddle.removeEventListener("click", hideSearchScreen);
    homepageBottom.removeEventListener("click", hideSearchScreen);
}

const setupEventListeners = () => {
    citySearchForm.addEventListener("submit", displayCityInfoFromSearch);
    addHomescreenElementEventListeners();
}

const init = () => {
    setupEventListeners()
    displayDefaultInfo();
}

init();

// auto complete api
// built from this tutorial: https://www.geoapify.com/tutorial/address-input-for-address-validation-and-address-verification-forms-tutorial/

function addressAutocomplete(containerElement, callback, options) {

  const MIN_ADDRESS_LENGTH = 3;
  const DEBOUNCE_DELAY = 300;

  // create container for input element
  const inputContainerElement = document.createElement("div");
  inputContainerElement.classList.add("input-container");
  containerElement.appendChild(inputContainerElement);

  // create input element
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "text");
  inputElement.setAttribute("placeholder", options.placeholder);
  inputElement.setAttribute("name", "addressInput");
  inputElement.setAttribute("id", "addressInput");
  inputElement.setAttribute("autocomplete", "off");
  inputContainerElement.appendChild(inputElement);

  // add input field clear button
  const clearButton = document.createElement("div");
  clearButton.classList.add("clear-button");
  addIcon(clearButton);
  function clearSearch(e) {
    e.stopPropagation();
    inputElement.value = '';
    callback(null);
    clearButton.classList.remove("visible");
    closeDropDownList();
  }
  clearButton.addEventListener("click", clearSearch);
  
  inputContainerElement.appendChild(clearButton);

  /* We will call the API with a timeout to prevent unneccessary API activity.*/
  let currentTimeout;

  /* Save the current request promise reject function. To be able to cancel the promise when a new request comes */
  let currentPromiseReject;

  /* Focused item in the autocomplete list. This variable is used to navigate with buttons */
  let focusedItemIndex;

  /* Process a user input: */
  let currentItems;
  inputElement.addEventListener("input", function(e) {
    const currentValue = this.value;

    /* Close any already open dropdown list */
    closeDropDownList();


    // Cancel previous timeout
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }

    // Cancel previous request promise
    if (currentPromiseReject) {
      currentPromiseReject({
        canceled: true
      });
    }

    if (!currentValue) {
      clearButton.classList.remove("visible");
    }

    // Show clearButton when there is a text
    clearButton.classList.add("visible");

    // Skip empty or short address strings
    if (!currentValue || currentValue.length < MIN_ADDRESS_LENGTH) {
      return false;
    }

    /* Call the Address Autocomplete API with a delay */
    currentTimeout = setTimeout(() => {
      currentTimeout = null;

      /* Create a new promise and send geocoding request */
      const promise = new Promise((resolve, reject) => {
        currentPromiseReject = reject;

        // The API Key provided is restricted to JSFiddle website
        // Get your own API Key on https://myprojects.geoapify.com
        const apiKey = "0bc7786d27934aee9154683c8906abf4";

        var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(currentValue)}&format=json&limit=5&apiKey=${apiKey}`;

        fetch(url)
          .then(response => {
            currentPromiseReject = null;

            // check if the call was successful
            if (response.ok) {
              response.json().then(data => resolve(data));
            } else {
              response.json().then(data => reject(data));
            }
          });
      });

      promise.then((data) => {
        // here we get address suggestions
        currentItems = data.results;

        /*create a DIV element that will contain the items (values):*/
        const autocompleteItemsElement = document.createElement("div");
        autocompleteItemsElement.setAttribute("class", "autocomplete-items");
        inputContainerElement.appendChild(autocompleteItemsElement);

        /* For each item in the results */
        data.results.forEach((result, index) => {
          /* Create a DIV element for each element: */
          const itemElement = document.createElement("div");
          /* Set formatted address as item value */
          itemElement.innerHTML = result.formatted;
          autocompleteItemsElement.appendChild(itemElement);

          /* Set the value for the autocomplete text field and notify: */
          itemElement.addEventListener("click", function(e) {
            inputElement.value = currentItems[index].formatted;
            callback(currentItems[index]);
            /* Close the list of autocompleted values: */
            closeDropDownList();
          });
        });

      }, (err) => {
        if (!err.canceled) {
          alert(err);
        }
      });
    }, DEBOUNCE_DELAY);
  });

  /* Add support for keyboard navigation */
  inputElement.addEventListener("keydown", function(e) {
    var autocompleteItemsElement = containerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      var itemElements = autocompleteItemsElement.getElementsByTagName("div");
      if (e.keyCode == 40) {
        e.preventDefault();
        /*If the arrow DOWN key is pressed, increase the focusedItemIndex variable:*/
        focusedItemIndex = focusedItemIndex !== itemElements.length - 1 ? focusedItemIndex + 1 : 0;
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.keyCode == 38) {
        e.preventDefault();

        /*If the arrow UP key is pressed, decrease the focusedItemIndex variable:*/
        focusedItemIndex = focusedItemIndex !== 0 ? focusedItemIndex - 1 : focusedItemIndex = (itemElements.length - 1);
        /*and and make the current item more visible:*/
        setActive(itemElements, focusedItemIndex);
      } else if (e.keyCode == 13) {
        /* If the ENTER key is pressed and value as selected, close the list*/
        e.preventDefault();
        if (focusedItemIndex > -1) {
          closeDropDownList();
        }
      }
    } else {
      if (e.keyCode == 40) {
        /* Open dropdown list again */
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        inputElement.dispatchEvent(event);
      }
    }
  });

  function setActive(items, index) {
    if (!items || !items.length) return false;

    for (var i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }

    /* Add class "autocomplete-active" to the active element*/
    items[index].classList.add("autocomplete-active");

    // Change input value and notify
    inputElement.value = currentItems[index].formatted;
    callback(currentItems[index]);
  }

  function closeDropDownList() {
    const autocompleteItemsElement = inputContainerElement.querySelector(".autocomplete-items");
    if (autocompleteItemsElement) {
      inputContainerElement.removeChild(autocompleteItemsElement);
    }

    focusedItemIndex = -1;
  }

  function addIcon(buttonElement) {
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    svgElement.setAttribute('viewBox', "0 0 24 24");
    svgElement.setAttribute('height', "24");

    const iconElement = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    iconElement.setAttribute("d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
    iconElement.setAttribute('fill', 'currentColor');
    svgElement.appendChild(iconElement);
    buttonElement.appendChild(svgElement);
  }
  
    /* Close the autocomplete dropdown when the document is clicked. 
      Skip, when a user clicks on the input field */
  document.addEventListener("click", function(e) {
    if (e.target !== inputElement) {
      closeDropDownList();
    } else if (!containerElement.querySelector(".autocomplete-items")) {
      // open dropdown list again
      var event = document.createEvent('Event');
      event.initEvent('input', true, true);
      inputElement.dispatchEvent(event);
    }
  });
}

addressAutocomplete(document.getElementById("autocomplete-container"), (data) => {

}, {
  placeholder: "Search your country, city, state, address, etc."
});

// select addressInput at bottom so it is selected after initialization
const addressInput = document.querySelector("input");
init();
