export default async function addToAnki(
    words, trackWord, sentence, setAnkiError, setAddToAnkiPrompt, setIsSucceed
) {
    const ankiUrl = "http://127.0.0.1:8765"
    const deckName = "Heluhelu"

    try {
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
            // console.log("Deck created:", createDeckData);

            if (createDeckData.error) {
                // console.error("Error creating deck:", createDeckData.error);
                setAddToAnkiPrompt(false)
                setAnkiError(createDeckData.error)
                return; // Stop execution if deck creation fails
            }

            
        } 
        // ------------------------------Add new card to anki------------------------------
        const wordToAdd = words.filter(w => w.hawaiian_clean === trackWord) // might not exists

        const card = {
            front: `${trackWord} \n ${sentence}`, 
            back: wordToAdd[0]?.translation || "", 
        }
        const note = {
            deckName: "Heluhelu",
            modelName: "Basic",
            fields: card,
            options: {allowDuplicate: false},
            tags: ["auto-added"]
        }
        
        console.log("note", note)
        
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
            setAddToAnkiPrompt(false)
            setAnkiError(addCardData.error)
        } else {
            setAnkiError("")
            setAddToAnkiPrompt(false)
            setIsSucceed(true)
            // alert(`Successfully added ${addCardData.result.length} notes!`);
        }


    } catch(error) {
        console.error("Error checking/creating deck:", error);
        setAddToAnkiPrompt(false)
        setAnkiError(error)
    }
}
