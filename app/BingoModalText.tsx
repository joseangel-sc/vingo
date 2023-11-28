import React from 'react';
import { colors } from './styles/colors';

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
            backgroundColor: "#1113",
            backdropFilter: "blur(5px)",
            position: 'absolute',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            inset: 0,
            zIndex: 2
        }} onClick={onClose}>
            <div style={{
                position: "absolute",

                width: '80%',
                maxWidth: '500px',
                height: 'auto',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
                borderRadius: '10px',
            }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{
                    position: 'relative',
                    padding: '20px',
                    backgroundColor: colors.primary,
                    borderRadius: '10px',
                    display: "flex",
                    width: '100%',
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
                            appearance: "none",
                            backgroundColor: "transparent"
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
        </div>
    );
};

export default BingoModalText;
