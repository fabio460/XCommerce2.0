import React from 'react'
import styles from '@/styles/BodyHome.module.css'
import TabelaMaisVendidos from './tabelaMaisVendidos';
import TabelaTotal from './tabelaTotal';


export default function BodyHome() {
  return (
    <div className={styles.container}>
      <div className={styles.BodyHome}>
        <TabelaMaisVendidos/>
        <TabelaTotal/>
      </div>
    </div>
  )
}

