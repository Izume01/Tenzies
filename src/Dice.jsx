export default function Dice(prop) {
    const style = {
        backgroundColor: prop.holding ? "green" : "white",
        color: prop.holding ? "white" : "black"
    }
    

    return (
        <>
            <button style={style} key={prop.key} onClick={prop.onLockDice}>{prop.value}</button>
        </>
    )
}