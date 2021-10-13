/**
 * @description       : 
 * @author            : Kishan Kumar
 * @group             : 
 * @last modified on  : 10-13-2021
 * @last modified by  : Kishan Kumar
**/
import { LightningElement, track } from 'lwc';
import saveBulkuser from '@salesforce/apex/bulUserUploadController.saveBulkuser';

export default class BulkUserUploadComp extends LightningElement {
     @track dummyTemplate; 
     fileData;
    connectedCallback(){
        this.handleInit();
    }

    handleInit(){
       /* init code */
    }

    downloadTemplate(){
        let csv = this.templateConvertArrayOfObjectsToCSV();
        console.log('csv is');
        console.log(csv);
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
        hiddenElement.target = '_self'; // 
        hiddenElement.download = 'UserUpload.csv';  
        document.body.appendChild(hiddenElement);
        hiddenElement.click();

    }

    uploadFile(){
        saveBulkuser({ stringyFyJsonExcelFile: this.fileData })
          .then(result => {
            console.log('Result', result);
          })
          .catch(error => {
            console.error('Error:', error);
        });

    }

    templateConvertArrayOfObjectsToCSV(){

        var csvStringResult, keys, columnDivider, lineDivider;
       
        columnDivider = ',';
        lineDivider = '\n';
        keys = ['Name','Email','UserName','Profile','PermissionSet'];
        csvStringResult = '';
        csvStringResult += keys.join(columnDivider);
        csvStringResult += lineDivider;
       
        return csvStringResult; 

    }
    showData(event){
        var files = event.target.files; // FileList object

        // use the 1st file from the list
        var f = files[0];
        var reader = new FileReader();
            reader.readAsText(f, "UTF-8");
            
            reader.onload = (event)=> {
            var csv = event.target.result;
            console.log('csv is');
            console.log(csv);
            this.fileData=this.CSV2JSON(csv);
            }
            reader.onerror = function (event) {
                console.log("error reading file");
               
            }
    }

    CSV2JSON(csv){
        var arr = []; 
        arr =  csv.split('\n');;
        console.log('@@@ arr = '+arr);
        arr.pop();
        var jsonObj = [];
        var headers = arr[0].split(',');
        for(var i = 1; i < arr.length; i++) {
            var data = arr[i].split(',');
            var obj = {};
            for(var j = 0; j < data.length; j++) {
                obj[headers[j].trim()] = data[j].trim();
                //console.log('@@@ obj headers = ' + obj[headers[j].trim()]);
            }
            jsonObj.push(obj);
        }
        var json = JSON.stringify(jsonObj);
        console.log("@@@ json = "+ json);
        return json;
    
    }
}