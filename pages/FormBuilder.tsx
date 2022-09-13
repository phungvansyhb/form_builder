import React, {createContext, useState} from "react";
import InputCreator from "../components/InputCreator";
import {ListInput} from "../components/ListInput";
import Playground from "../components/Playground";
import {InputConfig, TYPEINPUT} from "../typedef/formBuilderType";

type Props = {};

interface FormBuilderContext {
    inputConfigs: InputConfig[] | [];
    showPlayground: boolean;
    triggerPlayground: (value: boolean) => void;
    clearConfigById: (value: number) => void;
    clearAllConfig: () => void;
    setInputConfig: (configs: InputConfig[] | []) => void;
    addInputConfig: () => void;
    choosingConfigId: number;
    chooseConfigById: (value: number) => void;
}

export const FormBuilderContext = createContext<FormBuilderContext | null>(null);

export default function FormBuilder({}: Props) {
    const [inputConfigs, setInputConfig] = useState<InputConfig[] | []>([
        {
            id: 1,
            name: "name",
            hidden: false,
            disable: false,
            type: TYPEINPUT.TEXTINPUT,
            defaultValue: 'Sypv',
            label: 'Tên',
            layout: 12,
            validation: {
                required: {value: true, msg: "Tên không được bỏ trống"},
                minLength : {value : 2 , msg : "Tên có độ dài tối thiểu bằng 2"}
            }
        },
        {
            id: 2,
            name: "dob",
            hidden: false,
            disable: false,
            type: TYPEINPUT.DATE,
            defaultValue: '1999-06-26',
            label: "Ngày sinh",
            layout: 6,
            validation : {
                required: {value: true, msg: "Ngày sinh không được bỏ trống"},
            }
        },
        {
            id: 3,
            name: "hobbies",
            hidden: false,
            disable: false,
            type: TYPEINPUT.SELECT,
            defaultValue: 'bong da',
            label: "Sở thích",
            layout: 12,

        },
    ]);
    const [showPlayground, triggerPlayground] = useState<boolean>(false);

    function clearConfigById(id: number) {
        setInputConfig(inputConfigs.filter((item) => item.id !== id));
    }

    function clearAllConfig() {
        setInputConfig([]);
    }

    const [choosingConfigId, chooseConfigById] = useState<number>(inputConfigs.length ? inputConfigs[0].id : -1);

    function addInputConfig() {


        const nextInterval = () => {
            if (inputConfigs.length === 0) return 1
            return Math.max(...inputConfigs.map((item) => item.id)) + 1
        }
        console.log(Math.max(...inputConfigs.map((item) => item.id)), nextInterval);
        const newInput: InputConfig = {
            name: "",
            disable: false,
            hidden: false,
            type: TYPEINPUT.TEXTINPUT,
            id: nextInterval(),
            defaultValue: '',
            label: 'label',
            layout: 12
        };
        const newArr = [...inputConfigs];
        newArr.push(newInput);
        chooseConfigById(newInput.id)
        setInputConfig(newArr);
    }


    const initContextValue: FormBuilderContext = {
        inputConfigs,
        showPlayground,
        triggerPlayground,
        clearConfigById,
        clearAllConfig,
        setInputConfig,
        addInputConfig,
        choosingConfigId,
        chooseConfigById,
    };

    return (
        <FormBuilderContext.Provider value={initContextValue}>
            <section className="flex gap-12 p-4">
                <div className="w-full sm:w-1/2">
                    <ListInput/>
                </div>
                <div className="w-full sm:w-1/2 ">
                    <InputCreator/>
                </div>
            </section>
            <div className="w-full text-center pt-4 mb-4">
                <button
                    className=" py-2 px-8 font-bold text-pink-600 rounded border-2 border-pink-600 hover:-translate-y-2 hover:scale-110 transition-all"
                    onClick={() => triggerPlayground(true)}>
                    Play ground
                </button>
            </div>
            {showPlayground && <Playground triggerPlayground={triggerPlayground}/>}
        </FormBuilderContext.Provider>
    );
}
