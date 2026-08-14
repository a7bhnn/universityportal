import React, { useState, useEffect } from 'react';

function TitleUpdater() {
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        document.title = `Clicks ${clicks}` ;
    }, [clicks]);

    return (
        <button onClick={() => setClicks(clicks + 1)}>
            Clicks: {clicks}
        </button>
    );
}

export default TitleUpdater;