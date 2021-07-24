import {useState, useEffect} from 'react'
import Information from '../Information'

const radioRangeTitle = "Maximum Radio Range"
const radioRangeContent = "Although the surface of the Earth is curved, a beam of microwave energy tends to travel in a straight line. However, the beam is normally bent toward a slight amount by atmospheric refraction, which varies with atmospheric conditions."

const RadioRange = () => {
    type Parameters = {
        heightTx: number | string,
        heightRx: number | string,
    }
    const initialFieldValues: Parameters = {
        heightTx: '',
        heightRx: '',
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
          heightTx: { valueAsNumber: number };
          heightRx: { valueAsNumber: number };
        };
        const heightTx: number = target.heightTx.valueAsNumber
        const heightRx: number = target.heightRx.valueAsNumber
        const radioRange = (Math.sqrt(17*heightTx) + Math.sqrt(17*heightRx)).toFixed(2)
        setAnswer(radioRange)
        setSubmitState(!submitState)
      }
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={radioRangeTitle} content={radioRangeContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Transmitter Height: </label>
                <input type="number" placeholder="Tx Height in meters" name="heightTx" 
                value={values.heightTx} onChange={handleOnChange} required/>
                <label>Receiver Height: </label>
                <input type="number" placeholder="Rx Height in meters" name="heightRx" 
                value={values.heightRx} onChange={handleOnChange} required/>
                <label className="note">Note: K=4/3 (Normal Atmospheric Conditions)</label>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${radioRangeTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer} km`}</label>
            </form>
            </div>
        </div>
    )
}

export default RadioRange
