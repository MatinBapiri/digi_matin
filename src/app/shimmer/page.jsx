"use client"
import React from 'react'
import { useEffect, useState } from 'react'
export default function page() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response =>response.json())
            .then(data => {setProducts(data)})

    }, [])



    return (
        <>
            {products ? "status 200" : "notFound"}
            {products && <div className='items-center justify-center flex flex-col'>
                {products.map(data => (
                    <div  className=' text-green-500 hover:text-red-600 hover:cursor-pointer hover:bg-amber-200' key={data.id}>{data.title}</div>
                ))
                }
            </div>}
        </>


    )
}
