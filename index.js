let newUser = localStorage.getItem("myLeadTrackerData") ? false : true;
let leadsData = []

if (!newUser) {
    let savedData = localStorage.getItem("myLeadTrackerData");
    leadsData = JSON.parse(savedData)
}

let textInput = document.getElementById("input_el");
let display = document.getElementById("output_el");

let saveInputBtn = document.getElementById("save-input-btn");
let saveTabBtn = document.getElementById("save-tab-btn");
let deleteAllBtn = document.getElementById("delete-btn");

window.onload = renderData();

saveInputBtn.addEventListener("click", ()=>{
   if (textInput.value.trim() != ""){
    leadsData.push(textInput.value);
    localStorage.setItem("myLeadTrackerData", JSON.stringify(leadsData));
    renderData();
   }
   textInput.value = "";
})
saveTabBtn.addEventListener("click", ()=>{
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        leadsData.push(tabs[0].url);
        localStorage.setItem("myLeadTrackerData", JSON.stringify(leadsData));
        renderData();
    });
})
deleteAllBtn.addEventListener("click", ()=>{
    leadsData = [];
    localStorage.removeItem("myLeadTrackerData");
    renderData();
})
function renderData(){
    let displayText = "" 
    leadsData.map(data => {
     displayText += `<li> <a target='_blank' href='${data}'> ${data} \n</a>`;
    })
    display.innerHTML = displayText;
    display.style.cssText = "display: block";
 }