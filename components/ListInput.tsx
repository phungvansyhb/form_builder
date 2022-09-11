import React, { useState } from "react";
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";
import HeaderTitle from "./HeaderTitle";

type Props = {};

type InputConfigType = {
    name: string;
    hidden : boolean;
    // value: number | string | undefined | readonly string[];
    // required : {
    //     value : boolean,
    //     msg : string|'Vui lòng không để trống' ,
    // },
    // max : {
    //     value : number,
    //     msg : string
    // }
};
const DragHandle = SortableHandle(() => <b>::</b>);

const SortableItem = SortableElement<{ item: InputConfigType }>(
    ({ item }: { item: InputConfigType }) => (
        <div className="flex gap-2 items-center cursor-move">
            <DragHandle />
            <input
                type="text"
                name={item.name}
                value={item.name}
                className="w-full p-4 rounded-md border border-gray-200"
            />
        </div>
    )
);
const SortableList = SortableContainer<{ items: InputConfigType[] }>(
    ({ items }: { items: InputConfigType[] }) => (
        <ul className="flex flex-col gap-4">
            {items.map((value, index) => (
                <SortableItem key={index} index={index} item={value} />
            ))}
        </ul>
    )
);

export const ListInput = (props: Props) => {
    const [inputConfigs, setInputConfigs] = useState<InputConfigType[] | []>([
        { name: "name", hidden: false },
        { name: "age", hidden: false  },
        { name: "hobbies", hidden: false  },
    ]);

    function onSortedEnd({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
        const temp = arrayMove(inputConfigs, oldIndex, newIndex);
        setInputConfigs(temp);
    }

    function handleDeleteAll() {
        setInputConfigs([]);
    }

    return (
        <div className="text-center ">
            <HeaderTitle title="Form Layout"/>
            <SortableList items={inputConfigs} onSortEnd={onSortedEnd} useDragHandle />
            <br />
            {inputConfigs.length > 0 && (
                <button
                    className="w-full bg-pink-600 hover:bg-pink-500 py-2 px-8 font-bold text-white rounded"
                    onClick={handleDeleteAll}
                >
                    Delete All
                </button>
            )}
        </div>
    );
};
