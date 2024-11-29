// declarations
var siteName = document.getElementById("siteName");
var siteURL = document.getElementById("siteURL");
var submit = document.getElementById("submit");
const visitBtn = document.getElementById("visitBtn");
var deletBtn = document.getElementById("deletBtn");
var siteList = [];
const nameRegex = /^.{3,}$/;
const urlRegex =
	/^(https?:\/\/)?([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}([\/\w\-._~:?#\[\]@!$&'()*+,;=]*)*$/;
var site = {
	name: siteName.value,
	url: siteURL.value,
};

if (localStorage.getItem("siteList") != null) {
	siteList = JSON.parse(localStorage.getItem("siteList"));
	displaySite();
}

function clearForm() {
	siteName.value = "";
	siteURL.value = "";
}

function displayLastSite() {
	var container = `<tr>
							<td>${siteList.length}</td>
							<td>${siteList[siteList.length - 1].name}</td>
							<td>
								<a href="${siteList[siteList.length - 1].url}" target="_blank" 
									<button
										type="button"
										id="visit-btn"
										class="btn  mx-auto py-2 px-2">
										<i class="fa-solid fa-eye me-1"></i>
										Visit
									</button>
								</a>
							</td>
							<td>
								<button
									type="button"
									id="delete-btn"
									onclick="deleteSite()"
									class="btn delete-btn mx-auto d-block py-2 px-2">
									<i class="fa-solid fa-trash-can me-1"></i>
									Delete
								</button>
							</td>
							
						</tr>`;
	document.getElementById("tbody").innerHTML += container;
}
function displaySite() {
	var container = "";
	for (var i = 0; i < siteList.length; i++) {
		container += `<tr>
                        <td>${i + 1}</td>
                        <td>${siteList[i].name}</td>
                        <td>
									<a href="${siteList[i].url}" target="_blank" 
										<button
											type="button"
											id="visit-btn"
											class="btn  mx-auto py-2 px-2">
											<i class="fa-solid fa-eye me-1"></i>
											Visit
										</button>
									</a>

                        </td>
                        <td>							
                           <button
                              type="button"
										id="delete-btn"
										onclick="deleteSite(${i})"
                              class="btn mx-auto d-block py-2 px-2">
                              <i class="fa-solid fa-trash-can me-1"></i>
                              Delete
                           </button>
                        </td>
                        
                     </tr>`;
	}
	document.getElementById("tbody").innerHTML = container;
}

function addSite() {
	site = {
		name: siteName.value,
		url: siteURL.value,
	};

	if (nameRegex.test(site.name) && urlRegex.test(site.url)) {
		siteList.push(site);
		localStorage.setItem("siteList", JSON.stringify(siteList));
		clearForm();

		displayLastSite();
	} else {
		window.alert(`Site Name or Url is not valid, Please follow the rules below :

						Site name must contain at least 3 characters

						Site URL must be a valid one`);
	}
}

submit.addEventListener("click", addSite);

function deleteSite(index) {
	siteList.splice(index, 1);
	localStorage.setItem("siteList", JSON.stringify(siteList));
	displaySite();
}

siteName.addEventListener("keyup", function () {
	
	if (!nameRegex.test(siteName.value)) {
		siteName.style.borderColor = "#dc3545";
		siteName.style.boxShadow = "0 0 0 .25rem rgba(220, 53, 69, .25)";
	}
	else{
		siteName.style.borderColor = "#198754";
		siteName.style.boxShadow = "0 0 0 .25rem rgba(25,135,84,.25)";
	}
});

siteURL.addEventListener("keyup", function () {
	if (!urlRegex.test(siteURL.value)) {
		siteURL.style.borderColor = "#dc3545";
		siteURL.style.boxShadow = "0 0 0 .25rem rgba(220, 53, 69, .25)";

	}
	else{
		siteURL.style.borderColor = "#198754";
		siteURL.style.boxShadow = "0 0 0 .25rem rgba(25,135,84,.25)";
	}
});
