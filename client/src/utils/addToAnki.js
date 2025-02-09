export default async function addToAnki(
    word, translation, setAnkiError, 
    setAddAnkiSucceed, 
) {
    const ankiUrl = "http://127.0.0.1:8765"
    const deckName = "Heluhelu"

    try {
        setAnkiError("")

        // ------------------------------check if deck exists------------------------------
        const checkDeckResponse = await fetch(ankiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({action: "deckNames",version: 6,})
        })

        const checkDeckData = await checkDeckResponse.json()

        
        if (!checkDeckData.result.includes(deckName)) {
            // console.log(`Deck "${deckName}" does not exist. Creating it now...`);
            // ------------------------------create deck named 'Heluhelu'------------------------------
            const createDeckResponse = await fetch(ankiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({action: "createDeck",version: 6, params: {deck: deckName}})
            })
            
            const createDeckData = await createDeckResponse.json()

            if (createDeckData.error) {
                // console.error("Error creating deck:", createDeckData.error);
                setAnkiError(createDeckData.error)
                return; // Stop execution if deck creation fails
            }

            
        } 
        // ------------------------------Add new card to anki------------------------------
        const card = {
            front: word, 
            back: translation || "", 
        }
        const note = {
            deckName: "Heluhelu",
            modelName: "Basic",
            fields: card,
            options: {allowDuplicate: false},
            tags: ["auto-added"]
        }
                
        const payload = {
            action: "addNotes", 
            version: 6, 
            params: {notes: [note]}
        }
            
        const addCardResponse = await fetch("http://127.0.0.1:8765", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
        const addCardData = await addCardResponse.json()
        // console.log("Card added successfully:", addCardData.result);

        if (addCardData.error) {
            console.error("Error adding notes:", addCardData.error);
            setAnkiError(addCardData.error)
        } else {
            setAnkiError("")
            setAddAnkiSucceed(true)
            setTimeout(() => {
                setAddAnkiSucceed(false);
            }, 1000);
            // alert(`Successfully added ${addCardData.result.length} notes!`);
        }


    } catch(error) {
        console.error("Error checking/creating deck:", error);
        setAnkiError(error)
    }
}
