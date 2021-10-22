import React from 'react'
import { Button } from "@material-ui/core";

const Header = ({ moves, handleRestart }) => {
    return (
        <header>
            <h3>Play Flip card game</h3>
            <h3 className="text-center">Moves: {moves} </h3>
            <div className="restart">
                <Button onClick={handleRestart} color="secondary" variant="contained"> Restart</Button>
            </div>
        </header>
    )
}

export default Header
