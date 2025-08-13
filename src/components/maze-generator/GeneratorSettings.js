import { Button, Divider, InputNumber, Radio, Slider, Space } from 'antd';
import { useState } from 'react';
import { Api } from '../../api/api';

const IntegerStep = ({ inputId, label, val, setVal, minVal, maxVal }) => {
    const onChange = newVal => {
        newVal = Math.round(Number(newVal) || 0);
        setVal(Math.min(Math.max(newVal, minVal), maxVal));
    };
    return (
        <>
            <Space>
                <label htmlFor={inputId}>{label}</label>
                <InputNumber
                    id={inputId}
                    min={minVal}
                    max={maxVal}
                    value={val}
                    onChange={onChange}
                    style={{ width: '5em' }}
                />
            </Space>
            <Slider
                min={minVal}
                max={maxVal}
                value={val}
                onChange={onChange}
                tooltip={{ formatter: null }}
            />
        </>
    );
};

const GeneratorSettings = ({ genBeganCallback, genEndedCallback }) => {
    const algorithms = [
        {
            value: 'random',
            label: 'Random Noise'
        },
        {
            value: 'todo',
            label: 'Todo'
        },
        {
            value: 'todo2',
            label: 'Todo'
        }
    ];

    const [algorithm, setAlgorithm] = useState(algorithms[0].value);
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);

    const [isGenerating, setIsGenerating] = useState(false);

    const onGenerate = async () => {
        setIsGenerating(true);
        try {
            genBeganCallback(width, height);
            const generatorResult = await Api.generateNewMaze(algorithm, width, height);
            if (generatorResult.maze !== null) {
                console.log(generatorResult.maze);
                genEndedCallback(generatorResult.maze);
            }
        } catch (err) {
            console.log(err);
            genEndedCallback(null);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div style={{ userSelect: 'none' }}>
            <form onSubmit={e => e.preventDefault()}>
                <label>Алгоритм:</label>
                <Radio.Group
                    value={algorithm}
                    options={algorithms}
                    onChange={e => setAlgorithm(e.target.value)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}
                />
                <Divider />
                <IntegerStep
                    inputId='gen-form-width'
                    label={'Ширина'}
                    val={width}
                    setVal={setWidth}
                    minVal={3}
                    maxVal={100}
                />
                <IntegerStep
                    inputId='gen-form-height'
                    label={'Высота'}
                    val={height}
                    setVal={setHeight}
                    minVal={3}
                    maxVal={100}
                />
                <Divider />
                {isGenerating ? (
                    <Button type='primary' loading iconPosition='end'>
                        Генерация
                    </Button>
                ) : (
                    <Button type='primary' onClick={onGenerate} iconPosition='end'>
                        Генерировать
                    </Button>
                )}
            </form>
        </div>
    );
};

export default GeneratorSettings;
