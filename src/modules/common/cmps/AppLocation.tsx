import { useStore } from "@/store/useStore"
import { AppRoundButton } from "./AppRoundButton";
import addIcon from '@/assets/icons/add.svg?react'

export const AppLocation = () => {
    //get user from the Zistand store
    const user = useStore(state => state.user)
    
    const onAddUserAddress = () => {
        // TODO: Implement adding user address logic
        console.log('Add user address clicked')
    }
    return (
        <section className="app-location flex column space-between">
            
            <h1>ברוכים הבאים</h1>
            {user && user.address && 
            <div>
                <h2>{user.address + ', ' + user.city}</h2>
            </div>
            }
            {!user?.address && 
                <AppRoundButton Icon={addIcon} onClick={onAddUserAddress}/>}
        </section>
    )
}
