import React from "react";
import HeaderTitle from "./HeaderTitle";

type Props = {};

enum TypeInput {
    TEXT = "text",
    PASSWORD = "password",
    DATE = "date",
    DATERANGE = "date_rande",
    EMAIL = "email",
    PHONE = "phone",
    SELECT = "select",
    CHECKBOX = "checkbox",
    RADIO = "radio",
}

export default function InputCreator({}: Props) {
    return (
        <div className="shadow-lg p-4 flex gap-4 flex-col ">
            <div className="w-full text-center">
                <HeaderTitle title="Input Creator" />
            </div>
            <label htmlFor="name">Input Name :</label>
            <input name="name" className="w-full p-4 rounded-md border border-gray-200"></input>
            <label htmlFor="type">Input Type:</label>
            <select name="type" className="w-full p-4 rounded-md border border-gray-200 text-xl">
                <option value={TypeInput.TEXT}>text</option>
                <option value={TypeInput.PASSWORD}>password</option>
                <option value={TypeInput.DATE}>date</option>
                <option value={TypeInput.DATERANGE}>date_range</option>
            </select>
            <div className="flex gap-4 items-center ">
                <label htmlFor="showValidate">Show validate:</label>
                <input type="checkbox" name="showValidate" id="3" className="w-6 h-6" />
            </div>
            <button type="submit" className="w-full bg-pink-600 hover:bg-pink-500 py-2 px-8 font-bold text-white rounded">Create Input </button>
        </div>
    );
}
