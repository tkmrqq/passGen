'use client'
import { useState } from "react";
import { PiGithubLogoLight } from "react-icons/pi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  interface PasswordOptions {
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  }

  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  const generatePassword = () => {
    // Здесь будет логика генерации пароля на основе выбранных параметров
    // Пока просто возвращаем тестовый пароль
    const chars = [];
    if (options.uppercase) chars.push('ABCDEFGHJKMNOPQRSTUVWXYZ');
    if (options.lowercase) chars.push('abcdefghijkmnopqrstuvwxyz');
    if (options.numbers) chars.push('0123456789');
    if (options.symbols) chars.push('!@#$%^&*()_+-=[]{};:,.<>?');

    const charSet = chars.join('');
    let newPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      newPassword += charSet[randomIndex];
    }

    setPassword(newPassword);
    toast("Password generated");
  };

  const handleOptionChange = (option: keyof typeof options) => {
    const newOptions = {
      ...options,
      [option]: !options[option],
    };
    setOptions(newOptions);

    // Проверяем, чтобы хотя бы один параметр был выбран
    if (Object.values(newOptions).every(opt => !opt)) {
      setOptions({
        ...newOptions,
        [option]: true,
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-md">
        <h1 className="text-4xl font-extrabold">PASSWORD GENERATOR</h1>

        {/* Поле с паролем */}
        <div
          className="flex items-center justify-between w-full bg-zinc-100 rounded-md p-4 cursor-pointer hover:bg-zinc-200 transition-colors"
          onClick={copyToClipboard}
        >
          <span className="font-mono text-black text-lg select-all">{password}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </div>

        {/* Слайдер длины */}
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <label htmlFor="length-slider" className="font-medium">Length: {length}</label>
          </div>
          <input
            id="length-slider"
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Параметры пароля */}
        <div className="w-full grid grid-cols-2 gap-4">
          {(Object.entries(options) as Array<[keyof PasswordOptions, boolean]>).map(([key, value]) => (
            <div
              key={key}
              className={`flex items-center p-3 rounded-md cursor-pointer transition-colors text-black ${value ? 'bg-red-100' : 'bg-zinc-100 hover:bg-zinc-200'}`}
              onClick={() => handleOptionChange(key)}
            >
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mr-3 ${value ? 'bg-red-500  border-red-500' : 'border-zinc-300'}`}>
                {value && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
              <span className="capitalize">{key}</span>
            </div>
          ))}
        </div>

        {/* Кнопка генерации */}
        <button
          onClick={generatePassword}
          className="w-full bg-linear-to-r from-red-800 to-red-500 hover:bg-linear-to-r hover:from-red-600 hover:to-red-300 text-white font-medium py-3 px-4 rounded-md transition-colors mt-4"
        >
          Generate Password
        </button>
      </main>
      <ToastContainer />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/tkmrqq"
        target="_blank"
        rel="noopener noreferrer"
      >
        <PiGithubLogoLight size={32} />
      </a>
    </footer>
  )
}
