import React, { useContext, useEffect, useState } from "react";
import { InputType } from "zlib";
import { FormBuilderContext } from "../pages/FormBuilder";
import { InputConfig, TYPEINPUT } from "../typedef/formBuilderType";
import HeaderTitle from "./HeaderTitle";

type Props = {};

function RenderValidate({
    title,
    name,
    isRequiredCheck,
    defaultValue,
    msg,
}: {
    title: string;
    name: string;
    isRequiredCheck: boolean;
    defaultValue: any | undefined;
    msg: string | undefined;
}) {
    return (
        <div className="flex-horizontal">
            <div className="w-1/2 flex gap-2">
                <label htmlFor={name} className="w-20">
                    {title}:
                </label>
                {isRequiredCheck ? (
                    <input
                        type="checkbox"
                        name={name}
                        className="w-6 h-6"
                        checked={!!defaultValue}
                    />
                ) : (
                    <input
                        type="input"
                        className="small-input flex-grow"
                        name={name}
                        defaultValue={defaultValue}
                    />
                )}
            </div>
            <div className="w-1/2 flex gap-2 items-center">
                <label htmlFor={`${"msg" + name}`} className="w-10">
                    Msg:
                </label>
                <input
                    type="input"
                    name={`${"msg" + name}`}
                    className="small-input flex-grow"
                    defaultValue={msg}
                />
            </div>
        </div>
    );
}

export default function InputCreator({}: Props) {
    const configContext = useContext(FormBuilderContext);
    const choosingInput = configContext?.inputConfigs.find(
        (item) => item.id === configContext.choosingConfigId
    );

    function setInputConfig(config: InputConfig) {
        if (configContext && choosingInput) {
            const temp = configContext.inputConfigs.map((item) => {
                if (item.id === config.id) {
                    return config;
                }
                return item;
            });
            configContext.setInputConfig(temp);
        }
    }
    const [inputType, setInputType] = useState(TYPEINPUT.TEXTINPUT);
    const [listOptions , setListOptions] = useState<{id:number , value : string , label : string}[]|[]>([{id: 1, value :'value 1' , label : 'option 1'}])
    useEffect(()=>{
        if(choosingInput){
            const temp = {...choosingInput, selectOptions : listOptions };
            setInputConfig(temp)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[listOptions])
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
                onChange={(e) => {
                    const temp = { ...choosingInput, name: e.target.value };
                    setInputConfig(temp);
                }}
            ></input>
            {/* Label input  */}
            <label htmlFor="name">Input label :</label>
            <input
                name="label"
                className="input"
                value={choosingInput.label}
                onChange={(e) => {
                    const temp = { ...choosingInput, label: e.target.value };
                    setInputConfig(temp);
                }}
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
                        const temp = { ...choosingInput, layout: value };
                        setInputConfig(temp);
                    }
                }}
            />
            {/* Default value */}
            <label htmlFor="name">Default Value :</label>
            <input
                name="defaultValue"
                className="input"
                value={choosingInput.defaultValue}
                onChange={(e) => {
                    const temp = { ...choosingInput, defaultValue: e.target.value };
                    setInputConfig(temp);
                }}
            />
            {/* Type input */}
            <label htmlFor="type">Input Type:</label>
            <select
                name="type"
                className="input "
                value={choosingInput.type}
                onChange={(e) => {
                    setInputType(+e.target.value as keyof InputType);
                    const temp = { ...choosingInput, type: +e.target.value as keyof InputType };
                    setInputConfig(temp);
                }}
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
            <div className="flex-vertical">
                {inputType === TYPEINPUT.TEXTINPUT && (
                    <>
                        {RenderValidate({
                            isRequiredCheck: true,
                            name: "required",
                            title: "Required",
                            defaultValue: choosingInput?.validation?.required?.value,
                            msg: choosingInput?.validation?.required?.msg,
                        })}
                        {RenderValidate({
                            isRequiredCheck: false,
                            name: "max",
                            title: "Max value",
                            defaultValue: choosingInput?.validation?.max?.value,
                            msg: choosingInput?.validation?.max?.msg,
                        })}
                        {RenderValidate({
                            isRequiredCheck: false,
                            name: "min",
                            title: "Min value",
                            defaultValue: choosingInput?.validation?.min?.value,
                            msg: choosingInput?.validation?.min?.msg,
                        })}
                        {RenderValidate({
                            isRequiredCheck: false,
                            name: "maxLength",
                            title: "Max length",
                            defaultValue: choosingInput?.validation?.maxLength?.value,
                            msg: choosingInput?.validation?.maxLength?.msg,
                        })}
                        {RenderValidate({
                            isRequiredCheck: false,
                            name: "minLength",
                            title: "Min length",
                            defaultValue: choosingInput?.validation?.minLength?.value,
                            msg: choosingInput?.validation?.minLength?.msg,
                        })}
                        {RenderValidate({
                            isRequiredCheck: false,
                            name: "pattern",
                            title: "Format",
                            defaultValue: choosingInput?.validation?.pattern?.value,
                            msg: choosingInput?.validation?.pattern?.msg,
                        })}
                    </>
                )}

                {inputType === TYPEINPUT.SELECT && (
                    <>
                        <div>Options </div>
                        <div className="flex-vertical">
                            {listOptions.map((item, index) => (
                                <div key={index} className="flex-horizontal justify-around">
                                    <div className="flex-horizontal">
                                        <label htmlFor="">{`label :`}</label>
                                        <input type="text" className="small-input flex-grow" defaultValue={item.label} onChange={(e)=>{
                                            const temp = listOptions.map(option=>{
                                                if(option.id === item.id){
                                                    option.label= e.target.value
                                                }return option
                                            })
                                            setListOptions(temp)
                                        } }/>
                                    </div>
                                    <div className="flex-horizontal">
                                        <label htmlFor="">{`value :`}</label>
                                        <input type="text" className="small-input flex-grow" defaultValue={item.value} onChange={(e)=>{
                                            const temp = listOptions.map(option=>{
                                                if(option.id === item.id){
                                                    option.value= e.target.value
                                                }return option
                                            })
                                            //TODO :  not allow duplicate value
                                            setListOptions(temp)
                                        } }/>
                                    </div>
                                    <button className="btn-secondary-small" onClick={()=>{
                                        setListOptions(listOptions.filter(options=>options.id!==item.id))
                                    }}>X</button>
                                </div>
                            ))}
                            <div className="w-full text-center"> <button className="btn-primary" onClick={()=>{
                                const newId = Math.max(...listOptions.map(option=>option.id)) +1
                                const newOption = {id : newId , value : `option ${newId}` , label : `value ${newId}`}
                                const temp = [...listOptions]
                                temp.push(newOption)
                                setListOptions(temp)
                            }}>Add options</button></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
