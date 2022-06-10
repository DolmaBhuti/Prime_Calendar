/*export default class Events {
    //_id and userId will be configured in server
    //_id:string = "";
    eventTitle:string =  "";
    startTime: string ="";
    date: Date = new Date();
    //userId: string = "";

}*/

export default class Events {
    eventTitle: String  = "";
    description: String ="";
    startTime: String = "";
    endTime: String = "";
    date: Date = new Date(); 
    dayOfWeek: [Number] = [0];
    recurring: Boolean = false;
    //userId: String
    
}
