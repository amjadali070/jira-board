'use client'
import React, { useState } from "react";

interface ColumnProps {
    title: string;
    tasks: string[];
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>, task: string, sourceColumn: string) => void;
    bgColor: string;
    icon: React.ReactNode;
    width: string;
    height: string;
}
const getTitleColor = (title: string) => {
    switch (title) {
        case "Backlog":
            return "bg-gray-400 text-white";
        case "InProgress":
            return "bg-pink-400 text-white";
        case "Completed":
            return "bg-green-400 text-white";
        default:
            return "";
    }
};

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, onDragStart, bgColor, icon, width, height }) => {
    return (
        <div
            className={`rounded p-2 ${bgColor} ${width} ${height}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            style={{ minHeight: "28rem", minWidth:"300px", margin:'1px', padding:'20px', borderWidth: '5px', borderColor: 'black',borderStyle: 'groove' }}
            >
            <div className="flex items-center justify-center mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {icon && <div className="ml-2">{icon}</div>}
            </div>
            {tasks.map((task, index) => (
                <div
                    key={index}
                    className={`bg-gray-500 rounded mb-2 p-2 cursor-move text-center ${getTitleColor(title)}`}
                    draggable
                    onDragStart={(e) => onDragStart(e, task, title)}
                >
                    {task}
                </div>
            ))}
        </div>
    );
}
export default Column;