import React, { FC, PropsWithChildren } from 'react'

import s from "./styles/index.module.scss"

import Providers from "@/redux/provider"

type Props = {}

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
    
  return (
    <div className={s.layout}>
        <Providers>
            { children }
        </Providers>
    </div>
  )
}

export default Layout