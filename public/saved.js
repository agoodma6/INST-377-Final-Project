async function loadSavedDays() {
    const response = await fetch("/savedDays");
    const data = await response.json();

    const table = document.createElement("table");

    const row = document.createElement("tr");

    const heading1 = document.createElement("th");
    heading1.innerHTML = "Location";

    const heading2 = document.createElement("th");
    heading2.innerHTML = "Date";

    const heading3 = document.createElement("th");
    heading3.innerHTML = "Temperature";

    row.appendChild(heading1);
    row.appendChild(heading2);
    row.appendChild(heading3);

    table.appendChild(row);

    data.forEach(function(day) {
        const tableRow = document.createElement("tr");

        const location = document.createElement("td");
        location.innerHTML = day.location;

        const date = document.createElement("td");
        date.innerHTML = day.date;

        const temperature = document.createElement("td");
        temperature.innerHTML = day.temperature;

        tableRow.appendChild(location);
        tableRow.appendChild(date);
        tableRow.appendChild(temperature);

        table.appendChild(tableRow);
    });

    document.getElementById("savedTable").appendChild(table);
}

window.onload = loadSavedDays;