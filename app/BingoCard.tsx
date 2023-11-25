import React, { useEffect, useState } from 'react';
import BingoModalText from "./BingoModalText";
import BingoCell from "./BingoCell";

type Cell = {
    text: string;
    marked: boolean;
};

const BingoCard: React.FC = () => {
    const defaultCells = Array(16).fill(null).map(() => ({ text: '', marked: false }));
    const [cells, setCells] = useState<Cell[]>(defaultCells);
    const [isLocked, setIsLocked] = useState<boolean>(false);
    const [focusedCell, setFocusedCell] = useState<number | null>(null);

    useEffect(() => {
        // Load state from local storage if window object is available (client-side)
        if (typeof window !== 'undefined') {
            const savedCells = localStorage.getItem('cells');
            if (savedCells) {
                setCells(JSON.parse(savedCells));
            }

            const isLockedState = localStorage.getItem('isLocked');
            if (isLockedState) {
                setIsLocked(JSON.parse(isLockedState));
            }

            const urlHash = window.location.hash.substring(1);
            if (urlHash) {
                fetchSavedData(urlHash);
            }
        }
    }, []);

    useEffect(() => {
        // Save the current state of cells and isLocked to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('cells', JSON.stringify(cells));
            localStorage.setItem('isLocked', JSON.stringify(isLocked));
        }
    }, [cells, isLocked]);


    useEffect(() => {
        // Save the current state of cells and isLocked to localStorage
        localStorage.setItem('cells', JSON.stringify(cells));
        localStorage.setItem('isLocked', JSON.stringify(isLocked));
    }, [cells, isLocked]);

    useEffect(() => {
        const urlHash = window.location.hash.substring(1);
        if (urlHash) {
            fetchSavedData(urlHash);
        }
    }, []);
    // Load state from local storage or fetch from server if window object is available (client-side)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedCells = window.localStorage.getItem('cells');
            if (savedCells) {
                setCells(JSON.parse(savedCells));
            }

            const isLockedState = window.localStorage.getItem('isLocked');
            setIsLocked(isLockedState === 'true');

            const urlHash = window.location.hash.substring(1);
            if (urlHash) {
                fetchSavedData(urlHash);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('cells', JSON.stringify(cells));
            window.localStorage.setItem('isLocked', JSON.stringify(isLocked));
        }
    }, [cells, isLocked]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('cells', JSON.stringify(cells));
            window.localStorage.setItem('isLocked', JSON.stringify(isLocked));
        }
    }, [cells, isLocked]);

    const fetchSavedData = async (hash: string) => {
        try {
            const response = await fetch(`https://api.justdecision.com/bingo/${hash}`);
            if (!response.ok) {
                throw new Error('Failed to fetch saved data');
            }
            const data = await response.json();
            setCells(data.cells.map((text: string) => ({ text, marked: false })));
            setIsLocked(true);
        } catch (error) {
            console.error('There was an error fetching the saved data:', error);
        }
    };

    const handleInputChange = (index: number, value: string) => {
        const newCells = [...cells];
        newCells[index].text = value;
        setCells(newCells);
    };

    const toggleMarkCell = (index: number) => {
        const newCells = [...cells];
        newCells[index].marked = !newCells[index].marked;
        setCells(newCells);
    };

    const toggleLock = () => {
        const allCellsFilled = cells.every(cell => cell.text.trim() !== '');
        if (allCellsFilled && !isLocked) {
            setIsLocked(true);
            saveBingoCard();
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

    const prepareJsonData = () => {
        const cellTexts = cells.map(cell => cell.text);
        const data = { cells: cellTexts };
        return JSON.stringify(data);
    };

    const updateURLWithHash = (hash: string) => {
        window.history.pushState({}, '', `#${hash}`);
    };

    const saveBingoCard = async () => {
        const jsonData = prepareJsonData();

        try {
            const response = await fetch('https://api.justdecision.com/bingo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            const hash = responseData.hash;
            updateURLWithHash(hash);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div className="bingo-card">
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
