import React, { useContext, useState } from "react";
import { InputType } from "zlib";
import { FormBuilderContext } from "../pages/FormBuilder";
import { InputConfig, TYPEINPUT } from "../typedef/formBuilderType";
import HeaderTitle from "./HeaderTitle";

type Props = {};

function RenderValidate({
    title,
    name,
    isRequiredCheck,
}: {
    title: string;
    name: string;
    isRequiredCheck: boolean;
}) {
    return (
        <div className="flex-horizontal">
            <div className="w-1/2 flex gap-2">
                <label htmlFor={name} className="w-20">
                    {title}:
                </label>
                {isRequiredCheck ? (
                    <input type="checkbox" name={name} className="w-6 h-6" />
                ) : (
                    <input type="input" className="small-input" name={name} />
                )}
            </div>
            <div className="w-1/2 flex gap-2 items-center">
                <label htmlFor={`${"msg" + name}`} className="w-20">
                    Msg:
                </label>
                <input type="input" name={`${"msg" + name}`} className="small-input flex-grow" />
            </div>
        </div>
    );
}

export default function InputCreator({}: Props) {
    const configContext = useContext(FormBuilderContext);
    const choosingInput = configContext?.inputConfigs.find(
        (item) => item.id === configContext.choosingConfigId
    );
    const [isShowValidate, setShowValidate] = useState<boolean>(false);

    function setInputNameProperty(value: string) {
        if (configContext && choosingInput) {
            const temp = configContext.inputConfigs.map((item) => {
                if (item.id === choosingInput.id) {
                    item.name = value;
                }
                return item;
            });
            configContext.setInputConfig(temp);
        }
    }
    function setInputLabelProperty(value: string) {
        if (configContext && choosingInput) {
            const temp = configContext.inputConfigs.map((item) => {
                if (item.id === choosingInput.id) {
                    item.label = value;
                }
                return item;
            });
            configContext.setInputConfig(temp);
        }
    }
    function setInputColWidthProperty(value: number) {
        if (configContext && choosingInput) {
            const temp = configContext.inputConfigs.map((item) => {
                if (item.id === choosingInput.id) {
                    item.layout = value;
                }
                return item;
            });
            configContext.setInputConfig(temp);
        }
    }
    function setInputDefaultValueProperty(value: string | number) {
        if (configContext && choosingInput) {
            const temp = configContext.inputConfigs.map((item) => {
                if (item.id === choosingInput.id) {
                    item.defaultValue = value;
                }
                return item;
            });
            configContext.setInputConfig(temp);
        }
    }
    function setInputTypeProperty(value: TYPEINPUT) {
        if (configContext && choosingInput) {
            const temp = configContext.inputConfigs.map((item) => {
                if (item.id === choosingInput.id) {
                    item.type = value;
                }
                return item;
            });
            configContext.setInputConfig(temp);
        }
    }

    if (!configContext || !choosingInput)
        return (
            <div className="shadow-lg p-4 flex gap-4 flex-col ">
                <div className="w-full text-center">
                    <HeaderTitle title="Input Creator" />
                </div>
                <code className="w-full text-center">Hãy tạo một input!</code>
            </div>
        );
    return (
        <div className="shadow-lg p-4 flex gap-4 flex-col ">
            <div className="w-full text-center">
                <HeaderTitle title="Input Creator" />
            </div>
            {/* Name input  */}
            <label htmlFor="name">Input Name :</label>
            <input
                name="name"
                required
                className="input"
                value={choosingInput.name}
                onChange={(e) => setInputNameProperty(e.target.value)}
            ></input>
            {/* Label input  */}
            <label htmlFor="name">Input label :</label>
            <input
                name="label"
                className="input"
                value={choosingInput.label}
                onChange={(e) => setInputLabelProperty(e.target.value)}
            ></input>
            {/* Col width */}
            <label htmlFor="name">Col width :</label>
            <input
                name="width"
                className="input"
                value={choosingInput.layout}
                type="number"
                max={12}
                min={1}
                onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 12) e.preventDefault();
                    else {
                        setInputColWidthProperty(value);
                    }
                }}
            />
            {/* Default value */}
            <label htmlFor="name">Default Value :</label>
            <input
                name="name"
                className="input"
                value={choosingInput.defaultValue}
                onChange={(e) => setInputDefaultValueProperty(e.target.value)}
            />
            {/* Type input */}
            <label htmlFor="type">Input Type:</label>
            <select
                name="type"
                className="input text-xl"
                value={choosingInput.type}
                onChange={(e) => setInputTypeProperty(e.target.value as keyof InputType)}
            >
                {(Object.keys(TYPEINPUT) as Array<keyof typeof TYPEINPUT>).map((key, index) => {
                    if (isNaN(parseInt(key)))
                        return (
                            <option key={index} value={TYPEINPUT[key]}>
                                {key.toLowerCase()}
                            </option>
                        );
                    else return null;
                })}
            </select>
            {/* validate */}
            <div className="flex gap-4 items-center ">
                <label htmlFor="showValidate">Show validate:</label>
                <input
                    type="checkbox"
                    name="showValidate"
                    id="3"
                    className="w-6 h-6"
                    onChange={(e) => setShowValidate(e.target.checked)}
                />
            </div>
            {isShowValidate && (
                <div className="flex-vertical">
                    {RenderValidate({ isRequiredCheck: true, name: "required", title: "Required" })}
                    {RenderValidate({
                        isRequiredCheck: false,
                        name: "maxLength",
                        title: "Max length",
                    })}
                    {RenderValidate({
                        isRequiredCheck: false,
                        name: "minLength",
                        title: "Min length",
                    })}
                    {RenderValidate({ isRequiredCheck: false, name: "pattern", title: "Format" })}
                </div>
            )}
        </div>
    );
}
