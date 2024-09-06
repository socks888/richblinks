// page.tsx
// route: /app/page.tsx

"use client";

import { useState } from 'react';

export default function BlinkForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [amount1, setAmount1] = useState('0.01');
    const [amount2, setAmount2] = useState('0.05');
    const [label, setLabel] = useState('');
    const [blinkUrl, setBlinkUrl] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = {
            title: title,
            description: description,
            image_url: imageUrl,
            amount1: parseFloat(amount1),
            amount2: parseFloat(amount2),
            label: label,
            wallet_address: walletAddress,
        };

        const res = await fetch('/api/createBlink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            const result = await res.json();
            setBlinkUrl(result.blinkUrl);
        }
    };

    return (
        <div className="form-container">
            {blinkUrl ? (
                <div className="blink-url-container">
                    <input
                        type="text"
                        value={blinkUrl}
                        readOnly
                        className="blink-url"
                    />
                    <button
                        onClick={() => navigator.clipboard.writeText(blinkUrl)}
                        className="copy-btn"
                    >
                        Copy
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="blink-form">
                    <h1>Create your blink</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Amount 1 (0.01)"
                            value={amount1}
                            onChange={(e) => setAmount1(e.target.value)}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Amount 2 (0.05)"
                            value={amount2}
                            onChange={(e) => setAmount2(e.target.value)}
                            step="0.01"
                            min="0"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}



