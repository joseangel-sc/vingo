import React from 'react';

type BingoTextProps = {
    text: string;
    onTextChange: (newText: string) => void;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
};

const BingoModalText: React.FC<BingoTextProps> = ({ text, onTextChange, onClose, onNext, onPrevious }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px',
            height: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
            borderRadius: '10px',
        }}>
            <div style={{
                position: 'relative',
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '10px',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                <textarea
                    value={text}
                    onChange={(e) => onTextChange(e.target.value)}
                    style={{
                        width: '100%',
                        minHeight: '150px',
                        padding: '10px',
                        margin: '0',
                        border: '1px solid #007bff',
                        borderRadius: '5px',
                        fontSize: '26px',
                        resize: 'vertical',
                    }}
                />
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    height: '30px',
                    width: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}> X </button>
                <button onClick={onPrevious} style={{
                    position: 'absolute',
                    left: '10px',
                    bottom: '10px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '5px 10px',
                    fontSize: '24px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}> ⏪ </button>

                <button onClick={onNext} style={{
                    position: 'absolute',
                    right: '10px',
                    bottom: '10px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '5px 10px',
                    fontSize: '24px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}> ⏩️️ </button>
            </div>
        </div>
    );
};

export default BingoModalText;
