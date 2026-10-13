import { useState } from 'react';

function Creature(props) {
    const [isAwake, setIsAwake] = useState(false);
    const [x, setX] = useState(props.x);
    const [y, setY] = useState(props.y);

    function handleClick() {
        if (!isAwake) {
            // Waking up: move to a random spot inside the 800x800 field.
            // (130 x 170 is roughly the size of one creature.)
            setX(Math.floor(Math.random() * (800 - 130)));
            setY(Math.floor(Math.random() * (800 - 170)));
        }
        // Several setters in one handler -> React batches them into one re-render
        setIsAwake(!isAwake);
    }

    const style = {
        position: 'absolute',
        left: x + 'px',
        top: y + 'px',
        textAlign: 'center',
        imageRendering: 'pixelated',
        cursor: 'pointer'
    };

    return (
        <div style={style} onClick={handleClick}>
            {isAwake ? (
                <img src={props.awakeImageUrl} alt={props.name + ' (awake)'} width="120" />
            ) : (
                <img src={props.sleepImageUrl} alt={props.name + ' (asleep)'} width="120" />
            )}
            <p>{props.name}, age {props.age}</p>
        </div>
    );
}

export default Creature;