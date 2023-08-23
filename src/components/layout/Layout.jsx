import React, { FC, PropsWithChildren, ReactNode } from 'react'

import s from "./styles/index.module.scss"

import Providers from "@/redux/provider"

// type Props = {}

const Layout = ({children}) => {
    
  return (
    <div className={s.layout}>
        <Providers>
            { children }
        </Providers>
    </div>
  )
}

export default Layout