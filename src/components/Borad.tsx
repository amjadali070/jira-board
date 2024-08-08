'use client'
import React, { useState } from "react";
import { RiCheckboxBlankCircleLine, RiFileEditLine, RiCheckboxCircleLine } from 'react-icons/ri';
import Column from "./Column";

const Board = () => {
    const [backlog, setBacklog] = useState<string[]>([]);
    const [inProgress, setInProgress] = useState<string[]>([]);
    const [completed, setCompleted] = useState<string[]>([]);
    const [newTicket, setNewTicket] = useState("");

    const handleAddTicket = () => {
        if (newTicket.trim() !== "") {
            setBacklog([...backlog, newTicket]);
            setNewTicket("");
        }
    };

    const handleDragStart = (e: { dataTransfer: { setData: (arg0: string, arg1: any) => void; }; }, task: any, sourceColumn: any) => {
        e.dataTransfer.setData("task", task);
        e.dataTransfer.setData("sourceColumn", sourceColumn);
    };

    const handleDrop = (e: { dataTransfer: { getData: (arg0: string) => any; }; }, targetColumn: string) => {
        const task = e.dataTransfer.getData("task");
        const sourceColumn = e.dataTransfer.getData("sourceColumn");

        if (targetColumn !== sourceColumn) {
            switch (targetColumn) {
                case "Backlog":
                    setBacklog([...backlog, task]);
                    break;
                case "InProgress":
                    setInProgress([...inProgress, task]);
                    break;
                case "Completed":
                    setCompleted([...completed, task]);
                    break;
                default:
                    break;
            }

            switch (sourceColumn) {
                case "Backlog":
                    setBacklog(backlog.filter((t) => t !== task));
                    break;
                case "InProgress":
                    setInProgress(inProgress.filter((t) => t !== task));
                    break;
                case "Completed":
                    setCompleted(completed.filter((t) => t !== task));
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-center p-2 space-y-2 md:space-y-0 md:space-x-2">
                <input
                    type="text"
                    value={newTicket}
                    onChange={(e) => setNewTicket(e.target.value)}
                    placeholder="Enter new ticket"
                    className="p-2 border rounded text-black w-full md:w-auto"
                />
                <button onClick={handleAddTicket} className="p-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 w-full md:w-auto">
                    Add Ticket
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-2 text-black">
                <Column
                    title="Backlog"
                    tasks={backlog}
                    onDrop={(e: any) => handleDrop(e, "Backlog")}
                    onDragStart={handleDragStart}
                    bgColor="bg-gray-200"
                    icon={<RiCheckboxBlankCircleLine />}
                    width="w-full"
                    height="auto"
                />
                <Column
                    title="InProgress"
                    tasks={inProgress}
                    onDrop={(e: any) => handleDrop(e, "InProgress")}
                    onDragStart={handleDragStart}
                    bgColor="bg-pink-200"
                    icon={<RiFileEditLine />}
                    width="w-full"
                    height="auto"
                />
                <Column
                    title="Completed"
                    tasks={completed}
                    onDrop={(e: any) => handleDrop(e, "Completed")}
                    onDragStart={handleDragStart}
                    bgColor="bg-green-200"
                    icon={<RiCheckboxCircleLine />}
                    width="w-full"
                    height="auto"
                />
            </div>
        </>
    );
};

export default Board;