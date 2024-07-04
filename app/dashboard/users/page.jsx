import Pagination from '@/app/ui/dashboard/pagination/pagination'
import Search from '@/app/ui/dashboard/search/search'
import styles from '@/app/ui/dashboard/users/users.module.css'
import Image from 'next/image'
import Link from 'next/link'
import {fetchData} from '@/app/lib/data'
const UsersPage = async() => {

    const data = await fetchData()
    console.log(data)
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder={'Search for a user...'} />
                <Link href={'/dashboard/users/add'}>
                    <button className={styles.addButton}>Add new</button>
                </Link>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Created at</td>
                        <td>Role</td>
                        <td>Status</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className={styles.user}>
                                <Image
                                    src={'/noavatar.png'}
                                    alt=''
                                    width={40}
                                    height={40}
                                    className={styles.userImage}
                                />
                                John Doe
                            </div>
                        </td>
                        <td>john@gmail.com</td>
                        <td>13.01.2022</td>
                        <td>Admin</td>
                        <td>active</td>
                        <td>
                           <div className={styles.buttons}>
                           <Link href={'/dashboard/users/test'}>
                            <button className={`${styles.button} ${styles.view}`}>View</button>
                            </Link>
                            <button className={`${styles.button} ${styles.delete}`}>Delete</button>

                           </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Pagination/>
        </div>
    )
}

export default UsersPage