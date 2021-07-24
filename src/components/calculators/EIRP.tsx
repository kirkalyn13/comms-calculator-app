import {useState, useEffect} from 'react'
import Information from '../Information'

const eirpTitle = "Effective Isotropic Radiated Power"
const eirpContent = "The measured radiated power of an antenna in a specific direction. It is the output power when a signal is concentrated into a smaller area by the Antenna. The EIRP can take into account the losses in transmission line, connectors, and includes the gain of the antenna."

const EIRP = () => {
    type Parameters = {
        powerTx: number | string,
        cableLoss: number | string,
        antennaGain: number | string
    }
    const initialFieldValues: Parameters = {
        powerTx: '',
        cableLoss: '',
        antennaGain: ''
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
          powerTx: { valueAsNumber: number };
          cableLoss: { valueAsNumber: number };
          antennaGain: { valueAsNumber: number };
        };
        const powerTx: number = target.powerTx.valueAsNumber
        const cableLoss: number = target.cableLoss.valueAsNumber
        const antennaGain: number = target.antennaGain.valueAsNumber
        const eirp = (powerTx - cableLoss + antennaGain).toFixed(2)
        setAnswer(eirp)
        setSubmitState(!submitState)
      }
    
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={eirpTitle} content={eirpContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Tx Output Power: </label>
                <input type="number" placeholder="Tx Power in dBm" name="powerTx" 
                value={values.powerTx} onChange={handleOnChange} required/>
                <label>Cable and Connector Loss: </label>
                <input type="number" placeholder="Cable loss in dB" name="cableLoss" 
                value={values.cableLoss} onChange={handleOnChange} required/>
                <label>Antenna Gain: </label>
                <input type="number" placeholder="Gain in dBi" name="antennaGain" 
                value={values.antennaGain} onChange={handleOnChange} required/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${eirpTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer} dBm`}</label>
            </form>
            </div>
        </div>
    )
}

export default EIRP
