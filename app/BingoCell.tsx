import React, { useEffect, useRef, useState } from 'react';

type BingoCellProps = {
    text: string;
    marked: boolean;
    isLocked: boolean;
    onTextChange: (newText: string) => void;
    onToggleMark: () => void;
    onFocus: () => void;
    style?: React.CSSProperties;
}

const BingoCell: React.FC<BingoCellProps> = ({
                                                 text,
                                                 marked,
                                                 isLocked,
                                                 onTextChange,
                                                 onToggleMark,
                                                 onFocus,
                                                 style
                                             }) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [fontSize, setFontSize] = useState(16);

    useEffect(() => {
        const adjustFontSizeToFit = () => {
            if (textAreaRef.current) {
                let currentFontSize = 16;
                const maxHeight = textAreaRef.current.clientHeight;
                textAreaRef.current.style.fontSize = `${currentFontSize}px`;

                while (textAreaRef.current.scrollHeight > maxHeight && currentFontSize > 1) {
                    currentFontSize--;
                    textAreaRef.current.style.fontSize = `${currentFontSize}px`;
                }

                setFontSize(currentFontSize);
            }
        };

        window.addEventListener('resize', adjustFontSizeToFit);
        return () => window.removeEventListener('resize', adjustFontSizeToFit);
    }, [text, style]);

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.fontSize = `${fontSize}px`;
        }
    }, [fontSize]);

    return (
        <div style={{ ...style, position: 'relative', border: '1px solid #333', borderRadius: '5px', padding: '10px' }}>
            <textarea
                ref={textAreaRef}
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                style={{
                    resize: 'none',
                    overflow: 'auto',
                    textAlign: 'center',
                    backgroundColor: marked ? 'lightgreen' : 'inherit',
                    color: '#333',
                    width: '100%',
                    minHeight: '80px',
                    boxSizing: 'border-box',
                    border: 'none',
                }}
                onFocus={onFocus}
                disabled={isLocked}
                readOnly={isLocked}
            />

            {isLocked && (
            <button onClick={onToggleMark}
                    style={{
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
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
            </button> )}
        </div>
    );
};

export default BingoCell;
