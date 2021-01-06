export class OfferInfo {    
    Id:string;
    Title:string;
    UserID:number;
    CategoryID:number;
    Body:string;
    CategoryImageFullLazy:string;

    constructor() {
        this.Id = "";
        this.Title = "";
        this.UserID = 0;
        this.CategoryID = 0;
        this.Body = "";
        this.CategoryImageFullLazy = "";
    }
}