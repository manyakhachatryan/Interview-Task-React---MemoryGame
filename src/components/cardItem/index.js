import React from 'react'
import './index.css'
function CardItem({ item, cover, handleChoice, inverse, clickable }) {

    function handleClick(item) {
        if (clickable) {
            handleChoice(item)
        }
    }

    return (
        <div className='cardItem'>
            <div>
                {inverse ? <img src={item.src} /> : <img src={cover.src} onClick={() => handleClick(item)} />}
            </div>
        </div>
    )
}

export default CardItem