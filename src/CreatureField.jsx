import { useState } from 'react';
import Creature from './Creature.jsx';

const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 800;
// Approximate size of one creature, so it never moves outside the field
const CREATURE_WIDTH = 130;
const CREATURE_HEIGHT = 170;

const initialCreatures = [
    {
        id: 1, name: "Mr. Fresh", age: 3,
        sleepImageUrl: "/images/first_sleep.png",
        awakeImageUrl: "/images/first_awake.png",
        x: 120, y: 140, isAwake: false
    },
    {
        id: 2, name: "Meimei", age: 5,
        sleepImageUrl: "/images/second_sleep.png",
        awakeImageUrl: "/images/second_awake.png",
        x: 300, y: 260, isAwake: false
    },
    {
        id: 3, name: "Bingus", age: 2,
        sleepImageUrl: "/images/third_sleep.png",
        awakeImageUrl: "/images/third_awake.png",
        x: 550, y: 40, isAwake: false
    },
    {
        id: 4, name: "Leipä", age: 4,
        sleepImageUrl: "/images/fourth_sleep.png",
        awakeImageUrl: "/images/fourth_awake.png",
        x: 150, y: 420, isAwake: false
    },
    {
        id: 5, name: "Mista", age: 4,
        sleepImageUrl: "/images/fifth_sleep.png",
        awakeImageUrl: "/images/fifth_awake.png",
        x: 550, y: 590, isAwake: false
    }
];

function randomX() {
    return Math.floor(Math.random() * (FIELD_WIDTH - CREATURE_WIDTH));
}

function randomY() {
    return Math.floor(Math.random() * (FIELD_HEIGHT - CREATURE_HEIGHT));
}

function CreatureField() {
    // Lifted state: one array holding every creature's data
    const [creatures, setCreatures] = useState(initialCreatures);

    // Called by a Creature when it is clicked
    function handleWake(id) {
        setCreatures(creatures.map(creature => {
            if (creature.id !== id) {
                return creature; // other creatures stay unchanged
            }
            if (creature.isAwake) {
                // Going to sleep: stay in the same place
                return { ...creature, isAwake: false };
            }
            // Waking up: move to a new random position
            return { ...creature, isAwake: true, x: randomX(), y: randomY() };
        }));
    }

    // Values calculated from the lifted state
    const awakeCount = creatures.filter(c => c.isAwake).length;
    const allAwake = awakeCount === creatures.length;
    const allAsleep = awakeCount === 0;

    // "Wake all" / "Let all sleep" button
    function handleToggleAll() {
        if (allAwake) {
            setCreatures(creatures.map(c => ({ ...c, isAwake: false })));
        } else {
            setCreatures(creatures.map(c =>
                c.isAwake ? c : { ...c, isAwake: true, x: randomX(), y: randomY() }
            ));
        }
    }

    // Background colour changes when all are awake or all are asleep
    let backgroundColor = '#6b8c66';           // mixed
    if (allAwake) backgroundColor = '#e8c547';  // everyone awake: sunny
    if (allAsleep) backgroundColor = '#2f3e5c'; // everyone asleep: night

    const fieldStyle = {
        position: 'relative',
        width: FIELD_WIDTH + 'px',
        height: FIELD_HEIGHT + 'px',
        border: '2px solid #ccc',
        margin: '20px auto',
        backgroundColor: backgroundColor,
        transition: 'background-color 0.5s ease'
    };

    return (
        <div>
            <p>{awakeCount} of {creatures.length} creatures awake</p>
            <button onClick={handleToggleAll}>
                {allAwake ? 'Let all sleep' : 'Wake all'}
            </button>
            <div style={fieldStyle}>
                {creatures.map(creature => (
                    <Creature
                        key={creature.id}
                        id={creature.id}
                        name={creature.name}
                        age={creature.age}
                        sleepImageUrl={creature.sleepImageUrl}
                        awakeImageUrl={creature.awakeImageUrl}
                        x={creature.x} y={creature.y}
                        isAwake={creature.isAwake}
                        onWake={handleWake}
                    />
                ))}
            </div>
        </div>
    );
}

export default CreatureField;