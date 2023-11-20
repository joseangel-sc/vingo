import React, { useState } from 'react';

type Cell = {
    text: string;
    marked: boolean;
};

const BingoCard: React.FC = () => {
    const initialCells = Array(25).fill(null).map(() => ({ text: '', marked: false }));
    const [cells, setCells] = useState<Cell[]>(initialCells);
    const [isLocked, setIsLocked] = useState(false);

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

    const calculateFontSize = (text: string) => {
        const baseSize = 18; // Base font size
        const maxLength = 12; // Length at which to start reducing font size
        if (text.length > maxLength) {
            return Math.max(baseSize - (text.length - maxLength), 10); // Reduce font size for longer texts, minimum of 10px
        }
        return baseSize;
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '1400px',
                margin: 'auto',
                justifyContent: 'center',
            }}>
                {cells.map((cell, index) => (
                    <div key={index} style={{
                        position: 'relative',
                        margin: '5px',
                        width: 'calc(20% - 10px)', // 20% for 5 items per row minus margin
                        height: '100px', // fixed height
                    }}>
                        <input
                            type="text"
                            value={cell.text}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            style={{
                                padding: '10px',
                                textAlign: 'center',
                                fontSize: `${calculateFontSize(cell.text)}px`,
                                border: '2px solid #007bff',
                                borderRadius: '8px',
                                backgroundColor: cell.marked ? '#90ee90' : '#f1f1f1',
                                color: '#333',
                                width: '100%',
                                boxSizing: 'border-box',
                                height: '100px'
                            }}
                            disabled={isLocked}
                        />
                        <button onClick={() => toggleMarkCell(index)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    padding: '0',
                                    fontSize: '16px',
                                    borderRadius: '50%',
                                    backgroundColor: 'green',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    height: '20px',
                                    width: '20px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                tabIndex={-1}
                        >
                            ✓
                        </button>
                    </div>
                ))}

            </div>
            <button
                onClick={toggleLock}
                disabled={!isLocked && cells.some(cell => cell.text.trim() === '')}
                style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}
            >
                {isLocked ? 'Unlock Card' : 'Lock Card'}
            </button>
        </div>
    );
};

export default BingoCard;
