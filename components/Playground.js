import React, { useContext } from "react";
import { FormBuilderContext } from "../pages/FormBuilder";
import { useForm } from "react-hook-form";
import { colWidth } from "./ListInput";

export default function Playground({ triggerPlayground, ...props }) {
    const inputContext = useContext(FormBuilderContext);
    console.log(inputContext.inputConfigs);
    const { register, handleSubmit, watch, formState } = useForm();
    
    function renderInput(config, index) {
        console.log(config);
        return (
            <div className={`${colWidth(config)} flex flex-col gap-2 `} key={index}>
                <label htmlFor={config.name} >
                    {config.label} :
                </label>
                {config.type === 0 && (
                    <input
                        {...register(config.name, { required: {value : true , message : "khong duoc bo trong"}})}
                        defaultValue={config.defaultValue}
                        className="input flex-grow"
                    />
                )}
                {config.type === 1 && (
                    <select
                        {...register(config.name, { required: {value : config.validation?.required?.value , message : config.validation?.required?.msg }})}
                        defaultValue={config.defaultValue}
                        className="input flex-grow"
                    >
                        {config.selectOptions?.map((item, index) => (
                            <option key={index} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        );
    }
    const onSubmit = (data) => console.log(data);
    return (
        <div>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3
                                        className="text-lg font-medium leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        Form Generate
                                    </h3>
                                    {/** form body */}
                                    <div className="flex gap-4">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mt-2 grid grid-cols-12 gap-4">
                                                {inputContext.inputConfigs.map((config, index) =>
                                                    renderInput(config, index)
                                                )}
                                            </div>
                                        </form>
                                        <div className="w-1/2">
                                            <div className="mb-4">Form value</div>
                                            <code>{JSON.stringify(watch())}</code>
                                            <code>{JSON.stringify(formState)}</code>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => triggerPlayground(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
