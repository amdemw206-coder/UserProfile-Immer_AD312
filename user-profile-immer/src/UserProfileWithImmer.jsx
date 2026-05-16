import { useImmer } from 'use-immer'; 
import { useState } from 'react'; 


export function UserProfile(){
    const initialState =
        {
            name: "", 
            email: "", 
            contactDetails: {
                phone: "", 
                address: ""
            },
            preferences: {
                newsletter: false, 
                notifications: false
            }

        }
    const [userProfile, setUserProfile] = useImmer(initialState)
    const [input, setInput] = useState(initialState)


    const updateContactDetails = (newPhone, newAddress, newName) => {
        setUserProfile(draft => {
            draft.contactDetails.phone = newPhone
            draft.contactDetails.address = newAddress
            draft.name = newName
        })
    }
    
    const toggleNewsletterSubscription = () => {
        setUserProfile(draft => {
            draft.preferences.newsletter = !draft.preferences.newsletter
        })
        
    }

    return(
        <>
        <h1>User Profile</h1>
        <form onSubmit={e => {
            e.preventDefault()
            updateContactDetails(input.contactDetails.phone, input.contactDetails.address, input.name)
        }}>
            <label>
                Enter Name:
                <input
                value={input.name}
                onChange={e => setInput({...input, name: e.target.value})}/> 
            </label>

            <label>
                Enter Phone Number: 
                <input 
                value={input.contactDetails.phone}
                onChange={e => setInput({
                    ...input,
                    contactDetails: {...input.contactDetails, phone: e.target.value}})}/>
            </label>

            <label>
               Enter Address: 
               <input
               value={input.contactDetails.address}
                onChange={e => setInput({
                    ...input,
                    contactDetails: {...input.contactDetails, address: e.target.value}})}/>
            </label>

            <label>
                <button onClick={() => toggleNewsletterSubscription()}>
                    Get Notified for Newsletters?    
                </button>
            </label>

            <button type="submit">Update Infromation</button>
        
        </form>

        <h3>Current User</h3>
            <pre>{JSON.stringify(userProfile, null, 2)}</pre>
        </>
    )

}
