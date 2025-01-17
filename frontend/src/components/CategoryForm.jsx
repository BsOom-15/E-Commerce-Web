const CategoryForm = ({
    value, 
    setValue, 
    handeleSubmit,
    buttonText = "Submit", 
    handeleDelete,
}) => {
    return (
        <div className="p-3">
        <form onSubmit={handeleSubmit} className="space-y-3">
            <input type="text"
            className="py-3 px-4 border-lg w-full"
            placeholder="Write category name"
            value={value}
            onChange={e => setValue(e.target.value)}
            />

            <div className="flex justify-between">
                <button className="bg-pink-500 py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
                    {buttonText}
                </button>

                {handeleDelete && (
                    <button
                    onClick={handeleDelete}
                    className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    Delete
                    </button>
                )}
            </div>
        </form>
        </div>
    )
}

export default CategoryForm
