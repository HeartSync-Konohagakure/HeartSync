import React from 'react'

const ListMatches = ({ matchesData, addtoChatList }) => {
    return (
        <>
            <div className="grid grid-cols-2 m-10 lg:grid-cols-4 gap-4">
                {matchesData.map((match) => (
                    <div key={match.id} className="card lg:card-side shadow-xl">
                        <div className="card-body bg-base-200">
                            <button onClick={() => {
                                addtoChatList(match.id)
                            }} className='btn bg-base-100'>{match.username}</button>
                        </div>
                    </div>
                ))}
            </div>
        </>

    )
}

export default ListMatches