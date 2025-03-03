import { useState } from "react";
import useTodo from "../hooks/useTodo";

export default function AddTodo() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const {loading, addTodo} = useTodo();
    const handleAddTodo = async () => {
        await addTodo({title,description});
    };

    return (
        <div>
            {/* Button to Open Modal */}
            <button className="open-modal-btn btn" onClick={() => setShowModal(true)}>Add Todo</button>

            {/* Modal (Only shows if showModal is true) */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Add a New Todo</h2>
                        <input className="input-todo"
                            type="text" 
                            placeholder="Enter title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <input className="input-todo"
                            type="text" 
                            placeholder="Enter description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                        <button className="save-btn" onClick={handleAddTodo}>Save Todo</button>
                        <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}