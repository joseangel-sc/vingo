import React from 'react';

type BingoCellProps = {
    text: string;
    marked: boolean;
    isLocked: boolean;
    onTextChange: (newText: string) => void;
    onToggleMark: () => void;
    onFocus: () => void;
    style?: React.CSSProperties; // Add this line
};


const BingoCell: React.FC<BingoCellProps> = ({
                                                 text,
                                                 marked,
                                                 isLocked,
                                                 onTextChange,
                                                 onToggleMark,
                                                 onFocus,
                                                 style
                                             }) => {
    return (
        <div style={{...style, position: 'relative', border: '1px solid #333', borderRadius: '5px',
        }}>
            <textarea
                value={text}
                onChange={(e) => onTextChange(e.target.value)}
                style={{
                    resize: 'none',
                    overflow: 'auto',
                    textAlign: 'center',
                    fontSize: '16px',
                    backgroundColor: 'inherit',
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

            <button onClick={onToggleMark}
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
    );
};

export default BingoCell;
