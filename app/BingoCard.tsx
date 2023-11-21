import React, { useEffect, useState } from 'react';
import BingoModalText from "./BingoModalText";
import BingoCell from "./BingoCell";

type Cell = {
    text: string;
    marked: boolean;
};

const BingoCard: React.FC = () => {
    const [cells, setCells] = useState<Cell[]>(() => {
        if (typeof window !== 'undefined') {
            const savedCells = window.localStorage.getItem('cells');
            return savedCells ? JSON.parse(savedCells) : Array(16).fill(null).map(() => ({ text: '', marked: false }));
        }
        return Array(16).fill(null).map(() => ({ text: '', marked: false }));
    });
    const [isLocked, setIsLocked] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('isLocked') === 'true';
        }
        return false;
    });
    const [focusedCell, setFocusedCell] = useState<number | null>(null);

    useEffect(() => {
        const allCellsFilled = cells.every(cell => cell.text.trim() !== '');
        if (allCellsFilled && !isLocked) {
            setIsLocked(true);
        } else if (!allCellsFilled && isLocked) {
            setIsLocked(false);
        }
    }, [cells, isLocked]);


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('cells', JSON.stringify(cells));
            window.localStorage.setItem('isLocked', JSON.stringify(isLocked));
        }
    }, [cells, isLocked]);

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
        setIsLocked(!isLocked);
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
                justifyContent: 'space-around',
                gap: '5px',
                padding: '5px',
            }}>
                {cells.map((cell, index) => (
                    <BingoCell
                        key={index}
                        text={cell.text}
                        marked={cell.marked}
                        isLocked={isLocked}
                        onTextChange={(newText: string) => handleInputChange(index, newText)}
                        onToggleMark={() => toggleMarkCell(index)}
                        onFocus={() => handleFocus(index)}
                        style={{
                            width: 'calc(25% - 10px)',
                            minHeight: '120px',
                            boxSizing: 'border-box',
                        }}
                    />
                ))}
            </div>
            <button
                onClick={toggleLock}
                disabled={isLocked || !cells.every(cell => cell.text.trim() !== '')}
                style={{marginTop: '20px', fontSize: '16px'}}
            >
                {isLocked ? '🔒' : '🔓'}
            </button>
        </div>
    );
}

export default BingoCard;
