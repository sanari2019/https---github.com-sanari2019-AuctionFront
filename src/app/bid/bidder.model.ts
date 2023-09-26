export class Bidder {
    id: number;
    username: string;
    password: string;
    fname: string;
    lname: string;
    fLoginDate: Date;
    lLoginDate: Date;

    constructor() {
        this.id = 0;
        this.username = '';
        this.password = '';
        this.fname = '';
        this.lname = '';
        this.fLoginDate = new Date();
        this.lLoginDate = new Date();


    }

}
