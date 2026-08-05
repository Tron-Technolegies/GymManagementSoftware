import React from 'react'

const Avoidfood = () => {
    return (
        <>
            <div className="border rounded-lg p-4 bg-red-50">

                <h3 className="font-semibold mb-3">
                    Foods to Avoid
                </h3>

                <ul>

                    {diet.foods_to_avoid.map((food) => (

                        <li key={food}>
                            {food}
                        </li>

                    ))}

                </ul>

            </div>
        </>
    )
}

export default Avoidfood