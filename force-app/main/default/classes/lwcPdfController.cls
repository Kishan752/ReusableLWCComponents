public class lwcPdfController {
    
    @AuraEnabled
    public static void generatePDF(String recordId){
       
        Pagereference pg = Page.envelope;
        Contact con = new Contact(Id=recordId);
        Attachment objAttachment = new Attachment();
        objAttachment.Name = 'lwcPdf.pdf';
        objAttachment.ParentId = con.Id;
        objAttachment.Body = pg.getContentaspdf();   
        objAttachment.IsPrivate = false;
        insert objAttachment;
       
    }

}