import React, { useContext, useEffect, useState } from "react";
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import { FormBuilderContext } from "../pages/FormBuilder";
import { InputConfig } from "../typedef/formBuilderType";
import HeaderTitle from "./HeaderTitle";
import {css , cx} from '@emotion/css'

type Props = {};
const DragHandle = SortableHandle(() => <b>::</b>);

const SortableItem = SortableElement<{
    item: InputConfig;
}>(({ item }: { item: InputConfig }) => {
    const configContext = useContext(FormBuilderContext);
    if (!configContext) return <></>;
    
    const colWidth =()=>{
        if(item.layout ===1) return 'col-span-1'   
        if(item.layout ===2) return 'col-span-2'   
        if(item.layout ===3) return 'col-span-3'   
        if(item.layout ===4) return 'col-span-4'   
        if(item.layout ===5) return 'col-span-5'   
        if(item.layout ===6) return 'col-span-6'   
        if(item.layout ===7) return 'col-span-7'   
        if(item.layout ===8) return 'col-span-8'   
        if(item.layout ===9) return 'col-span-9'   
        if(item.layout ===10) return 'col-span-10'   
        if(item.layout ===12) return 'col-span-12'   
        if(item.layout ===11) return 'col-span-11'   
    }
    return (
        // <div className={cx(`col-span-${item.layout}`)}>
        <div className={colWidth()}>
            <div
                className={` gap-2 cursor-move  p-2 ${
                    configContext.choosingConfigId === item.id &&
                    "border-2 border-blue-400  rounded"
                }`}
            >
                <DragHandle />
                <div className="flex gap-2 items-center">
                    <label htmlFor={item.name}>{item.label}: </label>
                    <input
                        key={item.id}
                        disabled={item.disable}
                        type="text"
                        name={item.name}
                        value={item.name}
                        className="input mb-2"
                    />
                </div>
                
                <button
                    className="btn-primary "
                    onClick={() => configContext.chooseConfigById(item.id)}
                >
                    Edit
                </button>
                <button
                    className="btn-secondary"
                    onClick={() => configContext.clearConfigById(item.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
});
const SortableList = SortableContainer<{
    items: InputConfig[];
}>(({ items }: { items: InputConfig[] }) => (
    <div className="grid grid-cols-12 gap-4">
        {items.map((value, index) => (
            <SortableItem key={index} index={index} item={value} />
        ))}
    </div>
));

export const ListInput = (props: Props) => {
    const inputConfigContext = useContext(FormBuilderContext);


    function onSortedEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
        if(inputConfigContext){
            const temp = arrayMove(inputConfigContext.inputConfigs, oldIndex, newIndex);
            inputConfigContext?.setInputConfig(temp);
        }
      
    }

    function handleDeleteAll() {
    
        inputConfigContext?.chooseConfigById(-1)
        inputConfigContext?.setInputConfig([])

    }
    if (!inputConfigContext) return <div>Loading</div>;
    return (
        <div className="text-center ">
            <HeaderTitle title="Form Layout" />
            <SortableList items={inputConfigContext.inputConfigs} onSortEnd={onSortedEnd} useDragHandle />
            <br />
            <div className="flex gap-4 justify-center">
                <button
                    className="btn-primary w-1/2"
                    onClick={() => inputConfigContext.addInputConfig()}
                >
                    Add
                </button>
                {inputConfigContext.inputConfigs.length > 0 && (
                    <button className="btn-secondary w-1/2" onClick={handleDeleteAll}>
                        Delete All
                    </button>
                )}
            </div>
        </div>
    );
};
