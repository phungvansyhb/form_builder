export type InputConfig = {
    id : number;
    name: string;
    hidden : boolean;
    disable : boolean
}

enum TYPEVALIDATE{
    REQUIRED , MAX , MIN , MAXLENGTH , 

}
export type validation = {
    typeValidate : TYPEVALIDATE,
    msg : string,
}



