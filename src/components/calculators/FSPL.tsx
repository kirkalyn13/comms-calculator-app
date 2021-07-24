import {useState, useEffect} from 'react'
import Information from '../Information'

const fsplTitle = "Free Space Path Loss"
const fsplContent = `In telecommunication, free-space path loss (FSPL) is the loss in signal strength of an electromagnetic wave that would result from a line-of-sight path through free space (usually air), with no obstacles nearby to cause reflection or diffraction. It is defined in “Standard Definitions of Terms for Antennas”, as “The loss between two isotropic radiators in free space, expressed as a power ratio.” `

const FSPL = () => {
    type Parameters = {
        distance: number | string,
        frequency: number | string,
        gainTx?:number | string,
        gainRx?:number | string,
    }
    const initialFieldValues: Parameters = {
        distance: '',
        frequency: '',
        gainTx: '',
        gainRx: ''
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
          distance: { valueAsNumber: number };
          frequency: { valueAsNumber: number };
          gainTx:{ valueAsNumber: number };
          gainRx:{ valueAsNumber: number };
        };
        const distance: number = target.distance.valueAsNumber
        const frequency: number = target.frequency.valueAsNumber
        const gainTx: number = target.gainTx.valueAsNumber
        const gainRx: number = target.gainRx.valueAsNumber
        const gtxVal = isNaN(gainTx) ? 0 : gainTx
        const grxVal = isNaN(gainRx) ? 0 : gainRx
        const fspl = ((20*(Math.log(distance)/Math.log(10))) +(20*(Math.log(frequency)/Math.log(10))) + 32.44 - gtxVal - grxVal).toFixed(2)
        console.log(gtxVal)
        console.log(grxVal)
        setAnswer(fspl)
        setSubmitState(!submitState)
      }
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={fsplTitle} content={fsplContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Tx-Rx Distance: </label>
                <input type="number" placeholder="Distance in km" name="distance" 
                value={values.distance} onChange={handleOnChange} required/>
                <label>Frequency: </label>
                <input type="number" placeholder="Frequency in MHz" name="frequency" 
                value={values.frequency} onChange={handleOnChange} required/>
                <label>Tx Antenna Gain: </label>
                <input type="number" placeholder="Tx Antenna Gain in dBi (Optional)" name="gainTx" 
                value={values.gainTx} onChange={handleOnChange}/>
                <label>Rx Antenna Gain: </label>
                <input type="number" placeholder="Rx Antenna Gain in dBi (Optional)" name="gainRx" 
                value={values.gainRx} onChange={handleOnChange}/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${fsplTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer} db`}</label>
            </form>
            </div>
        </div>
    )
}

export default FSPL
