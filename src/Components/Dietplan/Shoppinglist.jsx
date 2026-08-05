import React from 'react'

const Shoppinglist = () => {
    return (
        <>
            <div className="border rounded-lg p-4">

                <h3 className="font-semibold mb-3">
                    Shopping List
                </h3>

                <div className="flex flex-wrap gap-2">

                    {diet.shopping_list.map((item) => (

                        <span
                            key={item}
                            className="bg-gray-100 px-3 py-1 rounded"
                        >
                            {item}
                        </span>

                    ))}

                </div>

            </div>
        </>
    )
}

export default Shoppinglist