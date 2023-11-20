import React, {useState} from 'react';

type Cell = {
    text: string;
    marked: boolean;
};

const BingoCard: React.FC = () => {
    const initialCells = Array(25).fill(null).map(() => ({text: '', marked: false}));
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

    return (
        <div>
            {focusedCell !== null && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2
                }}>
                    <textarea
                        value={cells[focusedCell].text}
                        onChange={(e) => handleInputChange(focusedCell, e.target.value)}
                        style={{
                            resize: 'none',
                            overflow: 'auto',
                            padding: '20px',
                            textAlign: 'center',
                            fontSize: '20px',
                            border: '3px solid #007bff',
                            borderRadius: '10px',
                            backgroundColor: '#fff',
                            color: '#333',
                            width: '50%',
                            minHeight: '200px',
                            boxSizing: 'border-box',
                        }}
                        onBlur={handleBlur}
                    />
                </div>
            )}
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: '100%',
                margin: 'auto',
                justifyContent: 'center',
            }}>
                {cells.map((cell, index) => (
                    <div key={index} style={{
                        position: 'relative',
                        margin: '5px',
                        width: 'calc(20% - 10px)',
                        minHeight: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: focusedCell === index ? 'scale(1.1)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                        zIndex: focusedCell === index ? 1 : 0,
                    }}>
                     <textarea
                         value={cell.text}
                         onChange={(e) => handleInputChange(index, e.target.value)}
                         style={{
                             resize: 'none',
                             overflow: 'auto',
                             padding: '10px',
                             textAlign: 'center',
                             fontSize: '16px',
                             border: '2px solid #007bff',
                             borderRadius: '8px',
                             backgroundColor: cell.marked ? '#90ee90' : '#f1f1f1',
                             color: '#333',
                             width: '100%',
                             minHeight: '80px',
                             boxSizing: 'border-box',
                         }}
                         onFocus={() => handleFocus(index)}
                         onBlur={handleBlur}
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
                style={{marginTop: '20px', padding: '10px 20px', fontSize: '16px'}}
            >
                {isLocked ? 'Unlock Card' : 'Lock Card'}
            </button>
        </div>
    );
};

export default BingoCard;
