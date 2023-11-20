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
            <div style={{ position: 'relative', display: 'inline-block' }}> {/* Ensure the container div is properly displayed */}
                <textarea
                    value={text}
                    onChange={(e) => onTextChange(e.target.value)}
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
                    onBlur={onClose}
                />
                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    fontSize: '16px',
                    borderRadius: '50%',
                    backgroundColor: '#ff0000',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    height: '30px',
                    width: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>X</button>
                <button onClick={onPrevious} style={{
                    position: 'absolute',
                    left: '-50px',  // Move outside the writing area
                    top: '50%',
                    transform: 'translateY(-50%)', // Vertically center
                    padding: '10px 20px',
                    fontSize: '12px',
                    backgroundColor: 'lightgray',
                    border: 'none',
                    cursor: 'pointer',
                }}>Previous</button>

                <button onClick={onNext} style={{
                    position: 'absolute',
                    right: '-50px', // Move outside the writing area
                    top: '50%',
                    transform: 'translateY(-50%)', // Vertically center
                    padding: '10px 20px',
                    fontSize: '12px',
                    backgroundColor: 'lightgray',
                    border: 'none',
                    cursor: 'pointer',
                }}>Next</button>
            </div>
        </div>
    );
};

export default BingoModalText;