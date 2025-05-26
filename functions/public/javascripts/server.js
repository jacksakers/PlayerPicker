async function callServerFunction(functionToCall, data) {
    try {
        const response = await fetch('/server/run-function', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            function: functionToCall,
            data: JSON.stringify(data),
        }),
        });

        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error calling server function:", error);
        throw error;
    }
}

// function to check if user is logged in with firebase
async function checkUserStatus() {
    try {
        const response = await fetch('/server/check-user-status', {
        method: 'GET',
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error checking user status:", error);
        throw error;
    }
}

//function to read data from the firestore database
async function readDataFromFirestore(collectionName, documentId = null) {
    try {
        let url = `/server/read-data?collection=${collectionName}`;
        if (documentId) {
            url += `&document=${documentId}`;
        }
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error reading data from Firestore:", error);
        throw error;
    }
}

// Function to write data to the Firestore database
async function writeDataToFirestore(collectionName, data) {
    try {
        const response = await fetch(`/server/write-data?collection=${collectionName}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error writing data to Firestore:", error);
        throw error;
    }
}

// Export the function for use in other modules
export {
    callServerFunction,
    checkUserStatus,
    readDataFromFirestore,
    writeDataToFirestore
};
