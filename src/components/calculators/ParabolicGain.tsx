import {useState, useEffect} from 'react'
import Information from '../Information'

const parabolicGainTitle = "Parabolic Antenna Gain"
const parabolicGainContent = "In electromagnetics, an antenna’s power gain or simply gain is a key performance figure which combines the antenna’s directivity and electrical efficiency. As a transmitting antenna, the figure describes how well the antenna converts input power into radio waves headed in a specified direction. As a receiving antenna, the figure describes how well the antenna converts radio waves arriving from a specified direction into electrical power. When no direction is specified, “gain” is understood to refer to the peak value of the gain. A plot of the gain as a function of direction is called the radiation pattern."

const ParabolicGain = () => {
    type Parameters = {
        diameter: number | string,
        wavelength: number | string,
        efficiency?: number | string,
    }
    const initialFieldValues: Parameters = {
        diameter: "",
        wavelength: "",
        efficiency: "",
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
          diameter: { valueAsNumber: number };
          wavelength: { valueAsNumber: number };
          efficiency: { valueAsNumber: number }
        };
        const diameter: number = target.diameter.valueAsNumber
        const wavelength: number = target.wavelength.valueAsNumber
        const efficiency: number = target.efficiency.valueAsNumber
        const n = isNaN(efficiency) ? 0.6 : efficiency
        const piDOverWave = (Math.PI*diameter)/wavelength
        const parabolicGain = (n*Math.pow(piDOverWave,2)).toFixed(2)
        setAnswer(parabolicGain)
        setSubmitState(!submitState)
      }
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={parabolicGainTitle} content={parabolicGainContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Antenna Diameter: </label>
                <input type="number" placeholder="Diameter in meters" name="diameter" 
                value={values.diameter} onChange={handleOnChange} required/>
                <label>Signal Wavelength: </label>
                <input type="number" placeholder="Wavelength in meters" name="wavelength" 
                value={values.wavelength} onChange={handleOnChange} required/>
                <label>Efficiency: </label>
                <input type="number" placeholder="0.5 to 0.75" name="efficiency" 
                value={values.efficiency} onChange={handleOnChange}/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${parabolicGainTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer}`}</label>
            </form>
            </div>
        </div>
    )
}

export default ParabolicGain
