import { api, LightningElement } from 'lwc';
import getApexData from '@salesforce/apex/lwcPdfController.generatePDF';

export default class PdfLwc extends LightningElement {


@api recordId;
    generatePdf(){

        /*var url = '/apex/envelope';
        window.open(url);*/  // this will open the pdf in a new Window where user can download it
       
        getApexData({ recordId:this.recordId })
          .then(result => {
            console.log('Result', result);
          })
          .catch(error => {
            console.error('Error:', error);
        });
    
    }

}