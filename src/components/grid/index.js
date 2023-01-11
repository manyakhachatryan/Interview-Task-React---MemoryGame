import React from 'react'
import { useState, useEffect } from 'react';
import CardItem from '../cardItem';
import { img } from '../constants';
import { cover } from '../constants'
import './index.css'


function Grid() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [cardOne, setCardOne] = useState(null)
    const [cardTwo, setCardTwo] = useState(null)
    const [clickable, setClickable] = useState(true)

    //I used the Fisher-Yates algorithm to shuffle the elements of the arrays
    function mixeCards() {
        let mixedCards = [...img, ...img]

        for (let i = mixedCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = mixedCards[i];
            mixedCards[i] = mixedCards[j];
            mixedCards[j] = temp;
        }
        mixedCards = mixedCards.map(item => {
            return {
                ...item,
                id: Math.random()
            }
        })
        setCardOne(null)
        setCardTwo(null)
        setCards(mixedCards)
        setTurns(0)
    }

    function handleChoice(card) {
        cardOne ? setCardTwo(card) : setCardOne(card)
    }


    function restartTurn() {
        setCardOne(null)
        setCardTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setClickable(true)
    }

    useEffect(() => {

        if (cardOne && cardTwo) {
            setClickable(false)
            if (cardOne.src === cardTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(item => {
                        if (item.src === cardOne.src) {
                            console.log("aaaa", cards)
                            return {
                                ...item,
                                matched: true
                            }
                        } else {
                            return item
                        }
                    })
                })
                restartTurn();
            } else {
                setTimeout(restartTurn, 1000);
            }
        }
    }, [cardOne, cardTwo])


    useEffect(() => {
        mixeCards()
    }, [])
    return (
        <div className='textTitle'>
            <h1>
                Memory Game
            </h1>
            <div className="App">
                <button className='button' onClick={mixeCards}>New Game</button>
            </div>
            <div className='cardGrid' >
                {cards.map(item => (
                    <CardItem
                        key={item.id}
                        item={item}
                        cover={cover}
                        handleChoice={handleChoice}
                        inverse={item == cardOne || item == cardTwo || item.matched}
                        clickable={clickable}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    )
}


export default Grid