import {useState, useEffect} from 'react'
import Information from '../Information'

const antennaGainTitle = "Antenna Gain"
const antennaGainContent = "In electromagnetics, an antenna’s power gain or simply gain is a key performance figure which combines the antenna’s directivity and electrical efficiency. As a transmitting antenna, the figure describes how well the antenna converts input power into radio waves headed in a specified direction. As a receiving antenna, the figure describes how well the antenna converts radio waves arriving from a specified direction into electrical power. "

const AntennaGain = () => {
    type Parameters = {
        gain: number | string,
    }
    const initialFieldValues: Parameters = {
        gain: ''
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
          gain: { value: number };
        };
        const gain: number = target.gain.value
        const antennaGain = (10*(Math.log(gain)/Math.log(10))).toFixed(2)
        setAnswer(antennaGain)
        setSubmitState(!submitState)
      }
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={antennaGainTitle} content={antennaGainContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Input Signal-to-Noise Ratio: </label>
                <input type="number" placeholder="Absolute Gain" name="gain" 
                value={values.gain} onChange={handleOnChange} required/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${antennaGainTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer} dBi`}</label>
            </form>
            </div>
        </div>
    )
}

export default AntennaGain
