class LoginData {
    private token:string;
    private name:string;
    private birthday:string;
    private sex:number;
    public constructor(data) {
        this.token = data["token"];
        this.name = data["name"];
        this.birthday = data["birthday"];
        this.sex =parseInt(data["sex"]) ;
    }
}