import React from 'react'

const Tips = () => {
    return (
        <>
            <div className="border rounded-lg p-4 bg-blue-50">

                <h3 className="font-semibold mb-3">
                    Tips
                </h3>

                <ul>

                    {diet.tips.map((tip) => (

                        <li key={tip}>
                            {tip}
                        </li>

                    ))}

                </ul>

            </div>
        </>
    )
}

export default Tips