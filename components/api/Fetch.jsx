

import React from 'react'
import useFetch from '../../helpers/functions/hooks'
import { Loader } from '../UI/Loader'

export default function Fetch({ children, endpoint }) {

    const { loading, value, error } = useFetch(endpoint)

    if (loading) return <div className="flex justify-center items-center"><Loader size={48} className="text-black" /></div>
    if (error) return <div className="flex justify-center items-center">{ JSON.stringify(error, null, 2) }</div>

    return children(value)
}
