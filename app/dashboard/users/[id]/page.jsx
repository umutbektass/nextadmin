import { updateUser } from '@/app/lib/actions'
import { fetchUser } from '@/app/lib/data'
import styles from '@/app/ui/dashboard/users/singleUser/singleUser.module.css'
import Image from 'next/image'
const SingleUserPage = async({params}) => {
    const {id} = params
   
    const user = await fetchUser(id)
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
            <div className={styles.imageContainer}>
            <Image src={user.img || "/noavatar.png"} alt='' fill/>
            </div>
            {user.username}
            </div>
            <div className={styles.formContainer}>
                <form action={updateUser} className={styles.form}>
                 <input type='hidden' name='id' value={user.id}/>
               
            <label>Username</label>
            <input type='text' name='username' placeholder={user.username} ></input>
            <label>Email</label>
            <input type='email' name='email' placeholder={user.email} ></input>
            <label>Password</label>
            <input type='password' name='password' placeholder='******'></input>
            <label>Phone</label>
            <input type='text' name='phone' placeholder={user.phone} ></input>
            <label>Address</label>
            <textarea type='text' name='address' placeholder='Istanbul/Turkey' value=  {user.address}></textarea>
            <label>Is Admin?</label>
            <select name='isAdmin' id='isAdmin' value=  {user.isAdmin}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <label>Is Active?</label>
            <select name='isActive' id='isActive' value=  {user.isActive}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
            <button>Update</button>
            </form>
            </div>
        </div>
    )
}

export default SingleUserPage