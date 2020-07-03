//create variable for website
var dataJsonGetFromExcel;


//show results
function ResultsFunction() {
    document.getElementById("textResult").innerHTML = localStorage.getItem("dauVaoBOD");

}

//upload a excel file from user and read to json data
var ExcelToJSON = function() {

    this.parseExcel = function(file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var data = e.target.result;
            var workbook = XLSX.read(data, {
                type: 'binary'
            });
            workbook.SheetNames.forEach(function(sheetName) {
                // Here is your object
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                var json_object = JSON.stringify(XL_row_object);
                dataJsonGetFromExcel = JSON.parse(json_object);
                //console.log(dataJsonGetFromExcel);
                InputKeyAndValueIntoLocalStorage();
                PushAllDataFromExcel();
                //jQuery('#xlx_json').val(json_object);
            })
        };

        reader.onerror = function(ex) {
            console.log(ex);
        };

        reader.readAsBinaryString(file);
    };
};

function handleFileSelect(evt) {
    console.log("uploaded successfully");
    var files = evt.target.files; // FileList object
    var xl2json = new ExcelToJSON();
    xl2json.parseExcel(files[0]);
}
document.getElementById('uploadExcelFile').addEventListener('change', handleFileSelect, false);


//create variable and save data to local storage
function InputKeyAndValueIntoLocalStorage() {
    var i;

    function CreateAndSaveVarToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
    for (i = 0; i < dataJsonGetFromExcel.length; i++) {
        var arrayValue = [dataJsonGetFromExcel[i].Attribute, dataJsonGetFromExcel[i].Unit, dataJsonGetFromExcel[i].Result];
        CreateAndSaveVarToLocalStorage(dataJsonGetFromExcel[i].ID, arrayValue);
    }
}

//get data from local storage and save it into excel file
function GetDataFromLocalStorageAndSaveToExcelFile() {
    var jsonDataFromLocalStorage = [];
    var tableData;

    function GetDataFromLocalStorage() {
        var i, j, numbersKeyInLocalStorage = Object.keys(localStorage);
        var dataGetOut;
        var varTitleForTable = '{ "text": "Attribute" }, { "text": "Unit" }, { "text": "Result" }, { "text": "ID" }';
        jsonDataFromLocalStorage.push("[" + varTitleForTable + "]");
        //console.log(numbersKeyInLocalStorage);

        for (i = 0; i < numbersKeyInLocalStorage.length; i++) {
            var tempJsonEveyLine = [];
            var getSortKey = -1;

            function SearchValue() {
                for (var k = 0; k < numbersKeyInLocalStorage.length; k++) {
                    var findKey = numbersKeyInLocalStorage[k];
                    //console.log(findKey.search(i + "a1"));
                    if (findKey.search("a" + i + "_") !== -1) {
                        getSortKey = k;
                        break;
                    }
                }
            }
            SearchValue();
            if (getSortKey !== -1) {
                var valueOfKey = localStorage.getItem(numbersKeyInLocalStorage[getSortKey]);
                //console.log(valueOfKey);
                var checkIndexComma = 0;
                for (j = 0; j < 4; j++) {
                    var indexComma = valueOfKey.indexOf(",", checkIndexComma + 1);

                    if (j === 0) {
                        var variableValue = valueOfKey.substring(0, indexComma);
                        //console.log(variableValue);
                        var jsonString = '{"text":"' + variableValue + '"}'
                        tempJsonEveyLine.push(jsonString);
                    }
                    if (j === 1) {
                        var variableValue = valueOfKey.substring(checkIndexComma + 1, indexComma);
                        //console.log("a", variableValue);
                        var jsonString = '{"text":"' + variableValue + '"}'
                        tempJsonEveyLine.push(jsonString);
                    }
                    if (j === 2) {
                        var variableValue = valueOfKey.substring(checkIndexComma + 1, valueOfKey.length);
                        //console.log("a", variableValue);
                        var jsonString = '{"text":"' + variableValue + '"}'
                        tempJsonEveyLine.push(jsonString);
                    }
                    if (j === 3) {
                        var variableValue = numbersKeyInLocalStorage[getSortKey];
                        //console.log("a", variableValue);
                        var jsonString = '{"text":"' + variableValue + '"}'
                        tempJsonEveyLine.push(jsonString);
                    }
                    checkIndexComma = indexComma;
                }
            } else {
                alert("Có lỗi khi thực hiện trích xuất dữ liệu vào Excel file");
            }

            jsonDataFromLocalStorage.push("[" + tempJsonEveyLine.toString() + "]");
            //console.log(jsonDataFromLocalStorage.toString());
        }
        dataGetOut = "[" + jsonDataFromLocalStorage.toString() + "]";
        tableData = [{
            "sheetName": "Results",
            "data": JSON.parse(dataGetOut),
        }];

        extractExcelFromData();
    }

    function extractExcelFromData() {
        var options = {
            fileName: "Excel results"
        };
        Jhxlsx.export(tableData, options);
    }

    GetDataFromLocalStorage();
}

