import React from 'react'

const Supplements = () => {
    return (
        <>
            <div className="border rounded-lg p-4">

                <h3 className="font-semibold mb-3">
                    Supplements
                </h3>

                <ul>

                    {diet.supplements.map((supplement) => (

                        <li key={supplement}>
                            {supplement}
                        </li>

                    ))}

                </ul>

            </div>
        </>
    )
}

export default Supplements