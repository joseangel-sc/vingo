import React, {useState} from 'react';
import BingoModalText from "./BingoModalText";
import BingoCell from "./BingoCell";

type Cell = {
    text: string;
    marked: boolean;
};

const BingoCard: React.FC = () => {
    const initialCells = Array(16).fill(null).map(() => ({text: '', marked: false}));
    const [cells, setCells] = useState<Cell[]>(initialCells);
    const [isLocked, setIsLocked] = useState(false);
    const [focusedCell, setFocusedCell] = useState<number | null>(null);


    const handleInputChange = (index: number, value: string) => {
        if (!isLocked) {
            const newCells = [...cells];
            newCells[index].text = value;
            setCells(newCells);
        }
    };

    const toggleMarkCell = (index: number) => {
        if (!isLocked) {
            const newCells = [...cells];
            newCells[index].marked = !newCells[index].marked;
            setCells(newCells);
        }
    };

    const toggleLock = () => {
        if (!isLocked && cells.every(cell => cell.text.trim() !== '')) {
            setIsLocked(true);
        } else if (isLocked) {
            setIsLocked(false);
        }
    };

    const handleFocus = (index: number) => {
        setFocusedCell(index);
    };

    const handleBlur = () => {
        setFocusedCell(null);
    };

    const handleNextCell = () => {
        setFocusedCell(prev => (prev !== null && prev < cells.length - 1) ? prev + 1 : prev);
    };

    const handlePreviousCell = () => {
        setFocusedCell(prev => (prev !== null && prev > 0) ? prev - 1 : prev);
    };


    return (
        <div>
            {focusedCell !== null && (
                <BingoModalText
                    text={cells[focusedCell].text}
                    onTextChange={(newText) => handleInputChange(focusedCell, newText)}
                    onClose={handleBlur}
                    onNext={handleNextCell}
                    onPrevious={handlePreviousCell}
                />
            )}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '100%',
                margin: 'auto',
                justifyContent: 'center',
            }}>
                {cells.map((cell, index) => (
                    <BingoCell
                        key={index}
                        text={cell.text}
                        marked={cell.marked}
                        isLocked={isLocked}
                        onTextChange={(newText) => handleInputChange(index, newText)}
                        onToggleMark={() => toggleMarkCell(index)}
                        onFocus={() => handleFocus(index)}
                        style={{
                            margin: '5px',
                            width: 'calc(20% - 8px)',
                            minHeight: '100px',
                        }}
                    />
                ))}
            </div>
            <button
                onClick={toggleLock}
                disabled={!isLocked && cells.some(cell => cell.text.trim() === '')}
                style={{marginTop: '20px', fontSize: '16px'}}
            >
                {isLocked ? '🔒' : '🔓'}
            </button>
        </div>
    );
}

export default BingoCard;
