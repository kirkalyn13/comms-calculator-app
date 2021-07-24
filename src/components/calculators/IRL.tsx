import {useState, useEffect} from 'react'
import Information from '../Information'

const irlTitle = "Isotropic Receive Level"
const irlContent = "An isotropic antenna is uniformly omnidirectional with 0 dB gain. It is an imaginary reference antenna. The isotropic receive level is the power level we would expect to achieve at that point using an iotropic antenna."

const IRL = () => {
    type Parameters = {
        eirp: number | string,
        fsl: number | string,
    }
    const initialFieldValues: Parameters = {
        eirp: '',
        fsl: '',
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
          eirp: { valueAsNumber: number };
          fsl: { valueAsNumber: number };
        };
        const eirp: number = target.eirp.valueAsNumber
        const fsl: number = target.fsl.valueAsNumber
        const irl = (eirp - fsl).toFixed(2)
        setAnswer(irl)
        setSubmitState(!submitState)
      }
    
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={irlTitle} content={irlContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Effective Isotropic Radiated Power: </label>
                <input type="number" placeholder="EIRP in dBw" name="eirp" 
                value={values.eirp} onChange={handleOnChange} required/>
                <label>Free Space Path Loss: </label>
                <input type="number" placeholder="FSL in dB" name="fsl" 
                value={values.fsl} onChange={handleOnChange} required/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${irlTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer} dBW`}</label>
            </form>
            </div>
        </div>
    )
}

export default IRL
