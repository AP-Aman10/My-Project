const numberInput = document.getElementById('number');
const generateButton = document.getElementById('generate');
const tableContainer = document.getElementById('table-container');

generateButton.addEventListener('click', generateTable);

function generateTable() {
    const number = parseInt(numberInput.value);
    let tableHtml = '<table>';

    for (let i = 1; i <= 10; i++) {
        tableHtml += ` 
            <tr> 
                <td>${number}</td>          
                <td> X </td>                   
                <td> ${i} </td>             
                <td> = </td>                
                <td>${number * i}</td>
                </tr>
                `;
    }

    tableHtml += '</table>';
    tableContainer.innerHTML = tableHtml;
}