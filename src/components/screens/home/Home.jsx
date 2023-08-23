import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { FC } from "react";
import Head from 'next/head'
import { Inter } from 'next/font/google'
import Layout from "@/components/layout/Layout";
import Image from "next/image";

import s from './styles/index.module.scss'

import load from "../../../assets/load.jpg"
import plus from "../../../assets/plus.svg"
import minus from "../../../assets/minus.svg"
import main_image from "@/assets/main_image.png"
import left_arrow from "@/assets/arrow_left.svg"

import check from "@/assets/check.svg"

import {questions, titles, inputs} from "@/data/test"
import { log } from "util";


const inter = Inter({ subsets: ['latin'] })



const Home = () => {
    const [count, setCount] = useState(1)
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [inputValue, setInputValue] = useState("")
    const [inputValue2, setInputValue2] = useState("")
    const [inputValue3, setInputValue3] = useState("")
    const [sessionData, setSessionData] = useState(Array.from({ length: 17 }, (value, index) => {
        if (index === 1) {
            return { response: null };
        } else {
            return { response: null };
        }
    }))
    const [birthday, setBirthday] = useState('');
    const [hidden, setHidden] = useState(false);
    const [active, setActive] = useState(false);

    useEffect(() => {
        valueCheck()
    }, [count, inputValue, inputValue2, inputValue3, valueCheck])


    function changeSessionData(value) {
        setActive(true)
        setSessionData((prevState) => {
            prevState[0].response = null
            for(let i = 0; i < prevState.length; i++) {
                sessionData[count] = { ...sessionData[i], response: value}
        
                if(prevState[count]) {
                    console.log(sessionData);
                }
                return sessionData                    
            }
        })
    }
    
    function conditionInput(value) {
        let button = document.querySelector("button")
        switch(count) {
            case 2: 
                setInputValue(value)
                break
            case 3:
                setInputValue2(value)
                break
            case 4: 
                setInputValue3(value)
                break
            case 17:
                setBirthday(value)
                button.disabled = false
                break
        }
    }

    function valueCheck() {
        let value2 = document.querySelector("input")
        let button = document.querySelector("button")
        if (button) {
            if (count == 2 && inputValue || count == 3 && inputValue2 || count == 4 && inputValue3 || count == 17 && birthday) {
              button.disabled = false;
            } else {
              button.disabled = true;
            }
        }
    }

    function handleClickBlock(index) {
        setHidden(true)
        setActive(true)
        setTimeout(() => {
            changeSessionData(index)
            if (count < 17) {
                setCount(count + 1);
                valueCheck
            }
            setHidden(false)
        }, 500)
    }

    function handleClick(){
        setHidden(true)
        setActive(true)
        setTimeout(() => {
            if (count < 17) {
            setCount(count + 1);
            }
            valueCheck()
            setHidden(false)
        }, 500)
    };

    function decrimentCount() {
        setHidden(true)
        setActive(true)
        setTimeout(() => {
            if (count > 1) {
                setCount(count - 1);
                valueCheck()
            }
            setHidden(false)
        }, 500)
    }

    const lineStyle = {
        width: `${(count / 17) * 100}%`,
        height: '3px',
        background: '#4fcbf9',
        transition: 'width 0.5s ease-in-out',
        border: 0,
        borderRadius: "5px"
    };


    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <div className={s.main}>
                <div className={s.image_block}>
                    <Image src={main_image} alt="" />
                </div>
                <div className={s.test_wrapper}>
                    <div className={s.test_head}>
                        <div className={s.test_head_bar}>
                            <Image src={left_arrow} alt="" onClick={() => decrimentCount()}/>
                            <div className={s.test_count}>
                                <h3 style={{ color: "#4fcbf9" }}>{count}</h3><h3>/17</h3>
                            </div>
                        </div>
                        <div className={s.bar}>
                            <div className={s.line}>
                                <hr style={lineStyle} />
                            </div>
                        </div>
                    </div>
                        <div className={`${s.test} ${hidden ? s.hidden : s.visible}`}>
                            <div className={s.test_title}>
                            <h1>{titles[count].name}</h1>
                         </div>
                         { count == 1 || count > 4 && count < 17 ?
                            (<div className={s.test_question}>
                                {questions[count].map((item, i) => (
                                    <div className={`${s.test_block} ${sessionData[count]?.response == i ? s.test_block_active : ""}`} key={i} onClick={() => handleClickBlock(i)}>
                                        <div className={s.test_block_img} >
                                            {active && <Image src={item.img} alt="" preload />}
                                        </div>
                                        <div className={s.test_block_text}>
                                            {item.text}
                                        </div>
                                        <div className={s.target}>
                                            <div className={s.check}>
                                                <Image src={check} alt=""></Image>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>)

                            : count < 2 || count < 5 ?
                            (<div className={s.input_test}>
                                <div>
                                    <input 
                                        type="number" 
                                        id="input" placeholder={`${inputs[count]?.placeholder}`}
                                        value={count == 2 ? inputValue : count == 3 ? inputValue2 : count == 4 ? inputValue3 : ""}
                                        onChange={(e) => conditionInput(e.target.value)}
                                    />
                                    <div className={s.input_label}>{inputs[count]?.label}</div>
                                </div>
                                <div className={s.button_block}>
                                    <button type="button" id="button" onClick={() => handleClick(1)}>Далее</button>
                                </div>
                            </div>)
                            : count == 17 ? (
                                <div className={s.input_test}>
                                <div>
                                    <p>Введите дату вашего рождения </p>
                                    <input type="date" id="input" placeholder="ДД.ММ.ГГГГ" max="12.31.2022" value={count == 17 ? birthday : ""} onChange={(e) => conditionInput(e.target.value)} required />
                                    <div className={s.button_block}>
                                        <button type="button">Далее</button>
                                    </div>
                                </div>
                            </div>
                            )
                            :null
                        }
                        </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home;