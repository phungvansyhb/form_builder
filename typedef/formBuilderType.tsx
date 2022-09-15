export enum TYPEINPUT {
    TEXTINPUT,
    // EMAIL,
    // PHONE,
    SELECT,
    // RADIO,
    // CHECKBOX,
    DATE,
}

enum TYPE_VALIDATE {
    REQUIRED = "requried",
    MAX = "max",
    MIN = "min",
    MAX_LENGTH = "maxLength",
    MIN_LENGTH = "minLength",
    PATTERN = "pattern",
}

export interface InputConfig {
    id: number;
    name: string;
    hidden: boolean;
    disable: boolean;
    type: TYPEINPUT;
    defaultValue: string | number | undefined;
    label: string;
    layout: number;
    validation?: {
        [key: string]: {
            value: boolean | string | number;
            msg: string;
        };
    };
    selectOptions?: { id: number; label: string; value: string }[];
    selectApi?: { endpoint: string; valueKey: string; keyLabel: string };
}
