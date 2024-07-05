'use client'
import { MdSearch } from 'react-icons/md';
import styles from './search.module.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {useDebouncedCallback} from "use-debounce"
const Search = ({ placeholder }) => {

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((e) => {
        const value = e.target.value;
        const params = new URLSearchParams(searchParams)
        if (value) {
          value.length>2 && params.set("q", value);
        }
        else {
            params.delete("q")
        }
        replace(`${pathname}?${params}`)
    })
    return (
        <div className={styles.container}>
            <MdSearch />
            <input type='text' placeholder={placeholder}
                className={styles.input}
                onChange={handleSearch}>
            </input>
        </div>
    )
}

export default Search;