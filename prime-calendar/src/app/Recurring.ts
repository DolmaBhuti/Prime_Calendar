// export default class SingleEvent { //single occurrence event
//     title: String  = "";
//     start: String = "";
//     end: String = "";
//     description: String ="";
//     // date: Date = new Date(); 
//     // dayOfWeek: [Number] = [0];
//     // startR
//     //userId: String
    
// }
// export default class RecurringEvent {
//     title: String  = "";
//     start: String = "";
//     // startTime: ""; // <------- might not need
//     end: String = "";
//     // endTime : String = ""; // <------- might not need
//     description: String ="";
//     // date: Date = new Date(); 
//     daysOfWeek: [Number] = [0]; // <-------
//     startRecur:String = ""; //need to specify <------
//     endRecur:String = ""; //not necessary specify. if unspecified it recurs infinitely, if specified it recurs until date - 1 <--------
//     //userId: String
    
// }

export interface EventFlexible {
    eventTitle: String;
    startTime: String;
    endTime: String;
    description: String;
    daysOfWeek?: String;
    startRecur?: String;
    endRecur?: String;
}