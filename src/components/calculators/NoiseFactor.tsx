import {useState, useEffect} from 'react'
import Information from '../Information'

const noiseFactorTitle = "Noise Factor"
const noiseFactorContent = "Noise factor (F) is the measure of degradation of the signal-to-noise ratio (SNR), caused by components in a radio frequency (RF) signal chain. It is a number by which the performance of an amplifier or a radio receiver can be specified, with lower values indicating better performance. The noise factor is defined as the ratio of the output noise power of a device to the portion thereof attributable to thermal noise in the input termination at standard noise temperature T0 (usually 290 K)."

const NoiseFactor = () => {
    type Parameters = {
        snri: number | string,
        snro: number | string,
    }
    const initialFieldValues: Parameters = {
        snri: '',
        snro: '',
    }
    const [answer, setAnswer] = useState('')
    var [ values, setValues ] = useState(initialFieldValues)
    const [submitState, setSubmitState] = useState(false)
    useEffect(()=>{
        setValues(initialFieldValues)
    },[submitState])

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = e.currentTarget
        setValues({...values, [name]:value}) 
    }
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          snri: { valueAsNumber: number };
          snro: { valueAsNumber: number };
        };
        const snri: number = target.snri.valueAsNumber
        const snro: number = target.snro.valueAsNumber
        const noiseFactor = (snri/snro).toFixed(2)
        setAnswer(noiseFactor)
        setSubmitState(!submitState)
      }
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={noiseFactorTitle} content={noiseFactorContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Input Signal-to-Noise Ratio: </label>
                <input type="number" placeholder="Input SNR" name="snri" 
                value={values.snri} onChange={handleOnChange} required/>
                <label>Output Signal-to-Noise Ratio: </label>
                <input type="number" placeholder="Output SNR" name="snro" 
                value={values.snro} onChange={handleOnChange} required/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${noiseFactorTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer}`}</label>
            </form>
            </div>
        </div>
    )
}

export default NoiseFactor
