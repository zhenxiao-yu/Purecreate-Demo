import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion} from 'framer-motion'
import { useSnapshot} from 'valtio'
import config from '../config/config'
import state from '../store'
import {download} from '../assets'
import { downloadCanvasToImage, reader} from '../config/helpers'
import { EditorTabs, FilterTabs,  DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation} from '../config/motion'
import { AiPicker, ColorPicker, CustomButton, FilePicker, Tab} from '../components'

const Customizer = () => {
  const snap = useSnapshot(state);
  
  const [file, setFile] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false
  });

  //Display content depending on the active tab
  const generateTabContent = () => {
    switch(activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />

      case 'filepicker':
        return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile}
        />

      case 'aipicker':
        return <AiPicker
        activeEditorTab={activeEditorTab}
        setActiveEditorTab = {setActiveEditorTab}
          // prompt={prompt}
          // setPrompt={setPrompt}
          // setGeneratingImg={setGeneratingImg}
          // handleSubmit={handleSubmit}
        />

      default:
        return null;
    }
  }
  
  const handleSubmit = async(type) => {
    if(!prompt) return alert('Please enter a Prompt');

    try{
      setGeneratingImg(true);
      
      const res = await fetch('http://localhost:8080/api/v1/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
        })
      })

      const data = await res.json();
      handleDecals(type, `data:image/ppng; base64, ${data.photo}`)
    }

    catch(error) {
      alert(error);
    }

    finally {
      setGeneratingImg(false);
      setActiveEditorTab(false);
    }

  }
  
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if(!activeEditorTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch(tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    //after setting the state, activeFilterTab will be updated
    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })

  }

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab(false);
    })
  }

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div 
            key='custom' 
            className='absolute top-0 left-0 z-10' 
            {...slideAnimation('left')}
            >
              <div className='flex items-center min-h-screen'>
                <div className='editortabs-container tabs'>
                  {EditorTabs.map((tab) => (
                    <Tab 
                      key={tab.name}
                      tab={tab}
                      handleClick={() => {
                        //console.log('pre selection :>> ',activeEditorTab)
                        {activeEditorTab === false  ? setActiveEditorTab(tab.name) 
                          : setActiveEditorTab(false);}
                        //console.log('post selection :>> ',activeEditorTab);
                        
                      }}
                      title={tab.tooltip}
                    />
                  ))}

                  {generateTabContent()}

                  {/* Download button */}
                  <button className='download-btn' onClick={downloadCanvasToImage}>
                  <img
                    src={download}
                    alt='download_image'
                    className='w-3/5 h-3/5 object-contain'
                  />
                  </button>
                  
                </div>
              </div> 
          </motion.div>

          <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation} >
            <CustomButton 
              type="filled"
              title='Go Back'
              handleClick={() => state.intro = true}
              customStyles='w-fit px-4 py-2.5 font-bold text-sm'
              />
          </motion.div>

          <motion.div className='filtertabs-container' {...slideAnimation('up')} >
          {FilterTabs.map((tab) => (
                    <Tab 
                      key={tab.name}
                      tab={tab}
                      isFilterTab
                      isActiveTab={activeFilterTab[tab.name]}
                      handleClick={() => handleActiveFilterTab(tab.name)}
                    />
                  ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customizer