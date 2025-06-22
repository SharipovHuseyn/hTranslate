import { useState, useEffect } from 'react';
import './App.css';
import Input from './components/Input/Input';
import Select from './components/Select/Select';
import Swap from './components/Swap/Swap';
import { supportedLanguages } from './lang.js';

function App() {
  const [text, setText] = useState('');
  const [translation, setTranslation] = useState('');
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('ru');
  const [isLoading, setIsLoading] = useState(false);

  async function translateText(text, fromLang, toLang) {
    if (!text.trim()) {
      setTranslation('');
      return;
    }

    setIsLoading(true);
    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        setTranslation(data.responseData.translatedText);
      } else {
        throw new Error(data.responseDetails || "Translation failed");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslation("Translation error");
    } finally {
      setIsLoading(false);
    }
  }

  const handleTranslate = () => {
    translateText(text, fromLang, toLang);
  };

  const handleSwapLanguages = () => {
    const currentFrom = fromLang;
    const currentTo = toLang;
    
    setFromLang(currentTo);
    setToLang(currentFrom);
    
    setText(translation);
    setTranslation(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text) {
        handleTranslate();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [text, fromLang, toLang]);

  return (
    <main>
      <div className='main-container'>
        <div className='tr-bl'>
          <Select
            type="translate"
            value={fromLang}
            onChange={(e) => setFromLang(e.target.value)}
            options={supportedLanguages}
          />
          <Input 
            type="translate"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Вводите текст"
          />
        </div>
        
        <div className='tr-bl'>
          <Swap onClick={handleSwapLanguages} />
        </div>
        
        <div className='tr-bl'>
          <Select 
            type="translation"
            value={toLang}
            onChange={(e) => setToLang(e.target.value)}
            options={supportedLanguages}
          />
          <Input 
            type="translation"
            value={isLoading ? "Translating..." : translation}
            readOnly
            placeholder="Перевод"
          />        
        </div>
      </div>
    </main>
  );
}

export default App;