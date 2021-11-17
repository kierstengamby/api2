const enter = document.getElementById('btn');
enter.addEventListener('click', fetchResults);
const clear = document.getElementById('btn2');
    let tbody = document.getElementById('tbody');
    clear.addEventListener('click', clearTable);
    function clearTable() {
        tbody.innerHTML=""
    };

function fetchResults() {
    let holidayType = document.getElementById("holidayType");
    let month = document.getElementById("month");
    let day = document.getElementById("day");
    let location = document.getElementById("location");

    fetch(`https://calendarific.com/api/v2/holidays?api_key=423b78f81492506905a86d5819d1ebf209ead3a5&country=US&year=2022&month=${month.value}&day=${day.value}&location=us-${location.value}&type=${holidayType.value}`)
    .then(results => results.json())
    .then(data => displayResults(data));
};

console.log(fetchResults());

function displayResults(json) {
    console.log(json);
    let userSelectionName = json.response.holidays.forEach(holidays => {
        let dayResponse = holidays.date.datetime.day;
        let monthResponse = parseInt(holidays.date.datetime.month);
        const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        monthResponse = months[monthResponse-1];
        let stateResponse = holidays.states
        if (typeof(stateResponse) !== 'string') {
            let availableStatesArray = stateResponse.map((state) => {return state.abbrev});
            stateResponse = availableStatesArray.join(', ');
        };
        let typeResponse = holidays.type;
        if(holidays.type > [0]) {
            let returnOfType = holidays.type 
            typeResponse = returnOfType.join(', ')
        };
        let holidayResponse = holidays.name;
        let descriptionResponse = holidays.description;
        
        let table = document.getElementById("table");
        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = dayResponse;
        cell2.innerHTML = monthResponse;
        cell3.innerHTML = stateResponse;
        cell4.innerHTML = typeResponse;
        cell5.innerHTML = holidayResponse;
        cell6.innerHTML = descriptionResponse;
    });
}