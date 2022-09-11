import React, { createContext, useState } from "react";
import InputCreator from "../components/InputCreator";
import { ListInput } from "../components/ListInput";
import { InputConfig } from "../typedef/formBuilderType";

type Props = {};

interface FormBuilderContext {
    inputConfigs: InputConfig[] | [];
    showPlayground: boolean;
    triggerPlayground: (value: boolean) => void;
    clearConfigById: (value: number) => void;
    clearAllConfig: () => void;

    choosingConfigId: number | undefined;
    chooseConfigById: (value: number) => void;
}

export default function FormBuilder({}: Props) {
    const [inputConfigs, setInputConfig] = useState<InputConfig[] | []>([
        { id: 1, name: "name", hidden: false, disable: false },
        { id: 2, name: "age", hidden: false, disable: false },
        { id: 3, name: "hobbies", hidden: false, disable: false },
    ]);
    const [showPlayground, triggerPlayground] = useState<boolean>(false);
    function clearConfigById(id: number) {
        setInputConfig(inputConfigs.filter((item) => item.id !== id));
    }
    function clearAllConfig() {
        setInputConfig([]);
    }
    const [choosingConfigId, chooseConfigById] = useState<number | undefined>();

    const initContextValue: FormBuilderContext = {
        inputConfigs,
        showPlayground,
        triggerPlayground,
        clearConfigById,
        clearAllConfig,
        choosingConfigId,
        chooseConfigById,
    };

    const FormBuilderContext = createContext<FormBuilderContext | null>(null);

    return (
        <FormBuilderContext.Provider value={initContextValue}>
            <section className="flex gap-12 p-4">
                <div className="w-full sm:w-1/2">
                    <ListInput />
                </div>
                <div className="w-full sm:w-1/2 ">
                    <InputCreator />
                </div>
            </section>
            <div className="w-full text-center pt-8">
                <button className=" py-2 px-8 font-bold text-pink-600 rounded border-2 border-pink-600 hover:-translate-y-2 hover:scale-110 transition-all ">
                    Play ground
                </button>
            </div>
        </FormBuilderContext.Provider>
    );
}