//push all data from excel and local Storage to website
function PushAllDataFromExcel() {
    var i, numbersKeyInLocalStorage = Object.keys(localStorage);

    for (i = 0; i < numbersKeyInLocalStorage.length; i++) {
        var indexExtensionOfField = numbersKeyInLocalStorage[i].lastIndexOf("_");
        //console.log(indexExtensionOfField);
        var getExtensionName = numbersKeyInLocalStorage[i].substring(indexExtensionOfField + 1, numbersKeyInLocalStorage[i].length);

        function CallValueFromString() {
            var itemString = localStorage.getItem(numbersKeyInLocalStorage[i]);
            var indexValue = itemString.lastIndexOf(",");
            var getValue = itemString.substring(indexValue + 1, itemString.length);
            //console.log(getValue)
            return getValue;
        }
        if (getExtensionName == "txt") {
            document.getElementById(numbersKeyInLocalStorage[i]).innerText = CallValueFromString();
        }
        if (getExtensionName == "inptxt") {
            document.getElementById(numbersKeyInLocalStorage[i]).value = CallValueFromString();
        }







        //...............................................................................................
    }
}
if (Object.keys(localStorage).length !== 0) {
    PushAllDataFromExcel();
}

//Calculate and Push Data Return to localStorage
function CalAllThingInWebSite() {
    function CalculateInWebsite() {}

    function PushDataToLocalStorage() {
        var i, numbersKeyInLocalStorage = Object.keys(localStorage);

        for (i = 0; i < numbersKeyInLocalStorage.length; i++) {
            var indexExtensionOfField = numbersKeyInLocalStorage[i].lastIndexOf("_");
            //console.log(indexExtensionOfField);
            var getExtensionName = numbersKeyInLocalStorage[i].substring(indexExtensionOfField + 1, numbersKeyInLocalStorage[i].length);

            function CallValueFromString() {
                var itemString = localStorage.getItem(numbersKeyInLocalStorage[i]);
                var indexValue = itemString.lastIndexOf(",");
                var getValue = itemString.substring(indexValue + 1, itemString.length);
                //console.log(getValue)
                return getValue;
            }
            if (getExtensionName == "txt") {
                var newValueSet = document.getElementById(numbersKeyInLocalStorage[i]).textContent;
                var textChange = localStorage.getItem(numbersKeyInLocalStorage[i]).replace(CallValueFromString(), newValueSet);
                localStorage.setItem(numbersKeyInLocalStorage[i], textChange);
            }
            if (getExtensionName == "inptxt") {
                var newValueSet = document.getElementById(numbersKeyInLocalStorage[i]).value;
                var textChange = localStorage.getItem(numbersKeyInLocalStorage[i]).replace(CallValueFromString(), newValueSet);
                localStorage.setItem(numbersKeyInLocalStorage[i], textChange);
            }
        }
    }
    PushDataToLocalStorage();
}