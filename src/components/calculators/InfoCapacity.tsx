import {useState, useEffect} from 'react'
import Information from '../Information'

const infoCapacityTitle = "Information Capacity"
const infoCapacityContent = "In the information theory, the Shannon–Hartley theorem tells the maximum rate at which information can be transmitted over a communications channel of a specified bandwidth in the presence of noise. It is an application of the noisy-channel coding theorem to the archetypal case of a continuous-time analog communications channel subject to Gaussian noise."

const InfoCapacity = () => {
    type Parameters = {
        bandwidth: number | string,
        snr: number | string,
    }
    const initialFieldValues: Parameters = {
        bandwidth: '',
        snr: '',
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
          bandwidth: { valueAsNumber: number };
          snr: { valueAsNumber: number };
        };
        const bandwidth: number = target.bandwidth.valueAsNumber
        const snr: number = target.snr.valueAsNumber
        const infoCapacity = ((bandwidth*(Math.log(snr + 1)/Math.log(2)))/1000).toFixed(2)
        setAnswer(infoCapacity)
        setSubmitState(!submitState)
      }
    
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={infoCapacityTitle} content={infoCapacityContent} />
                </div>
                <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                <label>Bandwidth: </label>
                <input type="number" placeholder="Bandwidth in kHz" name="bandwidth" 
                value={values.bandwidth} onChange={handleOnChange} required/>
                <label>Signal to Noise Ratio: </label>
                <input type="number" placeholder="Absolute SNR" name="snr" 
                value={values.snr} onChange={handleOnChange} required/>
                <input type="submit" value="Calculate" className="btn-solve"/>
                <label>{answer === '' ? '' : `${infoCapacityTitle}:`}</label>
                <label className="answer">{answer === '' ? '' : `${answer} kbps`}</label>
            </form>
            </div>
        </div>
    )
}

export default InfoCapacity
