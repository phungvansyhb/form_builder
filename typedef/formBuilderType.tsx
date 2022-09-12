
export enum TYPEINPUT{
    TEXTINPUT ,EMAIL ,PHONE , TAX ,  SELECT  , RADIO , CHECKBOX , DATE , COLORPICKER  
}

export interface InputConfig  {
    id : number;
    name: string;
    hidden : boolean;
    disable : boolean;
    type : TYPEINPUT;
    defaultValue : string|number|undefined;
    label : string ;
    layout: number;
}





