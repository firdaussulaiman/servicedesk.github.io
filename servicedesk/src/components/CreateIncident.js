const CreateIncident = () => {
    return (
        <div className="create">
            <h2>Create Incident</h2>
            <form>
                <label>Incident Name:</label>
                <input type="text" required/>
                <label>Incident Description:</label>
                <textarea required></textarea>
                <label>Incident Priority:</label>
                <select required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                </select>
                <label>Incident Status:</label>
                <select required>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
                <label>Incident Date:</label>
                <input type="date" required/>
                <button>Add Incident</button>
            </form> 
        </div>
    );
}

export default CreateIncident;