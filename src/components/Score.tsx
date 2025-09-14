import "./Score.css";

interface ScoreProps {
    score: number,
    index: number,
    total: number,
}

const Score = ({ score, index, total }: ScoreProps) => (
    <div className="score-wrapper">
        <p className="score"> Score: {score} / {index} </p>
        <div className="progress-wrapper">
            <p> {index} of {total} </p>
            <progress value={index} max={total}> </progress> 
        </div>
    </div>
)

export default Score