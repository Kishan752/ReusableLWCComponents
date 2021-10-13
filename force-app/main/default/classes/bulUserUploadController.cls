public class bulUserUploadController {
    
    
     @AuraEnabled
    public static String saveBulkuser(String stringyFyJsonExcelFile){
        List<ReedeemModel> userRecords = (List<ReedeemModel>)JSON.deserialize(stringyFyJsonExcelFile, List<ReedeemModel>.class);
        System.debug(userRecords);
        set<String> profileNames=new set<String>();
        set<String> permissionSetNames=new set<String>();
        
        for(ReedeemModel rm:userRecords){
            profileNames.add(rm.profile);
            permissionSetNames.add(rm.permissionSet);
        }

        Map<String,id> profileMap=new Map<String,id>();
        Map<String,id> permissionMap=new Map<String,id>();
        
        for(Profile p:[select id,Name from Profile where Name in:profileNames]){
            profileMap.put(p.name,p.id);
        }

        for(PermissionSet p:[select id,Name from PermissionSet where Name in:permissionSetNames]){
            permissionMap.put(p.name,p.id);
        }

        list<User> userTobeInserted = new list<User>();
        for(ReedeemModel rm:userRecords){
            User u= new User();
            u.firstName=rm.name;
            u.LastName=rm.name;
            u.email=rm.email;
            u.Username=rm.userName;
            u.ProfileId=profileMap.get(rm.profile);
            u.IsActive=false;
            userTobeInserted.add(u);
        } 

        System.debug(userTobeInserted);
        
       // insert userTobeInserted;

      
         
        return 'Success';
    }
    
     public class ReedeemModel{
        @AuraEnabled
        public String name;   
        @AuraEnabled
        public String email;
        @AuraEnabled
        public String userName;
        @AuraEnabled
        public String profile;   
        @AuraEnabled
        public String permissionSet;   
        
    }

}