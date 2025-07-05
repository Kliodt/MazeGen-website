import { useEffect, useRef, useState } from "react"
import styles from './generator-settings.module.css'
import { Maze, MazeFactory } from "../../model/maze";

const SliderField = ({label, val, setVal, sliderMin, sliderMax, sliderStep, inputMin, inputMax, inputInt}) => {
    const [inputStr, setInputStr] = useState(String(val));
    const textInput = useRef(null);

    const onChange = (e) => {
        const txt = e.target.value.trim();
        if (txt === '' || txt === '-') {
            setInputStr(txt);
            setVal(Math.min(Math.max(0, inputMin), inputMax));
            return;
        }
        if (isFinite(txt)) {
            let num = Number(txt);
            if (isNaN(num)) return;
         
            if (!inputInt || Number.isInteger(num)) {
                setInputStr(inputInt ? txt.replace('.','') : txt);
                setVal(Math.min(Math.max(num, inputMin), inputMax));
            }
        }
    }

    useEffect(() => {
        const el = textInput.current;
        const handler = () => setInputStr(val);
        el.addEventListener('focusout', handler);
        return () => el.removeEventListener('focusout', handler);
    });

    return (
        <div className={styles['field-box']}>
            <label>
                <h5>{label + ': '}
                    <input ref={textInput} type='text' style={{width: '3.5em'}} value={inputStr} onChange={onChange}/>
                </h5>
            </label>
            <input className='common-slider' type="range" value={val} min={sliderMin} step={sliderStep} max={sliderMax} onChange={onChange}/>
        </div>
    )
}


const GeneratorsList = ({values, selected, setSelected}) => {
    const list = values.map(string => {
        return <div key={string} className="radio-group">
            <input id={string} type="radio" checked={string === selected} onChange={() => setSelected(string)}/>
            <label htmlFor={string}>{string}</label><br/>
        </div>
    })

    return (
        <div className={styles['field-box']}>
            <label>
                <h5>Алгоритм:</h5>
            </label>
            {list}
        </div>
    )
}


/**
 * Component that is responsible for adjusting maze generators settings and generating mazes
 * @param {Object} props - Component props
 * @param {(maze: Maze, err: Error) => void} props.onMazeGenerated - Callback function called 
 * when new maze is generated (or server responded with error)
 * @param {(templateMaze: Maze) => void} props.onGenerateMazePressed - Callback function called 
 * as soon as user presses the 'generate' button
 * @param {Boolean} props.shouldGenerateNewMaze - Flag to initiate new maze generation from outside
 */
const GeneratorSettings = ({onMazeGenerated, onGenerateMazePressed, shouldGenerateNewMaze}) => {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    // todo: добавить все возможные настройки для разных генераторов и отображать только нужные

    const generators = ['gen 1', 'gen 2', 'gen 3'];
    const [generator, setGenerator] = useState(generators[0]);

    const onGenerate = async () => {
        onGenerateMazePressed(MazeFactory.getEmptyMaze(width, height));
        try {
            // todo: set generating animation
            const maze = await MazeFactory.generateNewMaze(null); // todo: parameters
            onMazeGenerated(maze, null);
            console.log('successfully gened');
            
        } catch (error) {
            onMazeGenerated(null, error);
            console.log('successfully failed');

        } finally {
            // todo: remove gen animation, unblock the maze
        }
    }

    return <div style={{userSelect: 'none'}}>
        <h2 className={styles.titleBig}>Настройки генератора</h2>
        <hr/>
        <form onSubmit={e => e.preventDefault()}>
            <GeneratorsList values={generators} selected={generator} setSelected={setGenerator}/>
            <hr/>
            <SliderField 
                label='Ширина' 
                val={width} 
                setVal={setWidth} 
                inputInt={true} 
                sliderMin={3}
                sliderMax={30}
                inputMin={3}
                inputMax={1000}
            />
            <hr/>
            <SliderField 
                label='Высота' 
                val={height} 
                setVal={setHeight} 
                inputInt={true} 
                sliderMin={3}
                sliderMax={30}
                inputMin={3}
                inputMax={1000}
            />
            <br/>
            <input type="submit" className="common-button" value="Генерировать" onClick={onGenerate}/>
        </form>
    </div>
}

export default GeneratorSettings;