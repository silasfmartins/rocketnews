import { useTheme } from 'next-themes';

import Head from "next/head";
import Image from "next/image";

import { useEffect, useState, FormEvent } from 'react';

import Button from '../components/Button';

import { validateEmail } from '../utils/regex';

import moon from '../assets/moon.svg';
import sun from '../assets/sun.svg';
import arrowRight from '../assets/arrow-right.svg';
import logo from '../assets/logo.svg';
import readNews from '../assets/read_news.jpg';
import send from '../assets/send.svg';
import { api } from '../lib/api';

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if(currentTheme === 'dark') {
      return (
        <Button className="hover:ring-gray-700 ring-gray-800" onClick={() => setTheme('light')}>
          <Image src={sun} alt="Sol - sun" />
        </Button>
      )
    } else {
      return (
        <Button className="hover:ring-gray-300 ring-gray-200" onClick={() => setTheme('dark')}>
          <Image src={moon} alt="Lua - moon" />
        </Button>
      )
    }
  }

  const [email, setEmail] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [emailErr, setEmailErr] = useState(false)

  const validate = () => {
    if(!validateEmail.test(email)) {
      setEmailErr(true)
    } else {
      setEmailErr(false)
    }
  }

  async function sendEmail(e:FormEvent){
    e.preventDefault();

    setIsSendingEmail(true);

    await api.post('email', {
      email: email
    })

    alert('Email salvo no banco de dados')

    setIsSendingEmail(false);
  }
  return (
    <>
      <Head>
        <meta name="author" content="Silas Martins" />
        <meta name="description" content="Website que simula um cadastramento de Newslatter" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="../../public/favicon.ico" type="image/x-icon" />
        <title>Rocketnews</title>
      </Head>
      <main>
        <div className="absolute z-50 right-4 top-4">
          {renderThemeChanger()}
        </div>
        <div className="flex lg:justify-between">
          <section className="bg-white dark:bg-black margin-auto lg:max-w-[720px] h-[100vw] max-h-[780px] absolute p-[30px]">
            <figure className="mt-4 sm:mt-0 md:mt-0 lg:mt-0">
              <Image className="justify-center lg:max-w-[349px] lg:max-h-[94px]" src={logo} alt="Logo" />
              <figcaption className="hidden">Logo</figcaption>
            </figure>
            <section className="mt-9 text-center lg:text-start lg:mt-[92px] lg:max-w-[647px] max-h-[102px]">
              <p className="font-work font-bold text-2xl text-green-500">atualize ideias e informações em 5 minutos.</p>
              <span className="font-spartan font-bold text-sm dark:text-white text-black block">tudo que você precisa saber para começar seu dia bem e informado</span>
              <span className="font-spartan text-normal text-sm leading-[138.7%]">noticias sobre o universo Rocketseat, e tudo o que precisa para começar o dia melhor.<br/>perfeito para se preparar para codar ☕</span>
            </section>
            <section className="lg:w-auto mt-36 sm:mt-4 lg:mt-[50px] absolute">
              <span className="font-spartan font-bold text-sm leading-[138.7%] text-[#A8A8A8]">Insira seu e-mail:</span>
              <form onSubmit={sendEmail} className="flex items-center justify-start text-center mt-[17px]">
                <input
                  className="w-[calc(100vw-9rem)] lg:w-[750px] h-12 border-l-[5px] border-l-[#04D361] p-4"
                  placeholder="oi@rocketseat.com"
                  type="email"
                  required
                  onBlur={validate}
                  onChange={event => setEmail(event.target.value)}
                  value={email}
                />
                <button
                  className="bg-[#8257E5] hover:bg-[#6229e7] transition-colors"
                  value="Enviar"
                  disabled={email.length === 0 || isSendingEmail}
                  type="submit"
                >
                  <figure className="p-[13px]">
                    <Image src={send} alt="Cadastrar email" />
                    <figcaption className="hidden">Cadastrar email</figcaption>
                  </figure>
                </button>
              </form>
              {emailErr && <span className="text-white">Por favor digite um email válido!</span>}
            </section>
            <section className="mt-64 sm:mt-32 lg:mt-40 flex items-center text-center">
              <span className="font-spartan font-bold text-sm leading-[138.7%] text-purple-500">deixe-me ler primeiro</span>
              <figure className="ml-2">
                <Image src={arrowRight} alt="Seta para direita" />
                <figcaption className="hidden">Seta para direita</figcaption>
              </figure>
            </section>
          </section>
        </div>
        <section className="hidden lg:block max-w-[1175px] max-h-[900px]">
          <figure className="w-full ml-40">
            <Image src={readNews} alt="Pessoa lendo notícias" />
            <figcaption className="hidden">Pessoa lendo notícia</figcaption>
          </figure>
        </section>
      </main>
    </>
  )
}
