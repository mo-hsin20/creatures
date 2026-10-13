// Creature now gets isAwake and its position from CreatureField (props),
// and reports clicks back up through the onWake callback.
function Creature(props) {
    const style = {
        position: 'absolute',
        left: props.x + 'px',
        top: props.y + 'px',
        textAlign: 'center',
        imageRendering: 'pixelated',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'left 0.4s ease, top 0.4s ease'
    };

    return (
        <div style={style} onClick={() => props.onWake(props.id)}>
            {props.isAwake ? (
                <img src={props.awakeImageUrl} alt={props.name + ' (awake)'} width="120" />
            ) : (
                <img src={props.sleepImageUrl} alt={props.name + ' (asleep)'} width="120" />
            )}
            <p>{props.name}, age {props.age}</p>
        </div>
    );
}

export default Creature;