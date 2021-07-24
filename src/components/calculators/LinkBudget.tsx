import {useState, useEffect} from 'react'
import Information from '../Information'

const linkBudgetTitle = "Link Budget"
const linkBudgetContent = "It is the term used to account for the power received at the receiver. This accounts for all the gain and losses from the transmitter to the point at which it is received. It includes all the losses from cables/fibers and other components in the Tx/Rx chain, gains from antenna, amplifiers, etc. and propagation loss when travelling through air or another medium."

const LinkBudget = () => {
    type Parameters = {
        powerTx: number | string,
        gainTx: number | string,
        gainRx: number | string,
        lossTx: number | string,
        lossRx: number | string,
        fsl: number | string,
        lossMisc: number | string,
    }
    const initialFieldValues: Parameters = {
        powerTx: '',
        gainTx: '',
        gainRx: '',
        lossTx: '',
        lossRx: '',
        fsl: '',
        lossMisc: '',
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
          gainTx: { valueAsNumber: number };
          gainRx: { valueAsNumber: number };
          lossTx: { valueAsNumber: number };
          lossRx: { valueAsNumber: number };
          fsl: { valueAsNumber: number };
          lossMisc: { valueAsNumber: number };
        };
        const powerTx: number = target.powerTx.valueAsNumber
        const gainTx: number = target.gainTx.valueAsNumber
        const gainRx: number = target.gainRx.valueAsNumber
        const lossTx: number = target.lossTx.valueAsNumber
        const lossRx: number = target.lossRx.valueAsNumber
        const lossMisc: number = target.lossMisc.valueAsNumber
        const fsl: number = target.fsl.valueAsNumber
        const lossMiscVal: number = isNaN(lossMisc) ? 0 : lossMisc
        const powerRx = (powerTx + gainTx - lossTx - fsl - lossMiscVal + gainRx - lossRx).toFixed(2)
        setAnswer(powerRx)
        setSubmitState(!submitState)
      }
    return (
        <div className="calculator">
            <div className="container-calculator">
                <div className="info">
                    <Information title={linkBudgetTitle} content={linkBudgetContent} />
                </div>
                <div className="link-budget-form">
                    <form className="register-form" autoComplete="off" onSubmit={handleSubmit}>
                    <label>Tx Output Power: </label>
                    <input type="number" placeholder="Tx Power in dBm" name="powerTx" 
                    value={values.powerTx} onChange={handleOnChange} required/>
                    <label>Tx Antenna Gain: </label>
                    <input type="number" placeholder="Tx Antenna Gain in dBi" name="gainTx" 
                    value={values.gainTx} onChange={handleOnChange} required/>
                    <label>Tx Cable and Connector Loss: </label>
                    <input type="number" placeholder="Tx Loss in dB" name="lossTx" 
                    value={values.lossTx} onChange={handleOnChange} required/>
                    <label>Free Space Path Loss: </label>
                    <input type="number" placeholder="Free Space Loss in dB" name="fsl" 
                    value={values.fsl} onChange={handleOnChange} required/>
                    <label>Rx Antenna Gain: </label>
                    <input type="number" placeholder="Rx Antenna Gain in dBi" name="gainRx" 
                    value={values.gainRx} onChange={handleOnChange} required/>
                    <label>Rx Cable and Connector Loss: </label>
                    <input type="number" placeholder="Rx Loss in dB" name="lossRx" 
                    value={values.lossRx} onChange={handleOnChange} required/>
                    <label>Miscellaneous Loss: </label>
                    <input type="number" placeholder="Miscellaneous Loss in dB" name="lossMisc" 
                    value={values.lossMisc} onChange={handleOnChange} required/>
                    <input type="submit" value="Calculate" className="btn-solve"/>
                    <label>{answer === '' ? '' : `${linkBudgetTitle}:`}</label>
                    <label className="answer">{answer === '' ? '' : `${answer} dBm`}</label>
                </form>
                </div>
            </div>
        </div>
    )
}

export default LinkBudget
