import React from "react";
import { Trash2 } from "lucide-react";

const DeleteBranch = ({
    branch,
    onDelete,
    isSuperuser,
}) => {
    if (!isSuperuser) return null;

    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onDelete(branch);
            }}
            className="p-2 rounded-md hover:bg-red-100"
        >
            <Trash2
                size={16}
                className="text-red-600"
            />
        </button>
    );
};

export default DeleteBranch;